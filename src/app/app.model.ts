export interface ListItens {
  label: string;
  value: string;
}

export interface ResultComponent {
  code: string;
  name: string;
  block: string;
  releaseDate: string;
}

export interface Card {
  name: string;
  manaCost: string;
  colorIdentity: string[];
  text: string;
  imageUrl: string;
  types: string[];
}

export enum BlockNameEnum {
  AMONKHET = 'Amonkhet',
  IXALAN = 'Ixalan',
  ZENDIKAR = 'Zendikar',
  RAVNICA = 'Ravnica',
  ONSLAUGHT = 'Onslaught',
}

