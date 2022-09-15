import React, { Fragment, useEffect } from 'react'
import { useState } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';
import '../styles/TrailerMovie.css'

const TrailerMovie = ( {moviesTitle} ) => {
    const [video, setVideo] = useState("");
    const [videoURL, setVideoURL] = useState("");

    function handleSearch() {
        setVideo(moviesTitle)
        movieTrailer(video).then((res) => {
            setVideoURL(res);
        });
    }

    useEffect(() => {
        handleSearch()
    }, [videoURL])

    return (
        <Fragment>
            <div className='Container'>

            </div>
            <div className='player'>
                <ReactPlayer url={videoURL} controls={true} width={'900px'} height={'500px'} muted={false}/>
            </div>
        </Fragment>
    )
}

export default TrailerMovie