import { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet  } from 'react-native';
import auth from '../../api/auth'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './Tabs/HomeTab/HomeTab';
import ProfileTab from './Tabs/ProfileTab/ProfileTab';
import NotificationTab from './Tabs/NotificationTab/NotificationTab';
import GroupTab from './Tabs/GroupTab/GroupTab';

import GroupIcon from '../../../assets/icons/group.svg'
import NotifyIcon from '../../../assets/icons/notif.svg'
import PersonIcon from '../../../assets/icons/person.svg'
import HomeIcon from '../../../assets/icons/home.svg'
import StyleStatics from '../../StyleStatics';
import TabHeader from './TabHeader';
import Skills from './Tabs/ProfileTab/Skills';
import SkillEdit from './Tabs/ProfileTab/SkillEdit';
import WChoiceList from '../../components/WChoiceList';
import Langs from './Tabs/ProfileTab/Langs';
import LangEdit from './Tabs/ProfileTab/LangEdit';
import global from '../../helpers/global';


const Tab = createBottomTabNavigator();

const screenNameTranslations = {
	"Home": "Główna",
	"Group": "Wolontariat",
	"Profile": "Mój profil",
	"Notifications": "Powiadomienia",
	"Skills": "Umiejętności",
	"SkillEdit": "Edytuj lub Dodaj",
	"WChoiceList": "Wybierz",
	"Langs": "Języki",
	"LangEdit": "Edytuj lub Dodaj"
}

const MainTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: StyleStatics.background,
	}
}

export default function HomeScreen({ navigation }) {
	// load data, if session is dead, navigate to login screen
	const [state, setState] = useState([]);
	const [ navigatorVisibility, setNavigatorVisibility ] = useState(true)
	const [ nav, setNav ] = useState(null);

	global.mainNavigation = navigation;

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

	
	const bottomNavigatorConfigs  = {
		initialRouteName:'Home',
		screenOptions: ({route}) => ({
			tabBarLabel: ({ focused, color }) => {
				const style = StyleSheet.create({
					tabBarLabelStyle: { 
						fontSize: 12,
						// textOverflow: 'nowrap',
						// fontWeight: focused ? "bold" : "normal",
						color: color,
						fontFamily: 'Poppins',
					}
				})
				return (<Text numberOfLines={1} style={style.tabBarLabelStyle}>
					{ screenNameTranslations[route.name] }
				</Text>)
			},
			tabBarIcon: ({ focused, color, size}) => {
				const iconOptions = {
					fill: focused ?  StyleStatics.primary : StyleStatics.lightText,
					width: 30,
					height: 30,
                    preserveAspectRatio: "xMinYMin slice", 
                    viewBox: "-2 -2 50 50",
				}
				const icons ={
					"Home": <HomeIcon  { ...iconOptions } />,
					"Group": <GroupIcon { ...iconOptions } />,
					"Profile": <PersonIcon { ...iconOptions } />,
					"Notifications": <NotifyIcon { ...iconOptions } />,
				} 
				return icons[ route.name ]
			},
			tabBarActiveTintColor: StyleStatics.primary,
			tabBarInactiveTintColor: StyleStatics.lightText,
			tabBarStyle: {
				height:90,
			},	
			tabBarItemStyle: {
				padding: 16,
			},
			headerTitle: ((props) => 
				<TabHeader 
				navigation={nav}
				homePage={route.name=="Home"} 
				title={
					route.params ? (route.params.headerTitleOverwrite ? route.params.headerTitleOverwrite : screenNameTranslations[route.name]) 
					: screenNameTranslations[route.name] } 
				/>
			),

			headerStyle: {
				height: 160,
				backgroundColor: StyleStatics.white,
			}
		}),		
	};

	const hiddenTabOptions = {
		tabBarButton: () => null,
		tabBarStyle: { display: "none" },
	}

	const refreshOnEnter = {
		unmountOnBlur: true,
	}


	return (
		<NavigationContainer theme={MainTheme} independent={true}>
			<Tab.Navigator backBehavior="history"  {  ...bottomNavigatorConfigs } >
				<Tab.Screen name="Home">
					{ props => <HomeTab {...props} setNav={setNav} />}	
				</Tab.Screen>
				<Tab.Screen name="Group" component={GroupTab}  />
				<Tab.Screen name="Notifications" component={NotificationTab}  />
				<Tab.Screen name="Profile" component={ProfileTab}  />
				<Tab.Screen name="Skills" component={Skills} options={{...hiddenTabOptions, ...refreshOnEnter}} />
				<Tab.Screen name="SkillEdit" component={SkillEdit} options={{...hiddenTabOptions }} />
				<Tab.Screen name="Langs" component={Langs} options={{...hiddenTabOptions, ...refreshOnEnter }} />
				<Tab.Screen name="LangEdit" component={LangEdit} options={{...hiddenTabOptions }} />
				<Tab.Screen name="WChoiceList" component={WChoiceList} options={{...hiddenTabOptions, ...refreshOnEnter}} />
			</Tab.Navigator>
    	</NavigationContainer>
	);
}


const styles = StyleSheet.create({

})