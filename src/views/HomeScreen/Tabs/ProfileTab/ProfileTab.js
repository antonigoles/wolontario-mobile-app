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
import language from "../../../../helpers/language"
import CountryFlag from "react-native-country-flag";
import time from "../../../../helpers/time.js"
import WButton from '../../../../components/WButton';
import WTextInput from '../../../../components/WTextInput';
import { TextInput } from 'react-native-paper';

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

    since: {
        fontFamily: 'Poppins',
        textAlign: "right",
        fontSize: 12,
        fontWeight: 'light',
        color: StyleStatics.primary,
        marginTop: -5,
    },

    aboutmeDrawer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: StyleStatics.white,
        width: "100%",
    },

    aboutme: {
        width: "90%",
        padding: 2,
        backgroundColor: StyleStatics.inputBlock, 
        borderRadius: 10,
        marginBottom: 10,
        fontFamily: 'Poppins-Medium',
        color: StyleStatics.darkText,
        opacity: 0.80,
        // margin: 20,
        fontSize: 14,
        // flex: 1,
        // flexWrap: 'wrap',
        textAlign: "center",
    },

    listElement: {
        backgroundColor: StyleStatics.inputBlock,
        width: "90%",
        marginTop: 15,
        borderRadius: 10,
    },

    listTitle: {
        fontFamily: 'Poppins-SemiBold',
        color: StyleStatics.darkText,
        fontSize: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: "80%",
        flxe: 1,
        flexWrap: 'nowrap',
    }, 

    listTitleText: {
        fontFamily: 'Poppins-SemiBold',
        color: StyleStatics.darkText,
        fontSize: 16,
        marginLeft: 15,
    },
    
    listSubtitle: {
        fontFamily: 'Poppins-SemiBold',
        color: StyleStatics.lightText,
        fontSize: 13,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },

    listHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        height: 80,
        alignItems: 'center',
    },

    listDescription: {
        marginTop: -10,
        fontSize: 12,
        padding: 14,
        paddingTop: 0,
        textAlign: 'left',
        fontFamily: 'Poppins-Medium',
        color: StyleStatics.lightText,
    },

    editStats: {
        fontFamily: 'Poppins',
        color: StyleStatics.primary,
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'center',
    }

})

export default function ProfileTab({navigation, userid}) {

    const [ isOwner, setIsOwner ] = useState( !userid )

    const [ aboutMe, setAboutMe ] = useState("")
    const [ submitTimeout, setSubmitTimeout ] = useState(null)

    const lineCount = () => {
        str.split(/\r\n|\r|\n/).map()
    }

    const [ userData, setUserData ] = useState({
        name: "Arthur",
        surname: "Dorrance",
        avatarUrl: `${APICONFIG.API_URL}/user/avatar/639c5c3084e98a011c24e8c6`,
        aboutme: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ligula vitae lorem lacinia blandit. Nullam sed molestie nisl, eu semper magna. Vivamus risus enim, pellentesque a consectetur iaculis, viverra vitae erat. Nullam ut mi mattis, bibendum  "
    })

    useEffect(() => {
        const loadUser = async () => {
            let id=userid;
            if ( !userid ) {
                id = (await session.get()).data.id 
            }  
            const result = await users.fetchProfile( id )
            result['avatarUrl'] = `${APICONFIG.API_URL}/user/avatar/${id}`
            result['languages'] = result['languages'] ? result['languages'] : []
            // result['languages'] = [ { code: 'pl', level: 'NATIVE'}, { code: 'en', level: 'B1' }, { code: 'fr', level: 'A2' }]
            setAboutMe( result['aboutme'] )
            setUserData(result)
        };
        loadUser();
        
    },[userid])

    const updateAboutMe = async ( data ) => {
        try {
            const result = await users.updateAboutMe( data )
        } catch( err ) {
            // alert(err.originalError)
        }
    }


    return (
        <AnimatedTab navigation={navigation}>
            { userData ?
            <View style={{height: "100%"}}>
                
                <ScrollView>
                    <View  style={styles.profileHeader}>
                        <WImage externalStyle={styles.avatar} url={userData.avatarUrl} />
                        <View style={styles.namebox}>
                            <Text style={styles.name}>{userData.name}</Text>
                            <Text style={styles.lastname}>{userData.surname}</Text>
                            <Text style={styles.since}> Na Wolontario już{'\n'} 
                                <Text style={{ fontWeight: 'bold', }}>{ time.prettyTimespan( userData['createdAt'] ) }</Text>  
                            </Text>
                        </View>
                    </View> 
                    <WDrawer maxHeight={220} externalStyle={styles.aboutmeDrawer} label="O mnie" >
                        <TextInput 
                            editable={ isOwner }
                            multiline={true} 
                            maxHeight={160} 
                            caretHidden={false}
                            numberOfLines={10}
                            style={styles.aboutme}
                            maxLength={255}
                            onChangeText={ (data) => { 
                                setAboutMe(data);
                                if ( submitTimeout ) clearTimeout( submitTimeout )
                                setSubmitTimeout(
                                    setTimeout( () => {
                                        updateAboutMe( data )
                                    }, 2000)
                                )

                            }}

                            underlineColor={StyleStatics.primary}
                            // outlineColor='transparent'
                            activeUnderlineColor={StyleStatics.primary}
                            cursorColor={StyleStatics.primary}
                            value={aboutMe}
                        />
                        <View style={{
                            width: "80%",
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}> 
                            <Text style={styles.editStats}>{aboutMe.length} / 255 Znaków</Text> 
                            {/* <Text style={styles.editStats}>{aboutMeLinesCount-6} / 6 Linijek</Text> */}
                        </View>
                    </WDrawer>
                    <WDrawer editable={ isOwner } maxHeight={ userData.languages ? Math.max(userData.languages.length, 1) * 100 : 160  } externalStyle={styles.aboutmeDrawer} label="Języki" >
                        { userData.languages ? userData.languages.length > 0 ? userData.languages.map( (el,idx) => 
                            <View key={idx} style={styles.listElement}>
                                <View style={styles.listHeader}>
                                    <View style={styles.listTitle}> 
                                        <CountryFlag style={styles.listTitleFlag} isoCode={ language.normalizeCodeForFlag(el.code) } size={32} />
                                        <Text style={styles.listTitleText}>{ language.codeToFull( el.code ) } </Text>
                                    </View>
                                    <Text style={styles.listSubtitle}> {el.level} </Text>
                                </View>
                            </View>
                        ) : 
                        <Text style={{
                            color: StyleStatics.darkText,
                            fontFamily: 'Poppins',
                            textAlign: 'center',
                            fontSize: 16,
                            marginTop: 10,
                        }}>
                            Nie ma tutaj jeszcze nic... { '\n' }
                            <Text 
                            style={{
                                color: StyleStatics.primary,
                                fontFamily: 'Poppins-Bold',
                                textAlign: 'center',
                                fontSize: 16,
                            }}
                            onPress={ () => navigation.navigate("Skills") }>
                                Zmień to!
                            </Text>
                        </Text>  
                        : ''}
                    </WDrawer>
                    <WDrawer 
                        onEdit={ () => navigation.navigate("Skills") } 
                        editable={ isOwner } 
                        maxHeight={ userData.skills ? Math.max(userData.skills.length, 1) * 200 : 100 } 
                        externalStyle={styles.aboutmeDrawer} 
                        label="Umiejętności" >
                        { userData.skills ? userData.skills.length > 0 ? userData.skills.map( (el,idx) => 
                            <View key={idx} style={styles.listElement}>
                                <View style={styles.listHeader}>
                                    <Text numberOfLines={1} style={styles.listTitle}> {el.name} </Text>
                                    <Text style={styles.listSubtitle}> "{el.level}" </Text>
                                </View>
                                { el.description.length > 0 ? 
                                    <Text style={styles.listDescription}> {el.description} </Text> 
                                : ''}
                            </View>
                        ) : 
                        <Text>
                            Nie ma tutaj jeszcze nic...
                            <Text onPress={ () => navigation.navigate("Skills") }>Zmień to!</Text>
                        </Text> 
                        :''}
                    </WDrawer>
                </ScrollView>
            </View>
            : <WLoadingAnimation />}
        </AnimatedTab>
    )
}