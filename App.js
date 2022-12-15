import { StyleSheet } from 'react-native';
import StyleStatics from './src/StyleStatics';
import style from './app.module.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/views/LoginScreen/LoginScreen';
import HomeScreen from './src/views/HomeScreen/HomeScreen';
import RegisterScreen from './src/views/RegisterScreen/RegisterScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer style={ {...style.view, ...styles.container} }>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleStatics.background,
  },
});
