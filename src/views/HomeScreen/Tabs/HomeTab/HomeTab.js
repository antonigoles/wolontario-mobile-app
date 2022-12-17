import { View, Text } from 'react-native'
import WTextInput from '../../../../components/WTextInput'


function searchBar() {
    return (
        <View>
            <WTextInput />
        </View>
    )
}

export default function HomeTab() {
    return (
        <View>
            <WTextInput />
            <Text> Home tab </Text>
        </View>
    )
}