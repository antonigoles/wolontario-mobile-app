import { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, SafeAreaView   } from 'react-native';
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
import GroupRequests from './Tabs/GroupTab/GroupRequests';
import GroupRequestsAdmin from './Tabs/GroupTab/GroupRequestsAdmin';
import OptionsTab from './Tabs/OptionsTab/OptionsTab';
import session from '../../helpers/session';
import GroupRequestForm from './Tabs/GroupTab/GroupRequests/RequestForm'
import GroupOptions from './Tabs/GroupTab/GroupOptions/GroupOptions';
import FadeIn from '../../animations/FadeIn'
import GroupAnnouncements from './Tabs/GroupTab/GroupOptions/GroupAnnouncements/GroupAnnouncements';
import WAlert from '../../components/WAlert';

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
	"LangEdit": "Edytuj lub Dodaj",
	"Options": "Menu",
	"GroupRequests": "Prośby o utworzenie wolontariatu",
	"GroupRequestForm": "Wyślij prośbę o utworzenie wolontariatu",
	"GroupOptions": "Wolontariat",
	"GroupAnnouncements": "Komunikaty",
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
	const [ isGlobalAdmin, setIsGlobalAdmin ] = useState(null);

	global.mainNavigation = navigation;

	global.popUp = (title, content) => {
		global.popups["HomeScreenAlert"].runPopup(title, content)
	}

	global.raportError = (error) => {
		global.popups["HomeScreenAlert"].runPopup("O nie!", 
			`Wystąpił nieoczekiwany błąd! Zostanie on zgłoszony do nas i 
			zostanie naprawiony jak najszybciej! Spróbuj ponownie później. Treść błędu: ${error}`)
	}

	useEffect(()=>{
		// WE DONT'T WANT TO QUIT THIS
		navigation.addListener('beforeRemove', (e) => {
			e.preventDefault();
		})
	}, [navigation])

	useEffect( () => {
		const loadSessionData = async () => {
			try {
				const sessionData = await (session.get());
				setIsGlobalAdmin( Boolean(sessionData.data.isGlobalAdmin) );
			} catch(err) {
				alert(err)
			}
			
		}
		loadSessionData()
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

	const hideOnTab = {
		tabBarButton: () => null,
	}

	const refreshOnEnter = {
		unmountOnBlur: true,
	}

	const componentBuilder = ( Comp, additionalParams={} ) => {
		return props => 
			<FadeIn navigation={props.navigation}> 
				<Comp {...props} { ...additionalParams } /> 
			</FadeIn> 
	}

	return (
		<SafeAreaView style={{ width: "100%", height: "100%"}}>
			<WAlert id={"HomeScreenAlert"} />
			<NavigationContainer theme={MainTheme} independent={true}>
				<Tab.Navigator backBehavior="history"  {  ...bottomNavigatorConfigs } >
					<Tab.Screen name="Home">
						{ componentBuilder( HomeTab, { setNav: setNav }) }
					</Tab.Screen>
					<Tab.Screen name="Group" component={ componentBuilder(GroupTab) }  />
					<Tab.Screen name="Notifications" component={ componentBuilder(NotificationTab) }  />
					<Tab.Screen name="Profile" component={ componentBuilder(ProfileTab) }  />
					<Tab.Screen name="Skills" component={ componentBuilder(Skills) } options={{...hiddenTabOptions, ...refreshOnEnter}} />
					<Tab.Screen name="SkillEdit" component={ componentBuilder(SkillEdit) } options={{...hiddenTabOptions }} />
					<Tab.Screen name="Langs" component={ componentBuilder(Langs) } options={{...hiddenTabOptions, ...refreshOnEnter }} />
					<Tab.Screen name="LangEdit" component={ componentBuilder(LangEdit) } options={{...hiddenTabOptions }} />
					<Tab.Screen name="WChoiceList" component={ componentBuilder(WChoiceList) } options={{...hiddenTabOptions, ...refreshOnEnter}} />
					<Tab.Screen name="Options" component={ componentBuilder(OptionsTab) } options={{...hiddenTabOptions}} />
					<Tab.Screen 
						name="GroupRequests" 
						component={ isGlobalAdmin ? componentBuilder( GroupRequestsAdmin ) : GroupRequests } 
						options={{...hiddenTabOptions, ...refreshOnEnter}} 
					/>
					<Tab.Screen name="GroupRequestForm" component={componentBuilder(GroupRequestForm)} options={{...hiddenTabOptions, ...refreshOnEnter}} />
					<Tab.Screen name="GroupOptions" component={componentBuilder(GroupOptions)} options={{ ...hiddenTabOptions }} />
					<Tab.Screen name="GroupAnnouncements" component={componentBuilder(GroupAnnouncements)} options={{ ...hiddenTabOptions }} />
				</Tab.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}


const styles = StyleSheet.create({

})