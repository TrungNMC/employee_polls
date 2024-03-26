import notfound from '../assets/404.png';
import NavBar from './NavBar';

function NoMatch() {
  return (
    <div className='no-macth'>
      <NavBar />
      <img
        srcSet={notfound}
        src={notfound}
        alt={'Page Not Found'}
        loading='lazy'
        width='100%'
        height='100%'
      />
    </div>
  );
}

export default NoMatch;
