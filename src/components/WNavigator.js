import { View, StyleSheet } from "react-native";

const style = StyleSheet.create({
    view: {

    }
})

export default function WNavigator({ navigation, additionalStyle }) {
    return (
        <View style={{...style.view, ...additionalStyle }}>

        </View>
    )
}