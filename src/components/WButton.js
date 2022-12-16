import { View, Text, TextInput, StyleSheet, Pressable  } from 'react-native';
import StyleStatics from '../StyleStatics';
import React from 'react'
import { useState  } from 'react';

const style = StyleSheet.create({
  view: {
    width: 305,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },

  label: {
    fontWeight: 'bold',
    color: StyleStatics.white,
    fontSize: 18,
  }
})

export default function WButton({ label, onClick, containerStyle, disabled=false }) {
  const [ pressedIn, setPressedIn ] = useState(false) 
  return (
    <Pressable 
      onPressIn={() => { if ( !disabled ) setPressedIn(true) }} 
      onPressOut={() => { if ( !disabled ) setPressedIn(false) }} 
      onPress={ disabled ? (()=>{}) : onClick } 
      style={ 
        { ...containerStyle, 
          ...style.view, 
          ...{ backgroundColor: (disabled ? StyleStatics.disabled : StyleStatics.primary) },
          ...{ opacity: pressedIn ? 0.9 : 1 }, 
        }
      }>
        <Text style={style.label}>{label}</Text>
    </Pressable>
  );
}


