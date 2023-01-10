import { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";

export default function FadeIn({ navigation, children }) {
    const opacity = useSharedValue(0);
    const aStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            // transform: [ { translateY: 10*(1-opacity.value) } ],
        }
    })

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            opacity.value = withTiming( 0, 
                {
                    duration: 1000,
                    easing: Easing.out(Easing.exp)
                }  
            );
        })

        return unsubscribe;
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            opacity.value = withTiming( 1, 
                {
                    duration: 1000,
                    easing: Easing.out(Easing.exp)
                }  
            );
        })

        return unsubscribe;
    }, [])

    return (
        <Animated.View style={aStyle}>
            {children}
        </Animated.View>
    )
}