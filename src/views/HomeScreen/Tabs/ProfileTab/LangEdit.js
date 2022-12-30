import { View, StyleSheet, Text, ScrollView, Pressable, Alert } from 'react-native'
import { useState, useEffect } from 'react';
import users from '../../../../api/users';
import StyleStatics from '../../../../StyleStatics';
import CountryFlag from "react-native-country-flag";
import language from '../../../../helpers/language';
import WCheckbox from '../../../../components/WCheckbox';
import global from '../../../../helpers/global';
import { comBusMessage } from '../../../../helpers/comBus'

export default function LangEdit({ navigation, route }) {
    const [ langCode, setLangCode ] = useState(0)
    const [ level, setLevel ] = useState(0)
    const [ langIndex, setLangIndex ] = useState(0)

    const allCodes = language.getAllCodes()
    const styles = StyleSheet.create({
        view: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            flexDirection: 'column',
        },
        spacer: {
            marginTop: 10,
        },
        bottomButton: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
            color: StyleStatics.primary,
        },
        bottomContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: "80%",
            height: '10%',
        },
        langPick:{
            width: "85%",
            height: 70,
            borderRadius: 10,
            backgroundColor: StyleStatics.inputBlock,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: 16,
        },
        langName: {
            fontFamily: "Poppins-SemiBold",
            fontSize: 20,
            color: StyleStatics.darkText,
            textAlign: 'center',
            width: "70%",
        },
        list: {
            width: "100%",
            display: 'flex',
            height: '70%',
        },
        listElement: {
            padding: 10,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            textAlign: 'center',
        },
        listElementSelected: {
            backgroundColor: StyleStatics.darkText,
            color: StyleStatics.white,
        }
    })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', (e) => {
            // alert(JSON.stringify(e))
            // const rt = navigation.getState().routes.find( e => e.name == "LangEdit" )
            // setLangCode( oldLangCode => oldLangCode ? oldLangCode : rt.params.langCode )
            // setLevel( oldLevel => oldLevel ? oldLevel : rt.params.level )
            const msgFromWChoiceList = global.comBus.receiveMessages("LangEdit", "WChoiceList")
            if ( msgFromWChoiceList ) {
                setLangCode( msgFromWChoiceList.content.choice )
            }

            const msgFromLangs = global.comBus.receiveMessages("LangEdit", "Langs")
            if ( msgFromLangs ) {
                setLangCode( msgFromLangs.content.code )
                setLevel( msgFromLangs.content.level )
                setLangIndex( msgFromLangs.content.langIndex )
            }
        })
        return unsubscribe
    }, [navigation])


    const deleteLang = async () => {
        if ( route.params.langs.length <= langIndex ) {
            return navigation.goBack()
        };
        try {
            await users.deleteLang( langIndex, route.params.langs )
            setLangCode(0)
            setLevel(0)
            return navigation.goBack()
        } catch ( err ) {
            alert(err)
        }
    }

    const saveLang = async () => {
        try {
            if ( route.params.langs.length <= langIndex  ) {
                await users.addLang( {
                    code: allCodes[langCode].toUpperCase(),
                    level: language.acceptedLevels[level].code
                }, route.params.langs )
            } else {
                await users.updateLang( langIndex, {
                    code: allCodes[langCode].toUpperCase(),
                    level: language.acceptedLevels[level].code
                }, route.params.langs )
            }
            setLangCode(0)
            setLevel(0)
            return navigation.goBack()
        } catch ( err ) {
            alert(err)
        }
    }

    return (
        <View style={styles.view}>
            <Pressable 
                style={ { ...styles.langPick, ...styles.spacer } }
                onPress={ () => {
                    navigation.navigate('WChoiceList', {
                        data: allCodes.map( e => `${language.codeToFull( e )}`  ),
                        useComBus: true,
                        initialSelected: langCode,
                        previousRoute: route.name,
                        previousState: navigation.getState()
                    })
                }}
            >
                <CountryFlag isoCode={ "" } size={28} />
                <Text style={ styles.langName }> { language.codeToFull( allCodes[langCode] ) } </Text>
            </Pressable>
            <View style={styles.list}> 
                {
                    language.acceptedLevels.map( (el,idx) => {
                        return (
                            <Text 
                                key={idx} 
                                style={[
                                    styles.listElement, 
                                    idx == level ? styles.listElementSelected : {}
                                ]}
                                onPress={ () => setLevel( idx ) }
                            >
                                {el.full} ({el.code})
                            </Text>
                        )
                    })
                }
            </View>
            <View style={styles.bottomContainer}>
                <Pressable onPress={
                    () => { 
                        Alert.alert("Potwierdź decyzje", "Na pewno chcesz usunąć?", [
                            { text: "Anuluj", onPress: null, style: 'cancel' },
                            { text: "Usuń", onPress: () => deleteLang()  }
                        ])
                    }
                }>
                    <Text style={styles.bottomButton}>Usuń</Text>
                </Pressable> 
                <Pressable onPress={
                    () => { saveLang() }
                }>
                    <Text style={styles.bottomButton}>Zapisz</Text>
                </Pressable> 
            </View>
        </View>
    )
}