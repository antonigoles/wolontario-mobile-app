
import { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';


export default function AnimatedTab(params) {

    return (
        
        <Animated.View>
            {params.children}
        </Animated.View>
    )
}