import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from "rxjs";
import { Card } from "../app.model";

@Injectable()
export class CollectionsService {
  url = 'https://api.magicthegathering.io';

  constructor(
    private httpClient: HttpClient,
  ) {}    

  getCollections(code: string): Observable<Card[]> {
    return this.httpClient.get(`${this.url}/v1/sets/${code}/booster`).pipe(
      map((resp: { cards: Card[] }) => resp.cards)
    )
  }
}