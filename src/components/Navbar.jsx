import React, { Fragment, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import NavbarStyle from "../styles/NavbarStyle.css"
import { NavLink } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Movies from './Movies'
import TvShows from './TvShows'
import Pricing from './Pricing'
import Trends from './Trends'

export const Container = React.createContext()

function Navbar() {
    const [toggle, setToggle] = useState(true);
    const [inputValue, setInputValue] = useState('');
    return (
        <Container.Provider value={{toggle,inputValue}}>
            <Fragment>
                <nav className={'toggle' ? '' : 'navBarColor'}>
                    <div className='nav-options'>
                        <h1 id={toggle ? '' : 'heading'}>SHOW FINDER</h1>
                        <NavLink to="" style={({ isActive }) => { return { color: isActive ? '#fff' : 'EE9B00' } }}>
                            <span id={toggle ? '' : 'MoviesLight'}>Movies</span>
                        </NavLink>
                        <NavLink to="tvshows" style={({ isActive }) => { return { color: isActive ? '#fff' : 'EE9B00' } }}>
                            <span id={toggle ? '' : 'MoviesLight'}>TV Shows</span>
                        </NavLink>
                        <NavLink to="trends" style={({ isActive }) => { return { color: isActive ? '#fff' : 'EE9B00' } }}>
                            <span id={toggle ? '' : 'MoviesLight'}>Trending</span>
                        </NavLink>
                    </div>
                    <div className='input-group'>
                        <input type="text" placeholder='Enter Movie or Show you want to find' onChange={(e) => setInputValue(e.target.value)} />
                        <HiSearch fontSize={21} color="black" id="search" />
                        <div id='Color-switcher' onClick={() => setToggle(!toggle)}>
                            <div id={toggle ? 'Color-switcher-mover' : 'Color-switcher-moved'}></div>
                        </div>
                    </div>
                </nav >
                <Routes>
                    <Route path="" element={<Movies />} />
                    <Route path="tvshows" element={<TvShows />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="trends" element={<Trends />} />
                </Routes>
            </Fragment >
        </Container.Provider>

    )
}
export default Navbar;