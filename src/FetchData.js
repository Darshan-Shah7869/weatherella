import axios from "axios";

const FetchData = async (cityName) => {
  const apiKey = "d6d4573a75cb52529f3a15165bbed09a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  const output = await axios.get(url);
  console.log(output);
  return output;
};

export default FetchData;
