import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../models/card';

@Injectable()
export class EventService {

    constructor() { }

    private cardDemotedEvent = new BehaviorSubject<Card>({} as Card);
    private cardPromotedEvent = new BehaviorSubject<Card>({} as Card);

     emitcardDemotionEvent(card: Card){
        this.cardDemotedEvent.next(card)
     }

     emitcardPromotionEvent(card: Card){
        this.cardPromotedEvent.next(card)
     }

     promotionEventListener() {
        return this.cardPromotedEvent.asObservable();
      }

    demotionEventListener() {
        return this.cardDemotedEvent.asObservable();
    }
   }