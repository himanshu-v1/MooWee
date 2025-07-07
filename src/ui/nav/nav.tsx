import { useRouter } from 'next/navigation';
import './nav.scss';

export default function Nav() {
  const router = useRouter();

  const handleClick = (id: string) => {
    sessionStorage.setItem('wall', id);
    router.push('/wall');
  };

  return (
    <div className="nav">
        <ul>
            <li tabIndex={0} onClick={() => {handleClick('movie')}}>
                Movies
                <span className="border"></span>
            </li>
            <li tabIndex={0} onClick={() => {handleClick('tv')}}>
                Shows
                <span className="border"></span>
            </li>
        </ul>
    </div>
  )
}