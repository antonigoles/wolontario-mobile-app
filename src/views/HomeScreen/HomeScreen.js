import { useEffect } from 'react';
import { View, Text } from 'react-native';


export default function HomeScreen({ navigation }) {
// load data, if session is dead, navigate to login screen
useEffect(() => {
	navigation.navigate('Login')
})

return (
	<View>
	<Text> Home screen sb działa :D </Text>
	</View>
);
}