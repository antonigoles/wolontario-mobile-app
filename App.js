import { StyleSheet, Alert, SafeAreaView, View } from 'react-native';
import StyleStatics from './src/StyleStatics';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/views/LoginScreen/LoginScreen';
import HomeScreen from './src/views/HomeScreen/HomeScreen';
import RegisterScreen from './src/views/RegisterScreen/RegisterScreen';
import BrowseImages from './src/views/Modals/BrowseImages';

import { useFonts, Poppins_400Regular, Poppins_600SemiBold, 
	Poppins_500Medium, Poppins_700Bold, Poppins_300Light } from '@expo-google-fonts/poppins';
import { useEffect, useState } from 'react';
import GLOBAL from './src/helpers/global';
import { communicationBus } from './src/helpers/comBus';

const Stack = createNativeStackNavigator()

export default function App() {
	

	const [ comBus, setComBus ] = useState( new communicationBus() )
	const [ popUpContent, setPopUpContent ] = useState();

	GLOBAL.comBus = comBus

	const [ fontsLoaded ] = useFonts({
		'Poppins-Light': Poppins_300Light,
		'Poppins': Poppins_400Regular,
		'Poppins-Medium': Poppins_500Medium,
		'Poppins-SemiBold': Poppins_600SemiBold,
		'Poppins-Bold': Poppins_700Bold,
	})	
	
	if (!fontsLoaded) {
		return null;
	}
	
	return (
		<NavigationContainer style={ styles.container } >
			<Stack.Navigator initialRouteName="Login">
				<Stack.Group screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Register" component={RegisterScreen} />
				</Stack.Group>
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
