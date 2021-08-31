export const getWeatherIcon = icon => {
  switch (icon) {
    case "1232n":
      return require("../assets/weather-icons/1232n.png");
    case "50n":
      return require("../assets/weather-icons/50n.png");
    case "50d":
      return require("../assets/weather-icons/50d.png");
    case "13n":
      return require("../assets/weather-icons/13n.png");
    case "13d":
      return require("../assets/weather-icons/13d.png");
    case "11n":
      return require("../assets/weather-icons/11n.png");
    case "11d":
      return require("../assets/weather-icons/11d.png");
    case "10n":
      return require("../assets/weather-icons/10n.png");
    case "10d":
      return require("../assets/weather-icons/10d.png");
    case "09n":
      return require("../assets/weather-icons/09n.png");
    case "09d":
      return require("../assets/weather-icons/09d.png");
    case "04d":
      return require("../assets/weather-icons/04d.png");
    case "03n":
      return require("../assets/weather-icons/03n.png");
    case "03d":
      return require("../assets/weather-icons/03d.png");
    case "02n":
      return require("../assets/weather-icons/02n.png");
    case "02d":
      return require("../assets/weather-icons/02d.png");
    case "01n":
      return require("../assets/weather-icons/01n.png");
    case "01d":
    default: {
      return require("../assets/weather-icons/01d.png");
    }
  }
};

export const getIconColor = icon => {
  switch (icon) {
    case "1232n":
      return "#fff426"; // faded yellow
    case "50n":
      return "#eb4034"; // red (for invalid/null icon data)
    case "50d":
      return "#eb4034"; // red (for invalid/null icon data)
    case "13n":
      return "#fff"; // white
    case "13d":
      return "#fff"; // white
    case "11n":
      return "#fff"; // white
    case "11d":
      return "#fff"; // white
    case "10n":
      return "#8ce8ff"; // light blue
    case "10d":
      return "#8ce8ff"; // light blue
    case "09n":
      return "#8ce8ff"; // light blue
    case "09d":
      return "#8ce8ff"; // light blue
    case "04n":
      return "#e3e3e1"; // grey
    case "04d":
      return "#e3e3e1"; // grey
    case "03n":
      return "#8ce8ff"; // light blue
    case "03d":
      return "#8ce8ff"; // light blue
    case "02n":
      return "#fff"; // white
    case "02d":
      return "#e3e3e1"; // grey
    case "01n":
      return "#e3e3e1"; // grey
    case "01d":
    default: {
      return "#fff01f"; /// sunny yellow
    }
  }
};
