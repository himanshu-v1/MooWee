import IButton from './type';
import './button.scss';

export default function Button(props: IButton) {
    return (
        <button className={`button 
            ${props.type ? props.type : ''} 
            ${props.isSmall ? 'small' : ''} 
            ${props.isTransition ? 'transition' : ''}`}>
            {props.text || props.children}
        </button>
    )
}