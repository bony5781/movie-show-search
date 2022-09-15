import { Fragment, React, useEffect, useState } from 'react'
import { useContext } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import { Container } from './Navbar'
import '../styles/Videos.css'
import axios from 'axios';
import Noimg from './imagenotfound.png'
import TrailerTvShow from '../trailers/TrailerTvShow';

function TvShows() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue
  const [trailer, setTrailer] = useState(true)
  const [title, setTitle] = useState('')
  const Shown = input ? 'search' : 'discover'
  const Api = `https://api.themoviedb.org/3/${Shown}/tv`
  const Images = 'https://image.tmdb.org/t/p/w500/'
  const [showData, setShowData] = useState([])


  const TvShows = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: '6e03403a77e4b85dc399fb7d40f70300',
        query:input
      }
    })
    const results = (data.data.results)
    setShowData(results)
  }
  useEffect(() => {
    TvShows()
  }, [input])
  const TvShowTitle = (shows) => {
    setTitle(shows.name)
    setTrailer(!trailer)
  }
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
        <div className='movies-container'>
          {showData.map((shows) => {
            return (
              <Fragment key={shows.id}>
                <div id={trailer ? 'container' : 'NoContainer'}>
                  <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => TvShowTitle(shows)} />
                  <img src={shows.poster_path ? `${Images}${shows.poster_path}` : Noimg} alt='' onClick={() => TvShowTitle(shows)} />
                  <h3 id={shows.name.length > 28 ? 'smaller-Text' : ''} >{shows.name}</h3>
                </div>
              </Fragment>
            )
          })}
           {trailer ? console.log : <TrailerTvShow tvshowtitle={title} />}
          <AiOutlineClose id={trailer ? 'Nothing' : '' } className={toggle ? 'DarkTheme' : 'LighThemeClose'} fontSize={55} color="#fff" cursor={'pointer'} onClick={() => setTrailer(false)} />
        </div>
      </div>
    </Fragment>
  )
}

export default TvShows