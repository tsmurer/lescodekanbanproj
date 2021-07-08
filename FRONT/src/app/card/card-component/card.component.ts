import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Card } from 'src/app/shared/models/card';
import { CardService } from 'src/app/shared/services/card.service';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Output() delete: EventEmitter<Card> = new EventEmitter()

  isEditingMode: boolean = false;

  constructor(
    private _service: CardService,
    private _eventService : EventService
  ) {
    
   }

  ngOnInit() {
  }

  // emits column method for deleting card. See deleteCard method in ColumnComponent
  emitDelete() {
    this.delete.emit(this.card);
  }

  // emits the board method for moving the card to next column through EventService. See EventService and listener in BoardComponent.
  promoteCard() {
    this._eventService.emitcardPromotionEvent(this.card)
  }

  // emits the board method for moving the card to previous column through EventService. See EventService and listener in BoardComponent .
  demoteCard() {
    this._eventService.emitcardDemotionEvent(this.card)
  }

  // puts card into editing mode
  edit() {
    this.isEditingMode = true;
  }

  // finishes editing and saves data
  saveEdition() {
    this._service.updateCard(this.card).subscribe();
    this.isEditingMode = false;
    
  }

}
