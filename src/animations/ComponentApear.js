import { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withSequence } from "react-native-reanimated";

export default function ComponentApear({ navigation, children }) {
    const opacity = useSharedValue(0);
    const slide = useSharedValue(-400);
    const aStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [ { translateX: slide.value } ],
        }
    })

    useEffect(() => {
        opacity.value = withSequence(
            withTiming( 0, 
                {
                    duration: 0,
                    easing: Easing.out(Easing.exp)
                }  
            ),
            withTiming( 1, 
                {
                    duration: 1000,
                    easing: Easing.out(Easing.exp)
                }  
            )
        )

        slide.value = withSequence(
            withTiming( -100, 
                {
                    duration: 0,
                    easing: Easing.out(Easing.exp)
                }  
            ),
            withTiming( 0, 
                {
                    duration: 1000,
                    easing: Easing.out(Easing.exp)
                }  
            )
        )
    }, [])

    return (
        <Animated.View style={aStyle}>
            {children}
        </Animated.View>
    )
}