import { useState, useEffect } from "react";

import "./App.css";

import FetchData from "./FetchData";

import clearSkyImage from "./Images/clearsky.png";
import snowyImage from "./Images/snow.png";
import cloudImage from "./Images/cloud.png";
import thunderStorm from "./Images/thunderstorm.png";
import mistImage from "./Images/mist.png";
import rainyImage from "./Images/rain.png";
import calcTime from "./calcTime";
import convertime from "./convertime";

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    city: "",
    time: "",
    weatherIcon: "",
    weather: "",
    humidity: 0,
    wind: 0.0,
    temperatureMin: 0,
    temperatureMax: 0,
    timeOffset: 0,
    timezone: 0,
    longitude: 0,
    lattitude: 0,
    sunrise: 0,
    sunset: 0,
  });
  const [weatherForecastData, setWeatherForecastData] = useState({});
  const [UI, setUI] = useState({
    backgroundImage: "",
    color: "",
    weatherIcon: "",
  });
  let data;

  const [showHistoryBtn, setShowHistoryBtn] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const UIChangesHandler = (weather) => {
    if (weather === "Clouds") {
      setUI({
        backgroundImage: cloudImage,
        color: "#0A1E41",
        weatherIcon: (
          <svg
            className="weather-icon"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.3596 14.798C22.3596 14.798 22.4978 15.5 22.5449 15.5067C25.0902 15.8697 27 17.3544 27 20C27 22.8995 24.6495 25.25 21.75 25.25H8.25C5.3505 25.25 3 22.8995 3 20C3 17.3544 4.95692 15.1658 7.50223 14.8028C7.54939 14.7961 7.59559 14.7947 7.64044 14.798C8.31666 11.3508 11.3546 8.75 15 8.75C18.6454 8.75 21.6833 11.3508 22.3596 14.798Z"
              fill="#F3F3F3"
            />
            <path
              d="M8.64706 25.25C5.52827 25.25 3 22.7876 3 19.75C3 17.0968 4.92887 14.8824 7.49533 14.3645C8.37762 11.1319 11.4032 8.75 15 8.75C19.0661 8.75 22.4023 11.794 22.7371 15.67C25.1451 15.9919 27 18.0037 27 20.4375C27 23.0954 24.7878 25.25 22.0588 25.25H8.64706Z"
              stroke="#231815"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.8127 21.0641C33.8127 21.0641 33.997 22 34.0599 22.009C37.4537 22.4929 40 24.4725 40 28C40 31.866 36.866 35 33 35H15C11.134 35 8 31.866 8 28C8 24.4725 10.6092 21.5544 14.003 21.0705C14.0659 21.0615 14.1275 21.0596 14.1873 21.0641C15.0889 16.4677 19.1395 13 24 13C28.8605 13 32.9111 16.4677 33.8127 21.0641Z"
              fill="#F3F3F3"
            />
            <path
              d="M15.5294 35C11.371 35 8 31.7168 8 27.6667C8 24.1291 10.5718 21.1766 13.9938 20.486C15.1702 16.1758 19.2043 13 24 13C29.4215 13 33.8697 17.0587 34.3161 22.2266C37.5268 22.6559 40 25.3383 40 28.5833C40 32.1272 37.0503 35 33.4118 35H15.5294Z"
              stroke="#231815"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
      });
    } else if (weather === "Thunderstorm" || weather === "Tornado") {
      setUI({
        backgroundImage: thunderStorm,
        color: "#613CF1",
        weatherIcon: (
          <svg
            className="weather-icon"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.8127 21.0641C33.8127 21.0641 33.997 22 34.0599 22.009C37.4537 22.4929 40 24.4725 40 28C40 31.866 36.866 35 33 35H15C11.134 35 8 31.866 8 28C8 24.4725 10.6092 21.5544 14.003 21.0705C14.0659 21.0615 14.1275 21.0596 14.1873 21.0641C15.0889 16.4677 19.1395 13 24 13C28.8605 13 32.9111 16.4677 33.8127 21.0641Z"
              fill="#F3F3F3"
            />
            <path
              d="M33 35H33.4118C37.0503 35 40 32.1272 40 28.5833C40 25.3383 37.5268 22.6559 34.3161 22.2266C33.8697 17.0587 29.4215 13 24 13C19.2043 13 15.1702 16.1758 13.9938 20.486C10.5718 21.1766 8 24.1291 8 27.6667C8 31.5434 11.0886 34.7175 15 34.9822"
              stroke="#231815"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M26.866 37.5622C26.3877 37.2861 26.2612 36.6098 26.5833 36.0518L28.9167 32.0104C29.2388 31.4524 29.8877 31.2239 30.366 31.5C30.8443 31.7762 30.9709 32.4524 30.6487 33.0104L28.3154 37.0518C27.9932 37.6098 27.3443 37.8383 26.866 37.5622Z"
              fill="#231815"
            />
            <path
              d="M25.9808 33.1872C25.9396 33.0676 25.8374 32.9812 25.7157 32.9633L21.9947 32.4116L23.7017 28.4818C23.7473 28.376 23.7382 28.2533 23.6769 28.1559C23.6159 28.0588 23.511 28 23.3988 28H18.2022C18.0236 28 17.8772 28.1458 17.8708 28.3297L17.6315 35.3135C17.6255 35.488 17.7481 35.6391 17.9157 35.664L20.5027 36.048L17.0414 42.4926C16.9603 42.6443 17.0015 42.8341 17.1376 42.9357C17.1962 42.9793 17.2639 43 17.3316 43C17.4214 43 17.5105 42.9623 17.5755 42.8894L25.9127 33.5332C25.9958 33.4399 26.022 33.3068 25.9808 33.1872Z"
              fill="#FFB900"
            />
          </svg>
        ),
      });
    } else if (weather === "Rain" || weather === "Drizzle") {
      setUI({
        backgroundImage: rainyImage,
        color: "#588AA4",
        weatherIcon: (
          <svg
            className="weather-icon"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.8127 21.0641C33.8127 21.0641 33.997 22 34.0599 22.009C37.4537 22.4929 40 24.4725 40 28C40 31.866 36.866 35 33 35H15C11.134 35 8 31.866 8 28C8 24.4725 10.6092 21.5544 14.003 21.0705C14.0659 21.0615 14.1275 21.0596 14.1873 21.0641C15.0889 16.4677 19.1395 13 24 13C28.8605 13 32.9111 16.4677 33.8127 21.0641Z"
              fill="#F3F3F3"
            />
            <path
              d="M33 35H33.4118C37.0503 35 40 32.1272 40 28.5833C40 25.3383 37.5268 22.6559 34.3161 22.2266C33.8697 17.0587 29.4215 13 24 13C19.2043 13 15.1702 16.1758 13.9938 20.486C10.5718 21.1766 8 24.1291 8 27.6667C8 31.5434 11.0886 34.7175 15 34.9822"
              stroke="#231815"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 37.6962L20.5 33.366M23 36.6962L25.5 32.366M27 38.6962L29.5 34.366"
              stroke="#231815"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
      });
    } else if (weather === "Snow") {
      setUI({
        backgroundImage: snowyImage,
        color: "#637E85",
        weatherIcon: (
          <svg
            className="weather-icon"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.8127 21.0641C33.8127 21.0641 33.997 22 34.0599 22.009C37.4537 22.4929 40 24.4725 40 28C40 31.866 36.866 35 33 35H15C11.134 35 8 31.866 8 28C8 24.4725 10.6092 21.5544 14.003 21.0705C14.0659 21.0615 14.1275 21.0596 14.1873 21.0641C15.0889 16.4677 19.1395 13 24 13C28.8605 13 32.9111 16.4677 33.8127 21.0641Z"
              fill="#F3F3F3"
            />
            <path
              d="M33 35H33.4118C37.0503 35 40 32.1272 40 28.5833C40 25.3383 37.5268 22.6559 34.3161 22.2266C33.8697 17.0587 29.4215 13 24 13C19.2043 13 15.1702 16.1758 13.9938 20.486C10.5718 21.1766 8 24.1291 8 27.6667C8 31.5434 11.0886 34.7175 15 34.9822"
              stroke="#231815"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.2735 28.875C19.2735 28.3918 19.6652 28 20.1485 28C20.6317 28 21.0235 28.3918 21.0235 28.875V29.9845L21.9843 29.4297C22.4028 29.1881 22.9379 29.3315 23.1796 29.75C23.4212 30.1685 23.2778 30.7036 22.8593 30.9453L21.8985 31.5L22.8593 32.0547C23.2778 32.2964 23.4212 32.8315 23.1796 33.25C22.9379 33.6685 22.4028 33.8119 21.9843 33.5703L21.0235 33.0156V34.125C21.0235 34.6082 20.6317 35 20.1485 35C19.6652 35 19.2735 34.6082 19.2735 34.125V33.0155L18.3126 33.5703C17.8941 33.8119 17.359 33.6685 17.1174 33.25C16.8758 32.8315 17.0191 32.2964 17.4376 32.0547L18.3985 31.5L17.4376 30.9453C17.0191 30.7036 16.8757 30.1685 17.1174 29.75C17.359 29.3315 17.8941 29.1881 18.3126 29.4297L19.2735 29.9845V28.875Z"
              fill="#231815"
            />
            <path
              d="M27.2735 30.875C27.2735 30.3918 27.6652 30 28.1485 30C28.6317 30 29.0235 30.3918 29.0235 30.875V31.9845L29.9843 31.4297C30.4028 31.1881 30.9379 31.3315 31.1796 31.75C31.4212 32.1685 31.2778 32.7036 30.8593 32.9453L29.8985 33.5L30.8593 34.0547C31.2778 34.2964 31.4212 34.8315 31.1796 35.25C30.9379 35.6685 30.4028 35.8119 29.9843 35.5703L29.0235 35.0156V36.125C29.0235 36.6082 28.6317 37 28.1485 37C27.6652 37 27.2735 36.6082 27.2735 36.125V35.0155L26.3126 35.5703C25.8941 35.8119 25.359 35.6685 25.1174 35.25C24.8758 34.8315 25.0191 34.2964 25.4376 34.0547L26.3985 33.5L25.4376 32.9453C25.0191 32.7036 24.8757 32.1685 25.1174 31.75C25.359 31.3315 25.8941 31.1881 26.3126 31.4297L27.2735 31.9845V30.875Z"
              fill="#231815"
            />
            <path
              d="M21.2735 36.375C21.2735 35.8918 21.6652 35.5 22.1485 35.5C22.6317 35.5 23.0235 35.8918 23.0235 36.375V37.4845L23.9843 36.9297C24.4028 36.6881 24.9379 36.8315 25.1796 37.25C25.4212 37.6685 25.2778 38.2036 24.8593 38.4453L23.8985 39L24.8593 39.5547C25.2778 39.7964 25.4212 40.3315 25.1796 40.75C24.9379 41.1685 24.4028 41.3119 23.9843 41.0703L23.0235 40.5156V41.625C23.0235 42.1082 22.6317 42.5 22.1485 42.5C21.6652 42.5 21.2735 42.1082 21.2735 41.625V40.5155L20.3126 41.0703C19.8941 41.3119 19.359 41.1685 19.1174 40.75C18.8758 40.3315 19.0191 39.7964 19.4376 39.5547L20.3985 39L19.4376 38.4453C19.0191 38.2036 18.8757 37.6685 19.1174 37.25C19.359 36.8315 19.8941 36.6881 20.3126 36.9297L21.2735 37.4845V36.375Z"
              fill="#231815"
            />
          </svg>
        ),
      });
    } else if (
      weather === "Mist" ||
      weather === "Smoke" ||
      weather === "Haze" ||
      weather === "Dust" ||
      weather === "Fog" ||
      weather === "Sand" ||
      weather === "Dust" ||
      weather === "Ash" ||
      weather === "Squall"
    ) {
      setUI({
        backgroundImage: mistImage,
        color: "#7DA7A6",
        weatherIcon: (
          <svg
            className="weather-icon"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.8"
              x="10.56"
              y="17.28"
              width="26.88"
              height="1.92"
              rx="0.96"
              fill="#fff"
            />
            <rect
              x="10.56"
              y="13.44"
              width="26.88"
              height="1.92"
              rx="0.96"
              fill="#fff"
            />
            <rect
              opacity="0.6"
              x="10.56"
              y="21.12"
              width="26.88"
              height="1.92"
              rx="0.96"
              fill="#fff"
            />
            <rect
              opacity="0.4"
              x="10.56"
              y="24.96"
              width="26.88"
              height="1.92"
              rx="0.960001"
              fill="#fff"
            />
            <rect
              opacity="0.2"
              x="10.56"
              y="28.8"
              width="26.88"
              height="1.92"
              rx="0.96"
              fill="#fff"
            />
            <rect
              opacity="0.1"
              x="10.56"
              y="32.64"
              width="26.88"
              height="1.92"
              rx="0.960001"
              fill="#fff"
            />
          </svg>
        ),
      });
    } else if (weather === "Clear") {
      setUI({
        backgroundImage: clearSkyImage,
        color: "#ADD416",
        weatherIcon: (
          <svg
            className="weather-icon"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M35 24C35 30.0751 30.0751 35 24 35C17.9249 35 13 30.0751 13 24C13 17.9249 17.9249 13 24 13C30.0751 13 35 17.9249 35 24Z"
              stroke="#231815"
              stroke-width="2"
            />
            <line
              x1="43"
              y1="24"
              x2="39"
              y2="24"
              stroke="#F25022"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line
              x1="9"
              y1="24"
              x2="5"
              y2="24"
              stroke="#F25022"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line
              x1="43"
              y1="24"
              x2="39"
              y2="24"
              stroke="#231815"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line
              x1="9"
              y1="24"
              x2="5"
              y2="24"
              stroke="#231815"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <g clip-path="url(#clip0)">
              <line
                x1="40.4545"
                y1="33.5"
                x2="36.9904"
                y2="31.5"
                stroke="#231815"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g clip-path="url(#clip1)">
              <line
                x1="11.0096"
                y1="16.5"
                x2="7.54551"
                y2="14.5"
                stroke="#231815"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g clip-path="url(#clip2)">
              <line
                x1="33.5"
                y1="40.4545"
                x2="31.5"
                y2="36.9904"
                stroke="#231815"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g clip-path="url(#clip3)">
              <line
                x1="16.5"
                y1="11.0096"
                x2="14.5"
                y2="7.54551"
                stroke="#231815"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g clip-path="url(#clip4)">
              <line
                x1="24"
                y1="43"
                x2="24"
                y2="39"
                stroke="#231815"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g clip-path="url(#clip5)">
              <line
                x1="24"
                y1="9"
                x2="24"
                y2="5"
                stroke="#231815"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g clip-path="url(#clip6)">
              <line
                x1="14.5"
                y1="40.4545"
                x2="16.5"
                y2="36.9904"
                stroke="#231815"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g clip-path="url(#clip7)">
              <line
                x1="31.5"
                y1="11.0096"
                x2="33.5"
                y2="7.54551"
                stroke="#231815"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g clip-path="url(#clip8)">
              <line
                x1="7.54553"
                y1="33.5"
                x2="11.0096"
                y2="31.5"
                stroke="#231815"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g clip-path="url(#clip9)">
              <line
                x1="36.9904"
                y1="16.5"
                x2="40.4545"
                y2="14.5"
                stroke="#231815"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <path
              d="M34 24C34 29.5228 29.5228 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24Z"
              fill="#FFB900"
            />
            <defs>
              <clipPath id="clip0">
                <rect
                  x="36.2583"
                  y="28.7679"
                  width="8"
                  height="4"
                  rx="2"
                  transform="rotate(30 36.2583 28.7679)"
                  fill="white"
                />
              </clipPath>
              <clipPath id="clip1">
                <rect
                  x="6.81348"
                  y="11.7679"
                  width="8"
                  height="4"
                  rx="2"
                  transform="rotate(30 6.81348 11.7679)"
                  fill="white"
                />
              </clipPath>
              <clipPath id="clip2">
                <rect
                  x="32.2321"
                  y="34.2583"
                  width="8"
                  height="4"
                  rx="2"
                  transform="rotate(60 32.2321 34.2583)"
                  fill="white"
                />
              </clipPath>
              <clipPath id="clip3">
                <rect
                  x="15.2321"
                  y="4.81346"
                  width="8"
                  height="4"
                  rx="2"
                  transform="rotate(60 15.2321 4.81346)"
                  fill="white"
                />
              </clipPath>
              <clipPath id="clip4">
                <rect
                  x="26"
                  y="37"
                  width="8"
                  height="4"
                  rx="2"
                  transform="rotate(90 26 37)"
                  fill="white"
                />
              </clipPath>
              <clipPath id="clip5">
                <rect
                  x="26"
                  y="3"
                  width="8"
                  height="4"
                  rx="2"
                  transform="rotate(90 26 3)"
                  fill="white"
                />
              </clipPath>
              <clipPath id="clip6">
                <rect
                  x="19.2321"
                  y="36.2583"
                  width="8"
                  height="4"
                  rx="2"
                  transform="rotate(120 19.2321 36.2583)"
                  fill="white"
                />
              </clipPath>
              <clipPath id="clip7">
                <rect
                  x="36.2321"
                  y="6.81346"
                  width="8"
                  height="4"
                  rx="2"
                  transform="rotate(120 36.2321 6.81346)"
                  fill="white"
                />
              </clipPath>
              <clipPath id="clip8">
                <rect
                  x="13.7417"
                  y="32.2321"
                  width="8"
                  height="4"
                  rx="2"
                  transform="rotate(150 13.7417 32.2321)"
                  fill="white"
                />
              </clipPath>
              <clipPath id="clip9">
                <rect
                  x="43.1865"
                  y="15.2321"
                  width="8"
                  height="4"
                  rx="2"
                  transform="rotate(150 43.1865 15.2321)"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
        ),
      });
    } else if (weather === "Clouds") {
      setUI({
        backgroundImage: cloudImage,
        color: "#0A1E41",
        weatherIcon: (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.3596 14.798C22.3596 14.798 22.4978 15.5 22.5449 15.5067C25.0902 15.8697 27 17.3544 27 20C27 22.8995 24.6495 25.25 21.75 25.25H8.25C5.3505 25.25 3 22.8995 3 20C3 17.3544 4.95692 15.1658 7.50223 14.8028C7.54939 14.7961 7.59559 14.7947 7.64044 14.798C8.31666 11.3508 11.3546 8.75 15 8.75C18.6454 8.75 21.6833 11.3508 22.3596 14.798Z"
              fill="#F3F3F3"
            />
            <path
              d="M8.64706 25.25C5.52827 25.25 3 22.7876 3 19.75C3 17.0968 4.92887 14.8824 7.49533 14.3645C8.37762 11.1319 11.4032 8.75 15 8.75C19.0661 8.75 22.4023 11.794 22.7371 15.67C25.1451 15.9919 27 18.0037 27 20.4375C27 23.0954 24.7878 25.25 22.0588 25.25H8.64706Z"
              stroke="#231815"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.8127 21.0641C33.8127 21.0641 33.997 22 34.0599 22.009C37.4537 22.4929 40 24.4725 40 28C40 31.866 36.866 35 33 35H15C11.134 35 8 31.866 8 28C8 24.4725 10.6092 21.5544 14.003 21.0705C14.0659 21.0615 14.1275 21.0596 14.1873 21.0641C15.0889 16.4677 19.1395 13 24 13C28.8605 13 32.9111 16.4677 33.8127 21.0641Z"
              fill="#F3F3F3"
            />
            <path
              d="M15.5294 35C11.371 35 8 31.7168 8 27.6667C8 24.1291 10.5718 21.1766 13.9938 20.486C15.1702 16.1758 19.2043 13 24 13C29.4215 13 33.8697 17.0587 34.3161 22.2266C37.5268 22.6559 40 25.3383 40 28.5833C40 32.1272 37.0503 35 33.4118 35H15.5294Z"
              stroke="#231815"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
      });
    }
  };

  useEffect(() => {
    UIChangesHandler(weatherData.weather);
  }, [weatherData]);

  const getDataHandler = async () => {
    if (selectedCity) {
      data = await (await FetchData(selectedCity)).data;

      await setWeatherData({
        temperature: Math.round(data.main.temp),
        temperatureMin: Math.round(data.main.temp_min),
        temperatureMax: Math.round(data.main.temp_max),
        city: data.name,
        timeOffset: data.timezone,
        weather: data.weather[0].main,
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed),
        timezone: data.timezone,
        weatherIcon: data.weather[0].icon,
        longitude: data.coord.lon,
        lattitude: data.coord.lat,
        sunrise: convertime(data.sys.sunrise),
        sunset: convertime(data.sys.sunset),
      });

      // Set weather forecast data
      setShowHistoryBtn(true);

      console.log(data);
    }
  };

  const locationDetails = calcTime(weatherData.timezone.toString());

  return (
    <div className="App">
      <main
        style={{ backgroundImage: `url(${UI.backgroundImage})` }}
        className="main"
      >
        <div className="main-body">
          <div className="overlay">&nbsp;</div>
          <div className="main-container">
            <div className="main__left">
              <p className="logoBox">
                <p className="logo">Weatherella</p>
                {showHistoryBtn && (
                  <div
                    onClick={() => {
                      setShowHistory(!showHistory);
                    }}
                    className="history-btn"
                  >
                    {showHistory ? (
                      <svg
                        width="54"
                        height="54"
                        viewBox="0 0 54 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="27" cy="27" r="27" fill="white" />
                        <path
                          d="M35 21.4L33.6 20L27 26.6L20.4 20L19 21.4L25.6 28L19 34.6L20.4 36L27 29.4L33.6 36L35 34.6L28.4 28L35 21.4Z"
                          fill="black"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="54"
                        height="54"
                        viewBox="0 0 54 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="27" cy="27" r="27" fill="white" />
                        <g clip-path="url(#clip0_613_752)">
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15.8753 19.5001L13.7473 17.3721C13.6861 17.3108 13.608 17.269 13.5231 17.2521C13.4381 17.2351 13.35 17.2438 13.27 17.2769C13.1899 17.3101 13.1215 17.3663 13.0735 17.4384C13.0254 17.5105 12.9998 17.5952 13 17.6819V24.0624C13 24.3039 13.196 24.4999 13.4375 24.4999H19.818C19.9046 24.5 19.9894 24.4745 20.0615 24.4264C20.1336 24.3783 20.1898 24.31 20.2229 24.2299C20.2561 24.1499 20.2648 24.0618 20.2478 23.9768C20.2309 23.8918 20.1891 23.8138 20.1278 23.7526L17.7513 21.3761C19.3004 19.2125 21.5591 17.6605 24.1343 16.9901C26.7095 16.3197 29.4383 16.5734 31.8458 17.707C34.2532 18.8407 36.1871 20.7825 37.3109 23.1946C38.4346 25.6067 38.6772 28.3364 37.9963 30.9089C37.3153 33.4813 35.7541 35.7336 33.5842 37.2739C31.4142 38.8142 28.773 39.545 26.1199 39.3391C23.4668 39.1333 20.9699 38.0038 19.0636 36.1472C17.1572 34.2905 15.9622 31.8243 15.6863 29.1776C15.6505 28.8312 15.4786 28.5131 15.2083 28.2934C14.9381 28.0736 14.5916 27.9703 14.2451 28.006C13.8987 28.0417 13.5806 28.2137 13.3608 28.4839C13.1411 28.7542 13.0378 29.1007 13.0735 29.4471C13.4102 32.6868 14.8658 35.7077 17.1897 37.9899C19.5136 40.2721 22.5604 41.6726 25.8057 41.9505C29.0509 42.2284 32.2915 41.3662 34.9696 39.5124C37.6477 37.6585 39.5956 34.929 40.4782 31.7937C41.3607 28.6585 41.1226 25.3136 39.8049 22.335C38.4871 19.3563 36.1721 16.9303 33.2585 15.4745C30.3448 14.0187 27.0147 13.6242 23.8416 14.359C20.6684 15.0938 17.8507 16.9118 15.8735 19.5001H15.8753ZM26.5625 20.9999C26.9106 20.9999 27.2444 21.1382 27.4906 21.3843C27.7367 21.6304 27.875 21.9643 27.875 22.3124V27.5484L31.424 28.9694C31.7367 29.1057 31.9841 29.3585 32.1137 29.6741C32.2433 29.9897 32.2448 30.3434 32.1181 30.6601C31.9913 30.9769 31.7462 31.2318 31.4347 31.371C31.1232 31.5101 30.7697 31.5224 30.4492 31.4054L26.0743 29.6554C25.8309 29.5579 25.6224 29.3898 25.4755 29.1727C25.3286 28.9556 25.2501 28.6995 25.25 28.4374V22.3124C25.25 21.9643 25.3883 21.6304 25.6344 21.3843C25.8806 21.1382 26.2144 20.9999 26.5625 20.9999V20.9999Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_613_752">
                            <rect
                              width="28"
                              height="28"
                              fill="white"
                              transform="translate(13 14)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                  </div>
                )}
              </p>
              {showHistory && (
                <div className="dayContainer">
                  <div className="dayBox">
                    <div className="dayImageBox">
                      <img src="" alt="" className="dayImage" />
                    </div>
                    <div className="dayBoxDetailsBox">
                      <div className="dayBoxDetails">
                        <div className="dayBoxDetailsField"></div>
                        <div className="dayBoxDetailsData"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!showHistory && (
                <div className="main-detail-box">
                  <div className="temperature">{weatherData.temperature}°</div>
                  <div className="position-box">
                    <div className="position">{weatherData.city}</div>
                    <div className="time">
                      {/* 06:09 Sunday, 16 Oct ‘19{' '} */}
                      {`${locationDetails.time} ${locationDetails.day}, ${locationDetails.date} ${locationDetails.month} ‘${locationDetails.year} `}
                    </div>
                  </div>
                  <div className="weather-box">
                    <div>{UI.weatherIcon}</div>
                    <div className="weather">{weatherData.weather}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="main__right">
              <div className="main__right-container">
                <div
                  style={{ backgroundColor: UI.color }}
                  onClick={getDataHandler}
                  className="search-btn"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.0535 18.5603L16.5187 14.0255C17.2027 12.9035 17.5963 11.5835 17.5963 10.1735C17.5963 6.07312 14.0431 2.52112 9.94273 2.52112C5.84233 2.52112 2.51953 5.84392 2.51953 9.94432C2.51953 14.0435 6.07273 17.5967 10.1719 17.5967C11.5363 17.5967 12.8119 17.2259 13.9099 16.5839L18.4687 21.1451C18.9151 21.5903 19.6387 21.5903 20.0839 21.1451L21.2155 20.0135C21.6607 19.5683 21.4987 19.0055 21.0535 18.5603ZM4.80433 9.94432C4.80433 7.10512 7.10473 4.80472 9.94273 4.80472C12.7807 4.80472 15.3115 7.33312 15.3115 10.1735C15.3115 13.0115 13.0099 15.3131 10.1719 15.3131C7.33393 15.3131 4.80433 12.7823 4.80433 9.94432Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="main__right-header">
                  <input
                    style={{
                      borderBottom: `1px solid ${UI.color}`,
                    }}
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                    }}
                    type="text"
                    className="city__input"
                    placeholder="Enter city name"
                  />
                  {/* <div style={{ color: UI.color }} className="city-box">
                    <p className="city">Ahmedabad</p>
                    <p className="city">Mumbai</p>
                    <p className="city">London</p>
                    <p className="city">New York</p>
                  </div> */}
                  <p className="weather-details-title">Weather Details</p>
                  <div
                    style={{
                      borderBottom: `1px solid ${UI.color}`,
                    }}
                    className="weather-details-box"
                  >
                    <div className="weather-details-item">
                      <div
                        style={{ color: UI.color }}
                        className="weather-details"
                      >
                        Humidity
                      </div>
                      <div className="weather-details-value">
                        {weatherData.humidity}%
                      </div>
                    </div>
                    {/* <div className="weather-details-item">
                      <div
                        style={{ color: UI.color }}
                        className="weather-details"
                      >
                        Wind
                      </div>
                      <div className="weather-details-value">
                        {weatherData.wind}km/h
                      </div>
                    </div> */}

                    <div className="weather-details-item">
                      <div
                        style={{ color: UI.color }}
                        className="weather-details"
                      >
                        Temperature (Min)
                      </div>
                      <div className="weather-details-value">
                        {weatherData.temperatureMin}°
                      </div>
                    </div>
                    <div className="weather-details-item">
                      <div
                        style={{ color: UI.color }}
                        className="weather-details"
                      >
                        Temperature (Max)
                      </div>
                      <div className="weather-details-value">
                        {weatherData.temperatureMax}°
                      </div>
                    </div>

                    <div className="weather-details-item">
                      <div
                        style={{ color: UI.color }}
                        className="weather-details"
                      >
                        Longitute
                      </div>
                      <div className="weather-details-value">
                        {weatherData.longitude}
                      </div>
                    </div>
                    <div className="weather-details-item">
                      <div
                        style={{ color: UI.color }}
                        className="weather-details"
                      >
                        Lattitude
                      </div>
                      <div className="weather-details-value">
                        {weatherData.lattitude}
                      </div>
                    </div>
                    <div className="weather-details-item">
                      <div
                        style={{ color: UI.color }}
                        className="weather-details"
                      >
                        Sunrise
                      </div>
                      <div className="weather-details-value">
                        {weatherData.sunrise}
                      </div>
                    </div>
                    <div className="weather-details-item">
                      <div
                        style={{ color: UI.color }}
                        className="weather-details"
                      >
                        Sunset
                      </div>
                      <div className="weather-details-value">
                        {weatherData.sunset}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="chartBtn">Click to see chart</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
