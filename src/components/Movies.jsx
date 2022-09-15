import React, { Fragment } from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from './Navbar'
import { AiFillPlayCircle } from 'react-icons/ai'
import Noimg from './imagenotfound.png'
import '../styles/Videos.css'
import { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import TrailerMovie from '../trailers/TrailerMovie';

const Movies = () => {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue
  const [moviesData, setMoviesData] = useState([])
  const [movieTitle, setMoviesTitle] = useState('')
  const [trailer, setTrailer] = useState(true)
  const Shown = input ? 'search' : 'discover'
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`
  const Images = 'https://image.tmdb.org/t/p/w500/'

  const MovieCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: '6e03403a77e4b85dc399fb7d40f70300',
        query: input
      }
    })
    const results = data.data.results
    setMoviesData(results)
    console.log(moviesData)
  }

  useEffect(() => {
    MovieCall()
  }, [input])
  console.log(moviesData)
  const MoviesTitle=(movie)=>{
      setMoviesTitle(movie.title)
      setTrailer(!trailer)
  }

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
        <div className='movies-container'>
          {moviesData.map((movie) => {
            return (
              <Fragment key={movie.id}>
                <div id={trailer ? 'container' : 'NoContainer'}>
                  <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon':'hide'} onClick={() => MoviesTitle(movie)}/>
                  <img src={movie.poster_path ? `${Images}${movie.poster_path}` : Noimg} alt=''onClick={() => MoviesTitle(movie)} />
                  <h3 id={movie.title.length > 28 ? 'smaller-Text' : ''} >{movie.title}</h3>
                </div>
              </Fragment>
            )
          })}
          {trailer ? console.log : <TrailerMovie moviesTitle={movieTitle} />}
          <AiOutlineClose id={trailer ? 'Nothing' : ''} className={toggle ? 'DarkTheme' : 'LighThemeClose'} fontSize={55} color="#fff" cursor={'pointer'} onClick={() => setTrailer(false)} />
        </div>
      </div>
    </Fragment>
  )
}

export default Movies