import { Card } from './card';

export interface Column {
    id: any;
    name?: string;
    cards?: Card[];
    canHaveNewCard?: boolean;
    nextCol?: string;
    prevCol?: string;

}