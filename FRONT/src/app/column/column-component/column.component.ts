import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/shared/models/card';
import { Column } from 'src/app/shared/models/column';
import { CardService } from 'src/app/shared/services/card.service';
import { CardCreationDialogComponent } from '../card-creation-dialog/card-creation-dialog.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {

  @Input() column: Column;

  constructor(
    private _cardService: CardService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  // adds card to column, saves changes
  addCard(card) {
    this.column.cards.push(card);
    this._dialog.closeAll();
  }
  // removes card from column, saves changes
  deleteCard(card) {
    this.column.cards = this.column.cards.filter(c => c.id !== card.id);
    this._cardService.deleteCard(card.id).subscribe();
  }

  // opens the card creation dialog, sends card data and gets them back

  openCardCreationDialog() {
    const dialogRef = this._dialog.open(CardCreationDialogComponent, {
      data: {
        card: { columnId: this.column.id } as Card
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addCard(result)
      }

    });

  }

}
