import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Splash from "./components/Splash";
import Login from "./components/Login";
import Capture from "./components/Capture";
import Register from "./components/Register";
import Feed from "./components/Feed";
import FeedDetail from "./components/FeedDetail";
import Admin from "./components/Admin";
import Post from "./components/Post";
import { TouchableOpacity, Image } from "react-native";

const MainNavigator = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null,
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
        headerTruncatedBackTitle: 'Logout',
      }
    },
    Capture: {
      screen: Capture,
      navigationOptions: {
        header: null,
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: null,
      }
    },
    Feed: {
      screen: Feed,
      navigationOptions: {
        headerTitle: (
          <Image source={require('./assets/react-native-logo.png')} style={{ width: 30, height: 30 }}/>
        ),
        headerRight: (
          <TouchableOpacity activeOpacity={0.5}>
            <Image source={require('./assets/hamburger.png')} style={{ width: 25, height: 25, marginRight: 5 }} />
          </TouchableOpacity>
        )
      }
    },
    FeedDetail: {
      screen: FeedDetail,
      navigationOptions: {
        header: null,
      }
    },
    Admin: {
      screen: Admin,
      navigationOptions: ({ navigate, navigation }) => ({
        title: 'DashBoard',
        headerRight: (
          <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.navigate("Post") }}>
            <Image
              source={require('./assets/plus.png')}
              style={{ width: 30, height: 30, marginRight: 10 }}
            />
          </TouchableOpacity>
        ),
      })
    },
    Post: {
      screen: Post,
      navigationOptions: {
        title: 'New Post',
        headerRight: (
          <TouchableOpacity activeOpacity={0.5}>
            <Image
              source={require('./assets/hamburger.png')}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        ),
      }
    },
  }, {
    defaultNavigationOptions: {
      gesturesEnabled: false,
      swipeEnabled: false,
      // cardStack: {
      //   gesturesEnabled: false,
      //   swipeEnabled: false,
      // }
    }
  }, {
    mode: 'modal',
    //headerMode: null,
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default function App(){
  return(
    <AppContainer />
  )
}
