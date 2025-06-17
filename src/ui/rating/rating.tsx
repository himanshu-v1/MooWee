import './rating.scss';

export default function Rating({ rating }: { rating: string | number }) {
    const getStars = (rating: number | string) => {
        const _rating = parseFloat(rating.toString()) / 2;
        const stars = [];
        const fixed = Math.floor(_rating);
        let floating = Math.floor((_rating % 1) * 100);
        const partialClass = getClass(floating);

        for(let i=0;i<5;i++){
            if(i < fixed){
                stars.push(<span key={i}>&#9733;</span>);
            } else if (floating > 0) {
                stars.push(<span key={i} className={partialClass}>&#9733;</span>);
                floating = 0;
            } else{
                stars.push(<span key={i} className='empty'>&#9733;</span>);
            }
        }
        return stars;
    }

    const getClass = (num: number) => {
        if(num > 0 && num <= 25) {
            return 'part-33';
        } else if(num >= 26 && num <= 50) {
            return 'part-50';
        } else if(num >= 51 && num <= 75) {
            return 'part-66';
        } else if(num >= 76 && num < 100) {
            return 'part-80';
        }
        return '';
    }

    return (
        <span className="ratings">
            <span className="ratings-wrapper">
                {getStars(rating)}
            </span>
        </span>
    );
}