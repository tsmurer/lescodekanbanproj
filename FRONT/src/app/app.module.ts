import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { card } from './card/card';
import { board } from './board/board';
import { column } from './column/column';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from './shared/services/card.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/angular-material.module';
import { FormsModule } from '@angular/forms';
import { EventService } from './shared/services/event.service';
import { navbar } from './shared/components/navbar/navbar';

@NgModule({
  declarations: [
    AppComponent,
    board,
    card,
    column,
    navbar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    CardService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
