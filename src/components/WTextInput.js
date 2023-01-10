import { View, Text, TextInput, StyleSheet, Pressable  } from 'react-native';
import StyleStatics from '../StyleStatics';
import React from 'react'
import { useState  } from 'react';
import VisibilityOn from '../../assets/icons/visibilityOn.svg'
import VisibilityOff from '../../assets/icons/visibilityOff.svg';
import {Dimensions} from 'react-native';
import global from '../helpers/global';


export default function WTextForm({ 
    label, 
    placeholder, 
    isSecure=false, 
    required=true,
    containerStyle, 
    inputStyle,
    isHalfSize=false, 
    onUpdate,  
    setVal,
    val,
    additionalInputParams={}
  }) {
  // if ( !val ) {
  //   // val = useState("")
  // }
  const [ showSecured, setShowSecured ] = useState( isSecure )
  let full = Dimensions.get('window').width * 0.85;
  let inputWidth = isSecure ? full-56 : full;
  let halfInputWidth = isSecure ? (full/2)-56 : full;
  const style = StyleSheet.create({
    view: {
  
    },
    label: {
      fontFamily: 'Poppins-Bold',
      // fontWeight: 'bold',
      marginBottom: 10,
      fontSize: 16,
      width: full,
    },
  
    inputGroup: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      
    },
  
    textInput: { ...{
      backgroundColor: StyleStatics.inputBlock,
      padding: 15,
      textAlignVertical: 'top',
      borderRadius: 12,
      fontSize: 14,
      fontFamily: 'Poppins',
    }, ...additionalInputParams.multiline ? {

    } : {
      height: 56,
    }},
    showButton: {
      height: 56,
      width: 56,
      backgroundColor: StyleStatics.inputBlock,
      borderTopRightRadius: 12, 
      borderBottomRightRadius: 12,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    }
  })

  return (
    <View style={ {
      ...containerStyle, 
      ...( isHalfSize ? { width: full/2 } : { width: full } ), 
    }}
      >
      { label ? <Text style={style.label}>
        {label}
        { required ? <Text style={{color: StyleStatics.error}}>*</Text> : ''}
        </Text> : "" }
      <View style={style.inputGroup}>
        <TextInput 
          // maxHeight={(numberOfLines ? numberOfLines : 1) * 56}
          style={ { 
            ...style.textInput, 
            ...( isHalfSize ? { width: halfInputWidth } : { width: inputWidth } ),
            ...( isSecure ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 } : {}  ),
            ...inputStyle
          }}
          placeholder={placeholder}
          placeholderTextColor={StyleStatics.placeholderText}
          secureTextEntry={showSecured}
          onChangeText={ (data) => { 
            if ( onUpdate ) onUpdate(data); 
            if ( setVal ) setVal(data); 
          } }
 
          { ...(val ? { value: val } : { }) }
          { ...additionalInputParams }

        />
        { isSecure ? 
          <Pressable onPress={ () => { setShowSecured( !showSecured); } } style={style.showButton}>
            { showSecured ? 
              <VisibilityOn
              height="100%" 
              preserveAspectRatio="xMinYMin slice"  
              width="100%" 
              viewBox="-25 -25 100 100" 
              fill={StyleStatics.lightText} 
            /> :
            <VisibilityOff
              height="100%" 
              preserveAspectRatio="xMinYMin slice"  
              width="100%" 
              viewBox="-25 -25 100 100" 
              fill={StyleStatics.lightText} 
            />
            }
            
          </Pressable>
        : '' }
      </View>
    </View>
  );
}


