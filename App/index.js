import React from "react";
import { Image, StatusBar, TouchableOpacity } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Details from "./screens/Details";
import Search from "./screens/Search";

// 1. Switch between deree units - DONE
// 2. Clear Recent Searche Option - DONE
// 3. Change icon color, depending on the weather - DONE

const HeaderRightButton = ({ onPress, style, icon }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={icon}
      resizeMode="contain"
      style={[
        {
          marginRight: 10,
          width: 20,
          height: 20,
          tintColor: "#fff"
        },
        style
      ]}
    />
  </TouchableOpacity>
);

const AppStack = createStackNavigator(
  {
    Details: {
      screen: Details,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam("title", ""),
        headerRight: (
          <React.Fragment>
            <StatusBar barStyle="light-content" />
            <HeaderRightButton
              icon={require("./assets/search.png")}
              onPress={() => navigation.navigate("Search")}
            />
          </React.Fragment>
        ),

        headerStyle: {
          backgroundColor: "#3145b7",
          borderBottomColor: "#3145b7"
        },
        headerTintColor: "#fff"
      })
    },
    Search: {
      screen: Search,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Search",
        headerRight: (
          <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <HeaderRightButton
              icon={require("./assets/close.png")}
              onPress={() => navigation.pop()}
              style={{ tintColor: "#000" }}
            />
          </React.Fragment>
        ),
        headerLeft: null
      })
    }
  },
  {
    mode: "modal",
    initalRouteName: "Search"
  }
);

export default createAppContainer(AppStack);
