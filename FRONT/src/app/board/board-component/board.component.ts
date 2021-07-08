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

  loadCards(): void {
    
  }

  
  // gets token and stores it in localStorage. calls the get all cards function in sequence.
  authenticate(): void {
    this._authService.authenticate().subscribe(
      resp => {
        localStorage.setItem("token", resp);
        this.getAllCards();
      }
    )
  }

   //gets all cards
  getAllCards() {
    this._cardService.getCards().subscribe(
      resp => {
        for(let element of resp) {
          const card = {name: element.titulo, description: element.conteudo, columnId: element.lista, id: element.id} as Card;
          this.cards.push(card);
        }
        this.allocateCards();
      }
    )
  }

  // gets card current column, next or previous column depending on forward boolean and moves the card, saving changes
  moveCard(card: Card, forward: boolean) {
    let current_col = this.columns.find(col => col.id === card.columnId);
    if(current_col){
      if(forward && current_col.nextCol) {
        card.columnId = current_col.nextCol;
      } else if(!forward && current_col.prevCol){
        card.columnId = current_col.prevCol
      }
      const receiving_col = this.columns.find(col => col.id === card.columnId);
      this._cardService.updateCard(card).subscribe(
        (resp) => {
          current_col.cards = current_col.cards.filter(c => c !== card);
          receiving_col.cards.push(card)
        }
     )
    }
  }

  // allocates cards in their columns
  allocateCards() {
    for(let column of this.columns) {
      column.cards = this.cards.filter(card => card.columnId === column.id);
    }
  }

}
