export interface CoinHistories {
  status: string;
  data: Data;
}

export interface Data {
  change: string;
  history: History[];
}

export interface History {
  price: string;
  timestamp: number;
}
