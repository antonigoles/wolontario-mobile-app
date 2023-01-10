import { View, Text, TextInput, StyleSheet, Pressable  } from 'react-native';
import StyleStatics from '../StyleStatics';
import React from 'react'
import { useState  } from 'react';

export default function WText({ 
    label, 
    content,
    style,
    fontSize=16,
  }) {

  const styles = StyleSheet.create({
    view: {
        marginTop: 20,
    },
    label: {
      fontFamily: 'Poppins-Bold',
      fontSize: fontSize,
    },
    contentBox: {
        fontFamily: 'Poppins',
        fontSize: fontSize-2
    }
  })

  return (
    <View style={[styles.view, style ]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.contentBox}> {content} </Text>
    </View>
  );
}


