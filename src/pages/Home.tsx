import React from 'react'
import Sign_In_Button from '../components/Sign_In_Button'

const Home = () => {
    return (
        <div className='page_container'>
            <div className='text_container'>
                <h1>Galaktyczne lektury!</h1>
                <p>Witaj w bibliotece Galaktyczne Lektury. Tutaj znajdziesz wszystko co potrzebne ci jest do metody 3 razy Z!</p>
            </div>
            <div className='image_container'>
                <img src='/images/home-box.jpg' alt='Cezary Baryka' className='responsive_image'/>
            </div>
        </div>
    )
}

export default Home
