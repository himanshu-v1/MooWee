export default interface ICard {
    id: string,
    poster: string,
    title: string,
    year: number,
    director: string,
    rating: string,
    genre: string[] | string,
    time: number
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
}