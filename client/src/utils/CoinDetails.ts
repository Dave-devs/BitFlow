export interface CoinDetails {
  status: string;
  data: Data;
}

export interface Data {
  coin: Coin;
}

export interface Coin {
  uuid: string,
  symbol: string,
  name: string,
  description: string,
  color: string,
  iconUrl: string,
  websiteUrl: string,
  links: Link[],
  supply: Supply,
  '24hVolume': string,
  marketCap: string,
  fullyDilutedMarketCap: string,
  price: string,
  btcPrice: string,
  priceAt: number,
  change: string,
  rank: number,
  numberOfMarkets: number,
  numberOfExchanges: number,
  sparkline: string[],
  allTimeHigh: AllTimeHigh,
  coinrankingUrl: string,
  lowVolume: boolean,
  listedAt: number,
  notices: Notice[],
  contractAddresses: any[],
  tags: string[],
}

export interface Notice {
  type: string,
  value: string,
}

export interface AllTimeHigh {
  price: string,
  timestamp: number,
}

export interface Supply {
  confirmed: boolean,
  supplyAt: number,
  circulating: string,
  total: string,
  max: string,
}

export interface Link {
  name: string,
  url: string,
  type: string,
}
