import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import { useState, useEffect } from 'react';
import users from '../../../../api/users';
import StyleStatics from '../../../../StyleStatics';
import PlusIcon from '../../../../../assets/icons/plus.svg'
import WLoadingAnimation from "../../../../components/WLoadingAnimation"
import language from '../../../../helpers/language';
import CountryFlag from "react-native-country-flag";


export default function Langs({ navigation }) {
    const [ langs, setLangs ] = useState([])

    const styles = StyleSheet.create({
        view: {
            display: 'flex',
            alignItems: 'center',
        },

        listElement: {
            backgroundColor: StyleStatics.inputBlock,
            width: "90%",
            marginTop: 15,
            borderRadius: 10,
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
    })

    useEffect(() => {
        const loadLangs = async () => {
            try {
                const result = await users.fetchLangs()
                setLangs(result)
            } catch(err) {
                // alert(err);
            }
        };
        loadLangs();
    },[])
    return (
        <View style={styles.view}>
            <ScrollView style={{ width: "100%", height: "85%"}} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                { langs ? 
                    langs.map( (el,idx) => 
                        <View key={idx} style={styles.listElement}>
                            <View style={styles.listHeaderLang}>
                                <View style={styles.listTitleLang}> 
                                    <CountryFlag style={styles.listTitleFlag} isoCode={ language.normalizeCodeForFlag(el.code) } size={32} />
                                    <Text style={styles.listTitleText}>{ language.codeToFull( el.code ) } </Text>
                                </View>
                                <Text style={styles.listSubtitle}> {el.level} </Text>
                            </View>
                        </View>
                    )
                : <WLoadingAnimation /> }
            </ScrollView>
            <Pressable 
                onPress={()=>{
                    navigation.navigate("LangEdit", {
                        creatingNew: true,
                        lastScreen: 'langs',
                    })
                }}
                style={{
                    width: "100%",
                    height: "15%",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
            >
                <PlusIcon 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',  
                    }}
                    fill={ StyleStatics.primary } 
                    width={40}
                    height={40}
                    preserveAspectRatio="xMinYMin slice" 
                    viewBox="2 2 50 50"
                />
                <Text style={{
                    color: StyleStatics.primary,
                    fontSize: 20,
                    fontFamily: 'Poppins-Medium'
                }}>
                    Dodaj
                </Text>
            </Pressable>
        </View>
    )
}