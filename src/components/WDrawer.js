import { useEffect, useState } from "react"
import { View, StyleSheet, Text, Pressable } from "react-native"
import StyleStatics from "../StyleStatics";
import EditIcon from "../../assets/icons/edit.svg"
import ArrowIcon from "../../assets/icons/backArrow.svg"
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';


export default function WDrawer(props) {
    const [ open, setOpen ] = useState(false);
    const slideProgress = useSharedValue(0);

    const styles = StyleSheet.create({
        view: {
            overflow: 'hidden',
        },
        labelbox: {
            width: "100%",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15,
        },
        label: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 24,
            color: StyleStatics.darkText,
            // marginLeft: 15,
        },
        button: {
            width: 45,
            height: 45,
            backgroundColor: StyleStatics.inputBlock,
            // marginRight: 15,
            borderRadius: 10,
            margin: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        buttons: {
            display: 'flex',
            flexDirection: 'row',
        }
    })

    const iconOptions = {
        fill: StyleStatics.darkText,
        width: 30,
        height: 30,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: slideProgress.value,
        }
    })


    useEffect(()=>{
        slideProgress.value = withTiming( open ? props.maxHeight : 0, 
        {
            duration: 300,
            easing: Easing.out(Easing.exp)
        }  
        );
    },[open])

    return (
        <View style={{ ...props.externalStyle, ...styles.view }} > 
            <Pressable onPress={ () => { setOpen(!open) } } style={ {...styles.labelbox, } }>
                <Text style={styles.label}>{props.label}</Text>
                <View style={styles.buttons}>
                    { props.editable ? 
                    <Pressable onPress={ props.onEdit ? props.onEdit : (()=>{}) } style={styles.button}>
                        <EditIcon { ...iconOptions } />
                    </Pressable>
                    : ''}
                    <View style={styles.button}>
                        <ArrowIcon { ...iconOptions } style={{transform: [{ rotateZ: open ? "90deg" : "270deg" }]}} />
                    </View>
                </View>
            </Pressable>
            <Animated.View 
                style={[ animatedStyles ]}>
                { props.children }
            </Animated.View>
        </View>
    )

}