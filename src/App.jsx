import axios from "axios";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import './App.css';
import unod from './climaIMG/01d.mp4';
import dosd from './climaIMG/02d.mp4';
import tresd from './climaIMG/03d.mp4';
import cuatrod from './climaIMG/04d.mp4';
import nueved from './climaIMG/09d.mp4';
import diesd from './climaIMG/10d.mp4';
import onced from './climaIMG/11d.mp4';
import treced from './climaIMG/13d.mp4';
import cincuentad from './climaIMG/50d.mp4';

import unon from './climaIMG/01n.mp4';
import dosn from './climaIMG/02n.mp4';
import tresn from './climaIMG/03n.mp4';
import cuatron from './climaIMG/04n.mp4';
import nueven from './climaIMG/09n.mp4';
import diesn from './climaIMG/10n.mp4';
import oncen from './climaIMG/11n.mp4';
import trecen from './climaIMG/13n.mp4';
import cincuentan from './climaIMG/50n.mp4';
import Temperatura from "./graficos/Temperatura";
import Precipitation from "./graficos/Precipitation";
import Precion from "./graficos/Precion";


function App() {

  const [countryPais, setCountryPais] = useState([]);
  const [input, setInput] = useState("");
  const [datosMeteologicos, setDatosMeteologicos] = useState([]);

  const [envioCiudad,setEnvioCiudad]=useState("Lima")

  useEffect(() => {
    const nuevoArray = State.getAllStates().map(ciudad => {
      const pais = Country.getAllCountries().find(pais => pais.isoCode === ciudad.countryCode);
      return {
        ciudad: ciudad.name,
        pais: pais ? pais.name : 'Desconocido',
        isoCode: ciudad.isoCode,
        ciudadPais: `${ciudad.name}, ${pais ? pais.name : 'Desconocido'}`,
        latitude: ciudad.latitude,
        longitude: ciudad.longitude ,
        isoCodepais: pais ? pais.isoCode : 'Desconocido',
      };
    });
    setCountryPais(nuevoArray);
  }, []);

  useEffect(() => {
    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=a7614b3e8f00edd02b077b80667b6593`)
        .then(res => setDatosMeteologicos(res.data));
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const textoLL = (e) => {
    const ciudad = e.split(",")[0];
    if (ciudad) {
      const busqueda = countryPais.find(ciudadPais => ciudadPais.ciudad === ciudad);  
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${busqueda.latitude}&lon=${busqueda.longitude}&appid=a7614b3e8f00edd02b077b80667b6593`)
        .then(res => setDatosMeteologicos(res.data));
    }
    setEnvioCiudad(ciudad)
  }

  const iconToFondo = {
    "01d": unod,
    "02d": dosd,
    "03d": tresd,
    "04d": cuatrod,
    "09d": nueved,
    "10d": diesd,
    "11d": onced,
    "13d": treced,
    "50d": cincuentad,
    "01n": unon,
    "02n": dosn,
    "03n": tresn,
    "04n": cuatron,
    "09n": nueven,
    "10n": diesn,
    "11n": oncen,
    "13n": trecen,
    "50n": cincuentan,
  };

console.log(envioCiudad)
// console.log(countryPais)
// console.log(Country.getAllCountries())
  return (
    <div className="bg-white px-2 border-gray-200 dark:bg-gray-900">
      <div className="container mx-auto relative py-4 z-50">
        <div onClick={() => textoLL(input)} className=" absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          onChange={e => setInput(e.target.value)}
          value={input}
          list="cities"
          type="text"
          id="search-navbar"
          className="outline-none block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ciudad, pais"
        />
        <datalist id="cities">
          {countryPais.map((pais, index) => (
            <option className="bg-slate-200" key={index}>{pais.ciudadPais}</option>
          ))}
        </datalist>
      </div>
      <div className="video fixed top-0 left-0 w-[100vw] h-[100vh]">
        <div className='player-wrapper '>
          <ReactPlayer className='react-player' url={iconToFondo[datosMeteologicos.weather?.[0].icon]} playing loop muted width='3000px' height='100%' />
        </div>
      </div>
      <div className="gap-4  container mx-auto relative py-4 z-50 bg-gray-700 rounded-lg opacity-80 grid grid-cols-4 min-h-[80vh]">
        <div className="md:col-span-2 col-span-4 mx-auto text-center grid items-center">
          <h1 className="text-white text-[1.5em]">{datosMeteologicos.sys?.country}, {datosMeteologicos.name}</h1>
          <img className="h-[25vh] w-auto" src={`https://openweathermap.org/img/wn/${datosMeteologicos.weather?.[0].icon}@2x.png`} alt="" />
        </div>
        <div className="mb-4 md:col-span-2 col-span-4 text-center grid items-center  text-[1em] md:text-[1.2em]  md:py-10">
          <h2 className="text-white text-[2em] ">{(datosMeteologicos.main?.temp - 273.15).toFixed(2)} C°</h2>
          <h2 className="text-white"><b className="text-white opacity-50" >TEMPERATURA MAX: </b> {(datosMeteologicos.main?.temp_max - 273.15).toFixed(2)} C°</h2>
          <h2 className="text-white"><b className="text-white opacity-50" >TEMPERATURA MIN: </b> {(datosMeteologicos.main?.temp_min - 273.15).toFixed(2)} C°</h2>
          <h2 className="text-white"><b className="text-white opacity-50" >HUMEDAD: </b> {datosMeteologicos.main?.humidity}%</h2>
          <h2 className="text-white"><b className="text-white opacity-50" >PRECION: </b> {datosMeteologicos.main?.pressure} hPa</h2>
        </div>
       
        <div className="mb-4 col-span-4 lg:col-span-2 grid items-center md:overflow-hidden overflow-x-scroll">
          <Temperatura envioCiudad={envioCiudad}/>

        </div>
        <div className="col-span-4 lg:col-span-2 grid items-center md:overflow-hidden overflow-x-scroll">
          <Precipitation envioCiudad={envioCiudad}/>

        </div>
        <div className="col-span-4 lg:col-span-2 grid items-center md:overflow-hidden overflow-x-scroll">
          <Precion envioCiudad={envioCiudad}/>

        </div>
      </div>
    </div>
  );
}

export default App;
