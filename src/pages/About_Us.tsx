import React from 'react';
import Sign_In_Button from '../components/Sign_In_Button';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const About_Us = () => {
    return (
        <div className='page_container'>
            <div className='text_slider_container'>
                <div className='text_container'>
                    <h1>Galaktyczne lektury!</h1>
                    <p>Witajcie w Galaktycznych Lekturach, przestrzennej bibliotece, 
                        gdzie każdy z nas może odkrywać niezliczone historie, 
                        poznawać odległe światy i zgłębiać tajemnice wszechświata. 
                        Jesteśmy miejscem, gdzie literatura staje się mostem łączącym nasze umysły 
                        z niezliczonymi wymiarami wyobraźni.</p>
                    <p>W Galaktycznych Lekturach wierzymy, że każda strona, każde zdanie, każde słowo to wehikuł, który przenosi nas w podróż przez kosmiczne krainy wyobraźni. Naszą misją jest dostarczanie Wam nie tylko książek, ale również niezapomnianych podróży po literackich galaktykach, które otwierają oczy na nowe horyzonty i inspirują do poszukiwania głębszego znaczenia.</p>
                    <p>Nasza biblioteka to nie tylko zbiór książek, to przestrzeń, w której możesz zagłębić się w naukę, sztukę, filozofię i historię. To miejsce, gdzie każdy może znaleźć coś dla siebie - od najnowszych bestsellerów po klasykę literatury światowej.</p>
                    <p>Nasz zespół to pasjonaci literatury, którzy nieustannie poszukują dla Was najciekawszych i najbardziej inspirujących dzieł. Jesteśmy tutaj, by towarzyszyć Wam w Waszych literackich podróżach i dzielić się naszą pasją do czytania.</p>
                    <p>Dołącz do nas w naszej misji odkrywania, dzielenia się i inspiracji poprzez słowo pisanego świata. Razem możemy przemierzać niezbadane zakątki literackiego wszechświata i czerpać z niego nieskończoną inspirację.</p>
                    <p>W Galaktycznych Lekturach nie ma granic - zapraszamy do wspólnej podróży przez strony i historie, które kształtują nasze myśli i dusze.</p>
                    <p>Życzymy Wam wspaniałych przygód literackich!</p>
                    <p>Zespół Galaktycznych Lektur</p>
                </div>
                <div className='slider_container'>
                    <AwesomeSlider>
                        <div data-src="images/About_us/GL_1.jpg" />
                        <div data-src="images/About_us/GL_2.jpg" />
                        <div data-src="images/About_us/GL_3.jpg" />
                        <div data-src="images/About_us/GL_4.jpg" />
                        <div data-src="images/About_us/GL_5.jpg" />
                        <div data-src="images/About_us/GL_6.jpg" />
                        <div data-src="images/About_us/GL_7.jpg" />
                        <div data-src="images/About_us/GL_8.jpg" />
                        <div data-src="images/About_us/GL_9.jpg" />
                    </AwesomeSlider>
                </div>
            </div>
            
        </div>
    )
}

export default About_Us;
