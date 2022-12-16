import { useEffect, useState } from 'react';
import { View, Text, Alert  } from 'react-native';
import auth from '../../api/auth'

export default function HomeScreen({ navigation }) {
	// load data, if session is dead, navigate to login screen
	const [state, setState] = useState([]);
	const [ navigatorVisibility, setNavigatorVisibility ] = useState(true);

	useEffect(()=>{
		// WE DONT'T WANT TO QUIT THIS
		navigation.addListener('beforeRemove', (e) => {
			e.preventDefault();
		})
	}, [navigation])

	useEffect(() => {
		auth.validateCurrentSession( (result) => {
			if ( !result ) navigation.navigate('Login')

		})
	}, [])

	const Tab = createBottomTabNavigator();

	return (
		<NavigationContainer>
			<Tab.Navigator>
				{/* <Tab.Screen name="Home" component={HomeScreen} /> */}
				{/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
			</Tab.Navigator>
    	</NavigationContainer>
	);
}