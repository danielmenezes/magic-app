import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { BlockNameEnum, ListItens, ResultComponent } from "../app.model";
import { Observable, map } from "rxjs";

@Injectable()
export class FilterService {
  blockList = (): ListItens[] => (
    [
        {
            label: BlockNameEnum.AMONKHET,
            value: BlockNameEnum.AMONKHET,
        },
        {
            label: BlockNameEnum.IXALAN,
            value: BlockNameEnum.IXALAN,
        },
        {
            label: BlockNameEnum.ZENDIKAR,
            value: BlockNameEnum.ZENDIKAR,
        },
        {
            label: BlockNameEnum.RAVNICA,
            value: BlockNameEnum.RAVNICA,
        },
        {
            label: BlockNameEnum.ONSLAUGHT,
            value: BlockNameEnum.ONSLAUGHT,
        },
    ]
  )

  url = 'https://api.magicthegathering.io';

  constructor(
    private httpClient: HttpClient,
  ) {}    

  getDataFilter(params: HttpParams): Observable<ResultComponent[]> {
    return this.httpClient.get(`${this.url}/v1/sets`, { params }).pipe(
      map((resp: { sets: ResultComponent[] }) => resp.sets)
    )
  }
}