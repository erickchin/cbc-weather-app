import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectWeather,
} from './weatherSlice';
import styles from './Weather.module.css';

export function Weather() {

    const weather = useSelector(selectWeather);

    return (
        <div className={styles.row}>
            <div className={styles.row_weather}>
                {weather ? <div>
                    <table>
                        <tr>
                            <th><img src={`http://openweathermap.org/img/wn/${weather.weather.summary.icon}@2x.png`} /></th>
                            <th><h4>{weather.name}, {weather.country}</h4>
                                <p>{weather.weather.summary.title}, {weather.weather.summary.description}</p></th>
                        </tr>
                        <tr>
                            <td colspan="2"> <p>Actual: {weather.weather.temperature.actual}°c, Feels like: {weather.weather.temperature.feelsLike}°c</p></td>
                        </tr>
                        <tr>
                            <td colspan="2"> <p>Min: {weather.weather.temperature.min}°c, Max: {weather.weather.temperature.max}°c</p></td>
                        </tr>
                    </table>
                </div> : null}
            </div>
        </div >
    )
}