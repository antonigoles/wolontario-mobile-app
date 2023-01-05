import { View, StyleSheet, Text } from 'react-native'
import StyleStatics from '../StyleStatics'

const styles = StyleSheet.create({
    container: {
        width: 320,
        height: 230,
        borderRadius: 24,
        backgroundColor: StyleStatics.white,
        margin: 5,
    }
})

export default function WPost({image, title, date, org, location, isCert=false, tags=[] }) {
    return (
        <View style={styles.container}>

        </View>
    )
}