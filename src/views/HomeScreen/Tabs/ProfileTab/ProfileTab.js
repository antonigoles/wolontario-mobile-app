import { View, Text } from 'react-native'
import AnimatedTab from '../AnimatedTab';

export default function ProfileTab({navigation}) {
    return (
        <AnimatedTab navigation={navigation}>
            <View>
                <Text> Profile tab </Text>
            </View>
        </AnimatedTab>
    )
}