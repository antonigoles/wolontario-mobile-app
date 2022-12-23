import {  useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import AnimatedTab from '../AnimatedTab';
import WImage from '../../../../components/WImage';
import StyleStatics from '../../../../StyleStatics';
import APICONFIG from '../../../../api/config.js'
import WDrawer from '../../../../components/WDrawer'
import { ScrollView } from 'react-native';
import WLoadingAnimation from '../../../../components/WLoadingAnimation'
import session from '../../../../helpers/session';
import users from '../../../../api/users'

const styles = StyleSheet.create({
    profileHeader: {
        width: "100%",
        height: 180,
        backgroundColor: StyleStatics.white,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 300,
        marginLeft: 25,
    },

    namebox: {
        width: 200,
        marginRight: 25,
    },

    name: {
        fontFamily: 'Poppins-Bold',
        textAlign: "right",
        fontSize: 28,
        fontWeight: 'bold',
        color: StyleStatics.darkText,
    },

    lastname: {
        fontFamily: 'Poppins-Light',
        textAlign: "right",
        fontSize: 28,
        fontWeight: 'light',
        color: StyleStatics.darkText,
    },

    aboutmeDrawer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: StyleStatics.white,
    },

    aboutme: {
        width: 330,
        padding: 15,
        backgroundColor: StyleStatics.inputBlock, 
        borderRadius: 10,
        marginBottom: 20,
        fontFamily: 'Poppins-Medium',
        color: StyleStatics.darkText,
        opacity: 0.80,
        margin: 20,
        fontSize: 14,
        flex: 1,
        flexWrap: 'wrap',
    }

})

export default function ProfileTab({navigation, userid}) {

    const [ userData, setUserData ] = useState({
        name: "Arthur",
        surname: "Dorrance",
        avatarUrl: `${APICONFIG.API_URL}/user/avatar/639c5c3084e98a011c24e8c6`,
        aboutme: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ligula vitae lorem lacinia blandit. Nullam sed molestie nisl, eu semper magna. Vivamus risus enim, pellentesque a consectetur iaculis, viverra vitae erat. Nullam ut mi mattis, bibendum  "
    })

    useEffect(() => {
        const loadUser = async () => {
            let id=userid;
            if ( !userid ) id = (await session.get()).data.id      
            const result = await users.fetchProfile( id )
            result['avatarUrl'] = `${APICONFIG.API_URL}/user/avatar/${id}`
            setUserData(result)
        };
        loadUser();
        
    },[userid])


    return (
        <AnimatedTab navigation={navigation}>
            { userData ? 
            <ScrollView>
                <View  style={styles.profileHeader}>
                    <WImage externalStyle={styles.avatar} url={userData.avatarUrl} />
                    <View style={styles.namebox}>
                        <Text style={styles.name}>{userData.name}</Text>
                        <Text style={styles.lastname}>{userData.surname}</Text>
                    </View>
                </View>
                <WDrawer  maxHeight={210} externalStyle={styles.aboutmeDrawer} label="O mnie" >
                    <Text style={styles.aboutme}>{userData.aboutme}</Text>
                </WDrawer>
                <WDrawer externalStyle={styles.aboutmeDrawer} label="Języki" >
                    {/* <Text style={styles.aboutme}>{userData.aboutme}</Text> */}
                </WDrawer>
                <WDrawer externalStyle={styles.aboutmeDrawer} label="Umiejętności" >
                    {/* <Text style={styles.aboutme}>{userData.aboutme}</Text> */}
                </WDrawer>
            </ScrollView>
            : <WLoadingAnimation />}
        </AnimatedTab>
    )
}