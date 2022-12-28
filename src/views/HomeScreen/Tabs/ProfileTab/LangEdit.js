import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import { useState, useEffect } from 'react';
import users from '../../../../api/users';
import StyleStatics from '../../../../StyleStatics';
import CountryFlag from "react-native-country-flag";
import language from '../../../../helpers/language';
import WCheckbox from '../../../../components/WCheckbox';

export default function LangEdit({ navigation }) {
    const [ langCode, setLangCode ] = useState(0)
    const [ level, setLevel ] = useState(0)

    const allCodes = language.getAllCodes()
    alert(allCodes[0])
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
        })
    }, [navigation])


    return (
        <View style={styles.view}>
            <Pressable 
                style={ { ...styles.langPick, ...styles.spacer } }
                onPress={ () => {
                    navigation.navigate('WChoiceList', {
                        data: skillLevels.SKILL_LEVELS,
                        initialSelected: skillLevel,
                        previousRoute: route.name,
                        previousState: navigation.getState()
                    })
                }}
            >
                <CountryFlag isoCode={ language.normalizeCodeForFlag( allCodes[langCode] ) } size={28} />
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
                <Pressable>
                    <Text style={styles.bottomButton}>Usuń</Text>
                </Pressable> 
                <Pressable>
                    <Text style={styles.bottomButton}>Zapisz</Text>
                </Pressable> 
            </View>
        </View>
    )
}