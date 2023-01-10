import { useEffect } from "react";
import { Image, StyleSheet } from "react-native"
import { View } from "react-native-animatable";
import Animated, { withRepeat, Easing, useSharedValue, useAnimatedStyle, withSequence, withTiming, withDelay } from 'react-native-reanimated';
import StyleStatics from "../StyleStatics";

export default function WLoadingAnimation() {
    const ballPos = [ useSharedValue(0), useSharedValue(0), useSharedValue(0) ];
    
    const animatedStyleGenerator = (idx) => {
        return (useAnimatedStyle(() => {
            return {
                transform: [{ scale: ballPos[idx].value } ]
            }
        }))
    }

    // useEffect(()=>{
    //     slideProgress.value = withTiming( open ? props.maxHeight : 0, 
    //     {
    //         duration: 300,
    //         easing: Easing.out(Easing.exp)
    //     }  
    //     );
    // },[open])

    const styles = StyleSheet.create({
        view: {
            widht: "100%",
            height: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        dotsbox: {
            width: "100%",
            height: "100%",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        dot: {
            backgroundColor: StyleStatics.darkText,
            opacity: 0.6,
            width: 20,
            height: 20,
            borderRadius: 200,
            margin: 15,
            // transform: [{ translateY: ballPos.value }]
        }
    })

    const animConfig = {
        duration: 500,
        easing: Easing.out(Easing.exp)
    }

    useEffect(()=>{
        ballPos.forEach( (ball, idx) => {
            ball.value = 
                withDelay(
                    idx * 100,
                    withRepeat( 
                        withSequence( 
                            withTiming(1, animConfig), 
                            withTiming(0.1, animConfig),
                        ), 
                        22222, 
                        true 
                    )
                ) 
        })
    }, [])


    return (
        <View style={styles.view}>
            <View style={styles.dotsbox}>
                <Animated.View style={[ styles.dot, animatedStyleGenerator(0) ]}></Animated.View>
                <Animated.View style={[ styles.dot, animatedStyleGenerator(1) ]}></Animated.View>
                <Animated.View style={[ styles.dot, animatedStyleGenerator(2) ]}></Animated.View>
            </View>
        </View>
    )

}