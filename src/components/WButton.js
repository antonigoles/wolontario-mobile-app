import { View, Text, TextInput, StyleSheet  } from 'react-native';
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

export default function WButton({ label, containerStyle, disabled=false }) {
  return (
    <View style={ { ...containerStyle, ...style.view, 
    ...{ backgroundColor: (disabled ? StyleStatics.disabled : StyleStatics.primary) } } }>
        <Text style={style.label}>{label}</Text>
    </View>
  );
}


