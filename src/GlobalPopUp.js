import { View, Text, StyleSheet } from 'react-native'
import StyleStatics from './StyleStatics'

export default function GlobalPopUp({ data }) {
    const styles = StyleSheet.create({
        view: {
            width: "100%",
            height: "100%",
        },
        base: {
            width: 330,
            height: 190,
            backgroundColor: StyleStatics.white,
        }
    })

    return(
        <View style={styles.view}>
            <View style={styles.base}>

            </View>
        </View>
    )
}