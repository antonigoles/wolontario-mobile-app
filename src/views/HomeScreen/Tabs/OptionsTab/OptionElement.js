import { View, Text, StyleSheet } from 'react-native'
import StyleStatics from '../../../../StyleStatics'
import ForwardIcon from "../../../../../assets/icons/forward.svg"

export default function OptionElement({ navigation, label, icon }) {
    const styles = StyleSheet.create({
        view: {
            width: 330,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 12,
            marginTop: 15,
        },
        labelBox: {
            // width: "90%",
            textAlign: 'left',
        },
        label: {
            fontSize: 14,
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
        },
        iconBox: {
            width: 50,
            height: 50,
            // backgroundColor: StyleStatics.inputBlock,
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        proceedBox: {
            width: 40,
            height: 40,
            // backgroundColor: StyleStatics.inputBlock,
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    })
    const iconOptions = {
        fill: StyleStatics.darkText,
        width: 20,
        height: 20,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }
    return (
        <View style={styles.view}>
            <View style={styles.iconBox}>
                { icon }
            </View>
            <View style={styles.labelBox}>
                <Text style={styles.label}> {label} </Text>
            </View>
            <View style={styles.proceedBox}>
                <ForwardIcon {...iconOptions} />
            </View>
        </View>
    )
}