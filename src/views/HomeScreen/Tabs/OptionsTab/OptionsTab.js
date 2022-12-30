import { View, Text, StyleSheet, Pressable } from 'react-native'
import OptionElement from './OptionElement'
import StyleStatics from '../../../../StyleStatics'

import PersonIcon from "../../../../../assets/icons/person.svg"
import InfoIcon from "../../../../../assets/icons/info.svg"
import LogoutIcon from "../../../../../assets/icons/logout.svg"
import auth from '../../../../api/auth'



export default function OptionsTab({ navigation }) {
    const styles = StyleSheet.create({
        view: {
            width: "100%",
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        optionList: {
            marginTop: 10,
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        footer: {
            height: 110,
            width: "85%",
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },

        logoutButton: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 15,
            borderRadius: 16,
            backgroundColor: StyleStatics.white,
        },

        logoutLabel: {
            paddingLeft: 5,
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
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
        <View style={styles.view}>
            <View style={styles.optionList}>
                <OptionElement navigation={navigation} label={"Moje konto"} icon={<PersonIcon {...iconOptions} />} />
                <OptionElement navigation={navigation} label={"O aplikacji"} icon={<InfoIcon {...iconOptions} />} />
            </View>
            <View style={styles.footer}>
                <Pressable 
                    onPress={() => {
                        auth.logout()
                    }}
                    style={styles.logoutButton}>
                    <LogoutIcon {...iconOptions} />
                    <Text style={styles.logoutLabel}>Wyloguj się</Text>
                </Pressable>
            </View>
        </View>
    )
} 