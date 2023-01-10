import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import WLoadingAnimation from '../../../../../components/WLoadingAnimation'
import WAlert from '../../../../../components/WAlert'
import global from '../../../../../helpers/global';
import session from '../../../../../helpers/session';
import group from '../../../../../api/group';
import StyleStatics from '../../../../../StyleStatics';
import InfoIcon from '../../../../../../assets/icons/info.svg'
import TimeLineIcon from '../../../../../../assets/icons/timeline.svg'
import PersonIcon from '../../../../../../assets/icons/person.svg'
import ComponentApear from '../../../../../animations/ComponentApear';
import Animated from 'react-native-reanimated';
import MegaphoneIcon from '../../../../../../assets/icons/megaphone.svg'

export default function GroupOptions({ navigation, route }) {
    const [ user, setUser ] = useState(null);
    const [ isUserAdmin, setIsUserAdmin ] = useState(false);
    // const [ group, setGroup ] = useState(null);

    // <Text>{ route.params.displayGroup }</Text>

    const popAlert = (title, content) => {
        global.popups["GroupOptionsAlert"].runPopup(title, content);
    }

    const loadData = async () => {
        try {
            const isAdmin = await group.fetchIsUserAdmin( route.params.displayGroup );
            setIsUserAdmin( isAdmin )
            // popAlert("Uwaga", `Użytkownik jest ${ isAdmin ? "Koordynatorem" : "Wolontariuszem" }`)
            const currentUser = await session.get();

            setUser( currentUser.data )

        } catch ( err ) {
            popAlert( "Błąd", err.error );
        }
    }

    useEffect(()=>{
        loadData();
    }, [])

    const styles = StyleSheet.create({
        view: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 25,
        },
        welcomeHeader: {
            margin: 15,
            width: "90%",
            display: 'flex',
            alignItems: 'center',
            backgroundColor: StyleStatics.primary,
            borderRadius: 16,
            padding: 40,
        },

        headerMessage: {
            fontFamily: 'Poppins-Bold',
            fontSize: 20,
            color: StyleStatics.white,
        },

        roleLabelAdmin: {
            marginTop: 5,
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
            backgroundColor: StyleStatics.white,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 12,
        },

        roleLabelNormal: {
            marginTop: 5,
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
            backgroundColor: StyleStatics.white,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 12,
        },

    })

    const navigateToGroupAnnouncements = () => {
        navigation.navigate('GroupAnnouncements', { 
            displayGroup: route.params.displayGroup, 
            isAdmin: isUserAdmin,
        }); 
    }

    const navigateToGroupAdverts = () => {
        navigation.navigate('GroupAdverts', { 
            displayGroup: route.params.displayGroup, 
        }); 
    }

    const navigateToTasks = () => {
        navigation.navigate('GroupTasks', {
            displayGroup: route.params.displayGroup, 
            isAdmin: isUserAdmin,
        })
    }

    return (
        <View style={{ width: "100%", height: "100%" }}>
            <WAlert id={"GroupOptionsAlert"} />
            { user ?  
            <ScrollView>
                <View style={styles.view}>
                    <View style={ styles.welcomeHeader }>
                        <Text style={ styles.headerMessage }> { user.name } {user.surname} </Text>
                        <Text style={ isUserAdmin ? styles.roleLabelAdmin : styles.roleLabelNormal  }> 
                            { isUserAdmin ? "Koordynator" : "Wolontariusz" } 
                        </Text>
                    </View>
                    <ButtonsSection label="Opcje" />
                    <OptionButton 
                        onClick={navigateToTasks}
                        label="Zadania" 
                        Icon={ TimeLineIcon }
                    />
                    <OptionButton 
                        onClick={navigateToGroupAnnouncements} 
                        label="Komunikaty" 
                        Icon={ InfoIcon }
                    />
                    <OptionButton label="Członkowie" Icon={ PersonIcon }/>
                { isUserAdmin &&
                    <>
                        <ButtonsSection label="Opcje koordynatora" />
                        <OptionButton onClick={navigateToGroupAdverts} label="Ogłoszenia" Icon={ MegaphoneIcon }/>
                    </>
                } 
                </View>
            </ScrollView>
            :
            <WLoadingAnimation />
            }
            
        </View>
    )
} 


function ButtonsSection({ label }) {
    const styles = StyleSheet.create({
        buttonsSection: {
            fontFamily: 'Poppins-Bold',

        },  

        buttonsSectionText: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            padding: 16,
        },
    })

    return (
        <View style={ styles.buttonsSection }>
            <Text style={ styles.buttonsSectionText }> {label} </Text>
        </View>
    )
}

function OptionButton({ label, Icon, onClick }) {
    const styles = StyleSheet.create({
        optionButton: {
            width: "90%",
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: StyleStatics.white,
            margin: 5,
            borderRadius: 24,
        },
        optionButtonFont: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            paddingVertical: 20,
            marginLeft: 5,
        },
        iconStyle: {
            marginLeft: 15,
        }
    })

    const iconOptions = {
        fill: StyleStatics.darkText,
        width: 30,
        height: 30,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }

    return (
        <Pressable onPress={onClick} style={ styles.optionButton }>
            { Icon && <Icon style={styles.iconStyle} {...iconOptions}/> }
            <Text style={ styles.optionButtonFont }> {label} </Text>
        </Pressable>
    )
}