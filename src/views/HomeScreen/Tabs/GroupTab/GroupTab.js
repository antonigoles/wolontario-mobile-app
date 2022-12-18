import { View, Text } from 'react-native'
import AnimatedTab from '../AnimatedTab';

export default function GroupTab({navigation}) {
    return (
        <AnimatedTab navigation={navigation}>
            <View>
                <Text> Group tab </Text>
            </View>
        </AnimatedTab>
    )
}