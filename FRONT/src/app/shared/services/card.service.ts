import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestHelper } from '../helpers/request-helper';
import { Card } from '../models/card';

@Injectable()
export class CardService {

    url = environment.apiURL
    requestHelper = new RequestHelper();
    
    constructor(
        private http: HttpClient
    ) { }

    getCards() {
        return new RequestHelper().get(this.url + '/cards', this.http);
    }

    getCard(cardId) {
    }

    createCard(card: Card) {
        const body = {titulo: card.name, conteudo: card.description, lista: card.columnId};
        return this.requestHelper.post(this.url + '/cards', body, this.http);
    }

    updateCard(card) {
        return this.requestHelper.put(this.url + '/cards/' + card.id, card, this.http);
    }

    deleteCard(cardId) {
        return this.requestHelper.delete(this.url + '/cards/' + cardId, this.http);
    }



}
