import { View, Text, Pressable  , StyleSheet  } from 'react-native';
import StyleStatics from '../StyleStatics';
import React, { useState } from 'react'
import CheckmarkIcon from "../../assets/icons/checkmark.svg";

const style = StyleSheet.create({
  view: {
    width: 305,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  mark: {
    height: 20,
    width: 20,
    borderRadius: 6,
  },

  markIcon: {
    color: StyleStatics.white,
  },

  label: {
    fontWeight: 'bold',
    color: StyleStatics.lightText,
    fontWeight: 'regular',
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 7,
  }
})

export default function WCheckbox({ label, containerStyle, isChecked=false, onChange }) {
    const [ checked, setChecked ] = useState( isChecked );

    return (
        <Pressable   onPress={() => {
            setChecked( !checked );
            if ( onChange ) onChange( !checked );
        }} style={ { ...containerStyle, ...style.view } }>
            <View style={
                { 
                    ...( checked ? { backgroundColor: StyleStatics.primary } : { backgroundColor: StyleStatics.disabled }) ,
                    ...style.mark, 
                }}> 
                { checked ? <CheckmarkIcon 
                    height="100%" 
                    preserveAspectRatio="xMinYMin slice"  
                    width="100%" 
                    viewBox="-2 -2 50 50" 
                    fill={style.markIcon.color} 
                /> : ""}
            </View>
            <Text style={style.label}>{label}</Text>
        </Pressable  >
    );
}


