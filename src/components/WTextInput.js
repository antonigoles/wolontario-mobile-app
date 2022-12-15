import { View, Text, TextInput, StyleSheet  } from 'react-native';
import StyleStatics from '../StyleStatics';
import React from 'react'
import { useState  } from 'react';

const style = StyleSheet.create({
  view: {

  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  textInput: {
    backgroundColor: StyleStatics.inputBlock,
    padding: 15,
    width: 305,
    height: 56,
    borderRadius: 12,
    fontSize: 14,
  },
  showButton: {

  }
})

export default function WTextForm({ label, placeholder, isSecure=false, containerStyle }) {

  const [ showSecured, setShowSecured ] = useState( false )

  return (
    <View style={containerStyle}>
      <Text style={style.label}>{label}</Text>
      <TextInput 
        style={style.textInput}
        placeholder={placeholder}
        placeholderTextColor={StyleStatics.placeholderText}
        secureTextEntry={showSecured}
      />
      { isSecure ? 
        <View style={style.showButton}>

        </View>
      : '' }
    </View>
  );
}


