export interface ICard {
    id: string,
    poster: string,
    title: string,
    year: number,
    director: string,
    rating: string,
    genre: string[] | string,
    time: number,
    episodes?: number,
};

export interface IAddnDetails {
  plot: string;
  director?: string;
  producer: string;
  production: string;
  cast: string;
};

export const initialCard: ICard = {
    id: '',
    poster: '',
    title: '',
    year: 0,
    director: '',
    rating: '0',
    genre: [],
    time: 0
};

export const initialAddnDetails: IAddnDetails = {
  plot: '',
  director: '',
  producer: '',
  production: '',
  cast: ''
};