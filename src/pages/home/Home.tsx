import React from 'react'
import Header from '../../components/header/Header'

import "./home.css";
import MainContent from '../../components/content/MainContent';

const Home = () => {
    return (
        <div className='home-container'>
            <Header />
            <MainContent />
        </div>
    )
}

export default Home