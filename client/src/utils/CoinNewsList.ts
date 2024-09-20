export interface CoinNewsList {
    data: CoinNews[]
}

export interface CoinNews {
    url: string
    title: string
    description: string
    thumbnail: string
    createdAt: string
}