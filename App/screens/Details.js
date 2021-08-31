import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import { format } from "date-fns";

import { weatherApi } from "../util/weatherApi";
import { Container } from "../components/Container";
import { WeatherIcon } from "../components/WeatherIcon";

import { BasicRow } from "../components/List";
import { H1, H2, P } from "../components/Text";
import { addRecentSearch } from "../util/recentSearch";

const groupForecastByDay = list => {
  const data = {};

  list.forEach(item => {
    const [day] = item.dt_txt.split(" ");
    if (data[day]) {
      if (data[day].temp_max < item.main.temp_max) {
        data[day].temp_max = item.main.temp_max;
      }

      if (data[day].temp_min > item.main.temp_min) {
        data[day].temp_min = item.main.temp_min;
      }
    } else {
      data[day] = {
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max
      };
    }
  });

  const formattedList = Object.keys(data).map(key => {
    return {
      day: key,
      ...data[key] //copies over temp_min AND max
    };
  });
  return formattedList;
};

export default class Details extends React.Component {
  state = {
    currentWeather: {},
    loadingCurrentWeather: true,
    forecast: [],
    loadingForecast: true,
    isCelcius: false
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.getCurrentWeather({ coords: position.coords });
      this.getForecast({ coords: position.coords });
    });
  }

  componentDidUpdate(prevProps) {
    const oldLat = prevProps.navigation.getParam("lat");
    const lat = this.props.navigation.getParam("lat");

    const oldLon = prevProps.navigation.getParam("lon");
    const lon = this.props.navigation.getParam("lon");

    const oldZipcode = prevProps.navigation.getParam("zipcode");
    const zipcode = this.props.navigation.getParam("zipcode");

    // NOTE: latitude & longitute comparisons give potential results that are
    // neighboring cities. Not really an issue, but could be upgraded for accuracy.
    if (lat && oldLat !== lat && lon && oldLon !== lon) {
      this.getCurrentWeather({ coords: { latitude: lat, longitude: lon } });
      this.getForecast({ coords: { latitude: lat, longitude: lon } });
    } else if (zipcode && oldZipcode !== zipcode) {
      this.getCurrentWeather({ zipcode });
      this.getForecast({ zipcode });
    }
  }

  handleError = () => {
    // Give message explaining error
    Alert.alert("No location data found!", "Please try again.", [
      {
        text: "Okay",
        onPress: () => this.props.navigation.navigate("Search")
      }
    ]);
  };

  getCurrentWeather = ({ zipcode, coords }) =>
    weatherApi("/weather", { zipcode, coords })
      .then(response => {
        // console.log("currentweather", response); //not necessary
        if (response.cod === "404") {
          this.handleError();
        } else {
          this.props.navigation.setParams({ title: response.name });
          this.setState({
            currentWeather: response,
            loadingCurrentWeather: false
          });
          addRecentSearch({
            id: response.id,
            name: response.name,
            lat: response.coord.lat,
            lon: response.coord.lon
          });
        }
      })
      .catch(err => {
        console.log("current error", err);
        this.handleError();
      });

  getForecast = ({ zipcode, coords }) =>
    weatherApi("/forecast", { zipcode, coords })
      .then(response => {
        // console.log("currentforecast: ", response); // find the time and use the variable to dictate day/night sounds
        if (response.cod !== "404") {
          this.setState({
            loadingForecast: false,
            forecast: groupForecastByDay(response.list)
          });
        }
      })
      .catch(err => {
        console.log("forecast error", err);
      });

  render() {
    if (this.state.loadingCurrentWeather || this.state.loadingForecast) {
      return (
        <Container>
          <ActivityIndicator color="#fff" size="large" />
        </Container>
      );
    }

    const { weather, main } = this.state.currentWeather;

    return (
      <Container>
        <ScrollView>
          <SafeAreaView>
            <WeatherIcon icon={weather[0].icon} />
            {/* UPDATE: F° to C° on TAP */}
            <TouchableOpacity
              onPress={() => {
                // boolean that checks Celcius visibility
                if (this.state.isCelcius == false) {
                  this.setState({ isCelcius: true });
                } else if (this.state.isCelcius == true) {
                  this.setState({ isCelcius: false });
                }
                () => this.navigation.setState;
              }}
            >
              <H1>
                {this.state.isCelcius
                  ? `${Math.round((main.temp - 32) * (5 / 9))}°C`
                  : `${Math.round(main.temp)}°F`}
              </H1>
            </TouchableOpacity>
            <BasicRow>
              <H2> {`Humidity: ${main.humidity}%`} </H2>
            </BasicRow>
            <BasicRow>
              <H2>
                {this.state.isCelcius
                  ? `Low: ${Math.round((main.temp_min - 32) * (5 / 9))}°C`
                  : `Low: ${Math.round(main.temp_min)}°F`}
              </H2>
              <H2>
                {this.state.isCelcius
                  ? `High: ${Math.round((main.temp_max - 32) * (5 / 9))}°C`
                  : `High: ${Math.round(main.temp_max)}°F`}
              </H2>
            </BasicRow>

            <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
              {this.state.forecast.map(day => {
                return (
                  <BasicRow
                    key={day.day}
                    style={{ justifyContent: "space-between" }}
                  >
                    <P>{format(new Date(day.day), "eeee, MMM d")}</P>
                    <View style={{ flexDirection: "row" }}>
                      <P style={{ fontWeight: "700", marginRight: 10 }}>
                        {this.state.isCelcius
                          ? Math.round((day.temp_max - 32) * (5 / 9))
                          : Math.round(day.temp_max)}
                      </P>
                      <P>
                        {this.state.isCelcius
                          ? Math.round((day.temp_min - 32) * (5 / 9))
                          : Math.round(day.temp_min)}
                      </P>
                    </View>
                  </BasicRow>
                );
              })}
            </View>
          </SafeAreaView>
        </ScrollView>
      </Container>
    );
  }
}
