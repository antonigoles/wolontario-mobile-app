import { View, Text, TextInput, StyleSheet  } from 'react-native';
import StyleStatics from '../StyleStatics';
import React from 'react'
import { SvgUri } from "react-native-svg";



const style = StyleSheet.create({
  view: {
    width: 305,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 24,
  },

  mark: {
    height: 25,
    width: 25,
    backgroundColor: StyleStatics.primary,
    borderRadius: 8,
  },

  label: {
    fontWeight: 'bold',
    color: StyleStatics.lightText,
    fontWeight: 'regular',
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 5,
  }
})

export default function WCheckbox({ label, containerStyle, checked }) {
  return (
    <View style={ { ...containerStyle, ...style.view } }>
        <View style={style.mark}> 
            <SvgUri 
                width={25}
                height={25}
                uri="../../assets/icons/checkmark.svg"
            />
        </View>
        <Text style={style.label}>{label}</Text>
    </View>
  );
}


