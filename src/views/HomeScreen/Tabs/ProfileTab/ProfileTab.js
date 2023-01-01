import {  useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Modal } from 'react-native'
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
import GaleryIcon from '../../../../../assets/icons/galery.svg'
import * as ImagePicker from 'expo-image-picker';
import global from '../../../../helpers/global';
import BrowseImages from '../../../Modals/BrowseImages';



export default function ProfileTab({navigation, userid}) {

    const [ isOwner, setIsOwner ] = useState( !userid )
    const [ browseImagesVisibility, setBrowseImagesVisibility] = useState( false );
    const [ browseImagesResult, setBrowseImagesResult ] = useState( null );

    const [statusCamera, requestPermissionCamera ] = ImagePicker.useCameraPermissions();
    const [statusLibrary, requestPermissionLibrary ] = ImagePicker.useMediaLibraryPermissions();

    const [ aboutMe, setAboutMe ] = useState("")
    const [ submitTimeout, setSubmitTimeout ] = useState(null)

    const lineCount = () => {
        str.split(/\r\n|\r|\n/).map()
    }

    const [ userData, setUserData ] = useState({
        name: "...",
        surname: "...",
        avatarUrl: `../../../../../assets/emptyAvatar.webp`,
        aboutme: ""
    })
    const [ avatarUrl, setAvatarUrl ] = useState("../../../../../assets/empty.jpg")

    const [ userSkills, setUserSkills ] = useState(null) 
    const [ userLanguages, setUserLanguages ] = useState(null) 

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
    
        changeAvatar: {
            width: 120,
            paddingTop: 10,
            padding: 5,
            marginLeft: 25,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            
        },
    
        changeAvatarText: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 12,
            color: StyleStatics.primary,
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
            width: "100%",
            maxWidth: "100%",
            flxe: 1,
            flexWrap: 'nowrap',
        }, 
    
        listTitleLang: {
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
            fontSize: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: "80%",
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
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: 16,
            paddingLeft: 10,
            paddingRight: 10,
            height: 80,
            alignItems: 'flex-start',
        },
    
        listHeaderLang: {
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
            paddingTop: 15,
            textAlign: 'left',
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.lightText,
            borderTopColor: StyleStatics.darkText,
            borderTopWidth: 0.2,
        },
    
        editStats: {
            fontFamily: 'Poppins',
            color: StyleStatics.primary,
            fontWeight: 'bold',
            fontSize: 12,
            marginBottom: 5,
            textAlign: 'center',
        },
    })

    useEffect(() => {
        const reloadUser = async () => {
            let id=userid;
            if ( !userid ) {
                id = (await session.get()).data.id 
            }  
            const result = await users.fetchProfile( id )
            result['avatarUrl'] = `${APICONFIG.API_URL}/user/avatar/${id}?r=${Math.ceil(999*Math.random())}`
            // result['languages'] = result['languages'] ? result['languages'] : []
            // result['languages'] = [ { code: 'pl', level: 'NATIVE'}, { code: 'en', level: 'B1' }, { code: 'fr', level: 'A2' }]
            if ( result['aboutme'] != aboutMe ) 
                setAboutMe( result['aboutme'] )
            if ( result['name'] != userData['name'] || 
            result['surname'] != userData['surname'] || 
            result['avatarUrl'] != userData['avatarUrl']) {
                setUserData(result)
            }   

            setAvatarUrl( result['avatarUrl'] )
            if ( JSON.stringify(result['languages']) != JSON.stringify(userLanguages) )
                setUserLanguages(result['languages'])
            if ( JSON.stringify(result['skills']) != JSON.stringify(userSkills) )
                setUserSkills(result['skills'])
            
            navigation.setParams({ headerTitleOverwrite: isOwner ? "Mój profil" : `${result['name']} ${result['surname']}` })
        };
        const unsubscribe = navigation.addListener('focus', () => {
            reloadUser();
        })
        return unsubscribe;
    },[navigation])

    const updateAboutMe = async ( data ) => {
        try {
            const result = await users.updateAboutMe( data )
        } catch( err ) {
            // alert(err.originalError)
        }
    }

    const changeAvatarWithCamera = async ( ) => {
        try { 
            if ( !statusCamera ) await requestPermissionCamera()
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            })
            await users.uploadAvatar( result )
        } catch ( err ) {
            // alert(err)
        }
        
    }

    const changeAvatarWithLibrary = async ( ) => {
        try {
            if ( !statusLibrary ) await requestPermissionLibrary()
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            })
            await users.uploadAvatar( result )
        } catch ( err ) {
            throw err;
        }
        
    }

    const changeAvatar = async () => {
        try {
            setBrowseImagesVisibility(true)
        } catch(err) {
            throw err;
        }   
    }

    useEffect(() => {
        if ( browseImagesResult != null ) {
            setTimeout( () => {
                if ( browseImagesResult == 'camera' ) {
                    changeAvatarWithCamera();
                } else {
                    changeAvatarWithLibrary();
                }
            }, 1000)
            setBrowseImagesResult(null);
        }
    }, [browseImagesResult])

    

    return (
        <AnimatedTab navigation={navigation}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={browseImagesVisibility}
            >
                <BrowseImages setOutput={setBrowseImagesResult} onHide={() => setBrowseImagesVisibility(false)}/>
            </Modal>
            { userData ?
            <View style={{height: "100%"}}>
                
                <ScrollView>
                    <View  style={styles.profileHeader}>
                        <Pressable onPress={ isOwner ? changeAvatar : null }>
                            <WImage externalStyle={styles.avatar} url={avatarUrl} />
                            { isOwner ?
                            <View style={styles.changeAvatar}>  
                                <GaleryIcon 
                                    width={20} 
                                    height={20} 
                                    fill={StyleStatics.primary}
                                    preserveAspectRatio={"xMinYMin slice"}
                                    viewBox={"0 0 50 50"}
                                /> 
                                <Text style={styles.changeAvatarText}> Zmień zdjęcie </Text>
                            </View>
                            : ''}
                        </Pressable>
                        <View style={styles.namebox}>
                            <Text style={styles.name}>{userData.name}</Text>
                            <Text style={styles.lastname}>{userData.surname}</Text>
                            <Text style={styles.since}> Na Wolontario już{'\n'} 
                                <Text style={{ fontWeight: 'bold', }}>{ time.prettyTimespan( userData['createdAt'] ) }</Text>  
                            </Text>
                        </View>
                    </View> 
                    { userData.isGlobalAdmin ?
                        <View style={{
                            width: "100%",
                            height: 40,
                            backgroundColor: StyleStatics.primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                fontFamily: 'Poppins-Bold',
                                color: StyleStatics.white, 
                            }}> 
                                Pracownik Wolontario
                            </Text>
                        </View> 
                    : ''}
                    <WDrawer maxHeight={220} externalStyle={styles.aboutmeDrawer} label="O mnie" >
                        <TextInput 
                            editable={ isOwner }
                            multiline={true} 
                            maxHeight={160} 
                            caretHidden={false}
                            numberOfLines={10}
                            style={ {
                                ...styles.aboutme, 
                                ...{ color: isOwner ? StyleStatics.lightText : 'black' } 
                            }}
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

                            underlineColor={isOwner ? StyleStatics.primary : 'transparent'}
                            // outlineColor='transparent'
                            activeUnderlineColor={isOwner ? StyleStatics.primary : 'transparent'}
                            cursorColor={isOwner ? StyleStatics.primary : 'transparent'}
                            value={aboutMe}
                        />
                        { isOwner ? <View style={{
                            width: "80%",
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}> 
                            <Text style={styles.editStats}>{aboutMe.length} / 255 Znaków</Text> 
                            {/* <Text style={styles.editStats}>{aboutMeLinesCount-6} / 6 Linijek</Text> */}
                        </View>
                        : ''}
                    </WDrawer>
                    <WDrawer 
                        onEdit={ () => navigation.navigate("Langs") }
                        editable={ isOwner } 
                        maxHeight={ userLanguages ? Math.max(userLanguages.length, 1) * 100 : 160  } 
                        externalStyle={styles.aboutmeDrawer} 
                        label="Języki" >
                        { (userLanguages && userLanguages.length > 0) ? userLanguages.map( (el,idx) => 
                            <View key={idx} style={styles.listElement}>
                                <View style={styles.listHeaderLang}>
                                    <View style={styles.listTitleLang}> 
                                        {/* <CountryFlag style={styles.listTitleFlag} isoCode={ language.langToFlagCode(el.code) } size={32} /> */}
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
                        }
                    </WDrawer>
                    <WDrawer 
                        onEdit={ () => navigation.navigate("Skills") } 
                        editable={ isOwner } 
                        maxHeight={ userSkills ? Math.max(userSkills.length, 1) * 400 : 100 } 
                        externalStyle={styles.aboutmeDrawer} 
                        label="Umiejętności" >
                        { (userSkills && userSkills.length > 0 )? userSkills.map( (el,idx) => 
                            <View key={idx} style={styles.listElement}>
                                <View style={styles.listHeader}>
                                    <Text numberOfLines={1} style={styles.listTitle}> {el.name} </Text>
                                    <Text style={styles.listSubtitle}> {el.level} </Text>
                                </View>
                                { el.description.length > 0 ? 
                                    <Text style={styles.listDescription}> {el.description} </Text> 
                                : ''}
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
                        }
                    </WDrawer>
                </ScrollView>
            </View>
            : <WLoadingAnimation />}
        </AnimatedTab>
    )
}