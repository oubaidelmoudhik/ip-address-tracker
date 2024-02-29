import './App.css';
import arrow from '../images/icon-arrow.svg';
import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import mapboxgl from 'mapbox-gl';
import MapComp from './components/Map';

mapboxgl.accessToken =
  'pk.eyJ1Ijoib3ViYWlkbHVtYSIsImEiOiJjbHQ1dXZyazYwNXUyMmtvMXZjeXE1Z2lzIn0.OcGQkEqa-yT01k68Gwn6dw';

function App() {
  const [ip, setIp] = useState('');
  const [data, setData] = useState({});

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(11);

  function getLocation() {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_LP2rX9qNqkxSGnHy6q4zm7wQmKvSR&ipAddress=${ip}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLat(data.location.lat);
        setLng(data.location.lng);
      });
    return data;
  }

  // GET THE USER LOCATION
  useEffect(() => {
    getLocation();
  }, []);

  // useEffect(() => {
  //   if (map.current) {
  //     // Update map center when lat or lng changes
  //     map.current.setCenter([lng, lat]);
  //   }
  // }, [lat, lng]);

  return (
    <main>
      <header>
        <h1>IP Address Tracker</h1>
        <form
          action=''
          onSubmit={(e) => {
            e.preventDefault();
            getLocation();
          }}
        >
          <input
            id='ipInput'
            type='text'
            placeholder='Search for any IP address or domain'
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />

          <button id='submitInput' type='submit'>
            <img src={arrow} alt='Submit' />
          </button>
        </form>
        <article className='results'>
          <div>
            <h3>IP Address</h3>
            <h2>{data.ip ? data.ip : ''}</h2>
          </div>
          <div>
            <h3>Location</h3>
            <h2>
              {data.location
                ? `${data.location.region}, ${data.location.country}`
                : ''}
            </h2>
          </div>
          <div>
            <h3>Timezone</h3>
            <h2>{data.location ? `UTC ${data.location.timezone}` : ''}</h2>
          </div>
          <div>
            <h3>ISP</h3>
            <h2>{data.isp ? data.isp : ''}</h2>
          </div>
        </article>
      </header>
      <div>
        <MapComp lng={lng} lat={lat} />
      </div>
    </main>
  );
}

export default App;
