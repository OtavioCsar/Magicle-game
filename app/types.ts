export type Card = {
  name: string;
  setName: string;
  rarity: string;
  manaCost: string;
  cardType: string;
  colorIdentity: string;
  imageUrl: string;
}

export type Result = {
  setName: boolean;
  rarity: boolean;
  manaCost: boolean;
  cardType: boolean;
  colorIdentity: boolean;
}

export type Guess = {
  card: Card;
  result: Result;
}
