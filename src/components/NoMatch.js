import notfound from '../assets/404.png';


function NoMatch() {
    return (
        <img
            srcSet={notfound}
            src={notfound}
            alt={'Page Not Found'}
            loading='lazy'
            width='100%'
            height='90%'
          />
    )
}

export  default NoMatch;