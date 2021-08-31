import React from "react";
import { View, Image } from "react-native";

import { getWeatherIcon, getIconColor } from "../util/icons";

export const WeatherIcon = ({ icon }) => (
  <View style={{ alignItems: "center" }}>
    <Image
      source={getWeatherIcon(icon)}
      style={{
        width: 200,
        height: 200,
        // UPDATE: Adaptive Icon Color!``
        tintColor: getIconColor(icon)
      }}
      resizeMode="contain"
    />
  </View>
);
