export interface DataModel {
  id: number;
  name: string;
}

export interface QuoteModel {
  id: number;
  quote: string;
  description: string;
  author: string;
  category: string;
}

export interface DataQuotesModel {
  quotes: QuoteModel[];
}
