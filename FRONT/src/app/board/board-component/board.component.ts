import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/shared/models/card';
import { Column } from 'src/app/shared/models/column';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CardService } from 'src/app/shared/services/card.service';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  card: Card;
  cards: any = [];
  columns: Array<Column> = [
    {
      id: '1',
      name: 'To Do',
      cards: [],
      canHaveNewCard: true,
      nextCol: '2'
    },
    {
      id: '2',
      name: 'Doing',
      cards: [],
      canHaveNewCard: false,
      nextCol: '3',
      prevCol: '1'
    },
    {
      id: '3',
      name: 'Done',
      cards: [],
      canHaveNewCard: false,
      prevCol: '2'
    }
  ];

  constructor(
    private _cardService: CardService,
    private _authService: AuthService,
    private _eventService: EventService
  ) { }

  ngOnInit() {
    this.authenticate();
    // event service listeners for card emission when moving cards left or right. Can be improved (DRY);
    this._eventService.promotionEventListener().subscribe(card =>{
      this.moveCard(card, true)
    })
    this._eventService.demotionEventListener().subscribe(card =>{
      this.moveCard(card, false);
    })
  }

  // gets token and stores it in localStorage. calls the get all cards function in sequence.
  authenticate(): void {
    this._authService.authenticate().subscribe(
      resp => {
        localStorage.setItem('token', resp);
        this.getAllCards();
      }
    )
  }

   // gets all cards
  getAllCards() {
    this._cardService.getCards().subscribe(
      resp => {
        for(const element of resp) {
          const card = {name: element.titulo, description: element.conteudo, columnId: element.lista, id: element.id} as Card;
          this.cards.push(card);
        }
        this.allocateCards();
      }
    )
  }

  // gets card current column, next or previous column depending on forward boolean and moves the card, saving changes
  moveCard(card: Card, forward: boolean) {
    const currentCol = this.columns.find(col => col.id === card.columnId);
    if(currentCol){
      if(forward && currentCol.nextCol) {
        card.columnId = currentCol.nextCol;
      } else if(!forward && currentCol.prevCol){
        card.columnId = currentCol.prevCol
      }
      const receivingCol = this.columns.find(col => col.id === card.columnId);
      this._cardService.updateCard(card).subscribe(
        (resp) => {
          currentCol.cards = currentCol.cards.filter(c => c !== card);
          receivingCol.cards.push(card)
        }
     )
    }
  }

  // allocates cards in their columns
  allocateCards() {
    for(const column of this.columns) {
      column.cards = this.cards.filter(card => card.columnId === column.id);
    }
  }

}
