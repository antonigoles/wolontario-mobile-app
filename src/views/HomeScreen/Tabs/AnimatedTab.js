
import { useEffect, useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'


export default function AnimatedTab({ navigation, children }) {


    return (
        
        <Animated.View >
            {children}
        </Animated.View>
    )
}