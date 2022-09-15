import { Fragment, React, useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { AiFillPlayCircle } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import { Container } from './Navbar'
import Noimg from './imagenotfound.png'
import TrailerTrending from '../trailers/TrailerTrending';

const Trends = () => {
  const Api = 'https://api.themoviedb.org/3/'
  const { toggle } = useContext(Container);
  const TrendsShown = '/trending/all/week'
  const [trailer, setTrailer] = useState(true)
  const Images = 'https://image.tmdb.org/t/p/w500/'
  const [trendTitle, setTrendTitle] = useState('')
  const [trendArray, setTrendArray] = useState([])

  const Trends = async () => {
    const data = await axios.get(`${Api}${TrendsShown}`, {
      params: {
        api_key: '6e03403a77e4b85dc399fb7d40f70300',
      }
    })
    const results = data.data.results
    setTrendArray(results)
  }
  useEffect(() => {
    Trends()
  }, [])

  const TrendTitle = (trend) => {
    setTrendTitle(trend.title)
    setTrailer(!trailer)
  }
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : 'secondaryBgColor'}>
        <div className='movies-container'>
          {trendArray.map((trend) => {
            return (
              <div id={trailer ? 'container' : 'NoContainer'}>
                <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => TrendTitle(trend)} />
                <img src={trend.poster_path ? `${Images}${trend.poster_path}` : Noimg} alt='' onClick={() => TrendTitle(trend)} />
                <h3 id='smaller-Text'>{trend.title}</h3>
              </div>
            )
          })}
           {trailer ? console.log : <TrailerTrending Trendtitle={trendTitle} />}
          <AiOutlineClose id={trailer ? 'Nothing' : ''} className={toggle ? 'DarkTheme' : 'LighThemeClose'} fontSize={55} color="#fff" cursor={'pointer'} onClick={() => setTrailer(false)} />
        </div>
      </div>
    </Fragment>
  )
}

export default Trends