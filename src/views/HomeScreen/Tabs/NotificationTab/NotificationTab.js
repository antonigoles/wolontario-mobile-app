import { View, Text } from 'react-native'
import AnimatedTab from '../AnimatedTab';

export default function NotificationTab({ navigation }) {
    return (
        <AnimatedTab navigation={navigation}>
            <View>
                <Text> Notification tab </Text>
            </View>
        </AnimatedTab>
    )
}