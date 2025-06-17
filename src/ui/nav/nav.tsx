import './nav.scss';

export default function Nav() {
  return (
    <div className="nav">
        <ul>
            <li>
                Movies
                <span className="border"></span>
            </li>
            <li>
                Shows
                <span className="border"></span>
            </li>
        </ul>
    </div>
  )
}