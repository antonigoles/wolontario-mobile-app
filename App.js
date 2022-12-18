import { StyleSheet, Alert } from 'react-native';
import StyleStatics from './src/StyleStatics';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/views/LoginScreen/LoginScreen';
import HomeScreen from './src/views/HomeScreen/HomeScreen';
import RegisterScreen from './src/views/RegisterScreen/RegisterScreen';

import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator()

export default function App() {
	const [ fontsLoaded ] = useFonts({
		'Poppins': Poppins_400Regular,
		'Poppins-SemiBold': Poppins_600SemiBold,
		'Poppins-Medium': Poppins_600SemiBold,
	})	
	
	if (!fontsLoaded) {
		return null;
	}
	
	return (
		<NavigationContainer style={ styles.container } >
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
				<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		fontFamily: 'Poppins',
		backgroundColor: StyleStatics.background,
	},
});
