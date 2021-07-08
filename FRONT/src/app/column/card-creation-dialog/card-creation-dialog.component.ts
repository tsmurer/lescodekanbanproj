import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/shared/models/card';
import { CardService } from 'src/app/shared/services/card.service';


@Component({
  selector: 'app-card-creation-dialog',
  templateUrl: './card-creation-dialog.component.html',
  styleUrls: ['./card-creation-dialog.component.scss']
})
export class CardCreationDialogComponent implements OnInit {

  card: Card;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _cardService: CardService
  ) { }

  ngOnInit() {
    this.card = this.data.card;
  }

  // creates card and assigns an id supplied by the web service
  createCard() {
    this._cardService.createCard(this.card).subscribe(resp => this.card.id = resp.id)
  }

}
