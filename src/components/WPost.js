import { View, StyleSheet, Text } from 'react-native'
import StyleStatics from '../StyleStatics'

const styles = StyleSheet.create({
    container: {
        width: 320,
        height: 230,
        borderRadius: 24,
        backgroundColor: StyleStatics.infoBlock,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    }
})

export default function WPost({image, title, date, org, location, isCert=false, tags=[] }) {
    return (
        <View style={styles.container}>

        </View>
    )
}