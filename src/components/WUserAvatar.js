import { View, StyleSheet, Text } from "react-native"
import StyleStatics from "../StyleStatics"
import PersonIcon from "../../assets/icons/person.svg"

export default function WUserAvatar({ userEmail=null, userId=null, bonusStyle={} }) {
    return (
        <View style={ { ...styles.View,...bonusStyle } }>
            <PersonIcon 
                fill={ StyleStatics.darkText } 
                width={35} 
                height={35} 
                preserveAspectRatio={"xMinYMin slice"} 
                viewBox={"0 0 47 47"} 
            />
        </View>
    )
}


const styles = StyleSheet.create({
    View: {
        backgroundColor: StyleStatics.inputBlock,
        borderRadius: 16,
        height: 50,
        width: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})