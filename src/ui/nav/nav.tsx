import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { setWallState } from '@/lib/feature/card/wallStateSlice';
import './nav.scss';
import { useState } from 'react';

export default function Nav() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [id, setId] = useState('movie');

  const handleClick = (id: string) => {
    // sessionStorage.setItem('wall', id);
    setId(id);
    dispatch(setWallState(id));
    router.push('/wall');
  };

  return (
    <div className="nav">
        <ul>
            <li tabIndex={0} onClick={() => {handleClick('movie')}} className={id === 'movie' ? 'active' : ''}>
                Movies
                <span className="border"></span>
            </li>
            <li tabIndex={0} onClick={() => {handleClick('tv')}} className={id === 'tv' ? 'active' : ''}>
                Shows
                <span className="border"></span>
            </li>
        </ul>
    </div>
  )
}