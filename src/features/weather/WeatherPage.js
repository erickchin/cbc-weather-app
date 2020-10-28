import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateWeatherAsync } from './weatherSlice';
import { getCity } from '../../helper/apiHelper';
import styles from './Weather.module.css';
import { Weather } from './Weather';

export function WeatherPage() {
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState([]);
  const [city, setCity] = useState("")

  // To find the city the user is in through Google API
  const computeCoordinates = () => {
    getCity(coordinates[1], coordinates[0]).then((result) => {
      let addressComponents = result.data.results[0].address_components
      for (let i = 0; i < addressComponents.length; i++) {
        let types = addressComponents[i].types
        if (types == "locality,political")
          setCity(addressComponents[i].long_name);
      }
    })
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCoordinates([position.coords.longitude, position.coords.latitude])
        computeCoordinates()
        dispatch(updateWeatherAsync(city))
      })
    } else {
      console.log("Not supported")
    }
  }, [city, coordinates]);

  return (
    <div>
      <div className={styles.row}>
        <Weather />
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Refresh wather"
          onClick={() => dispatch(updateWeatherAsync(city))}
        >
          Refresh weather
        </button>
      </div>
    </div >
  );
}
