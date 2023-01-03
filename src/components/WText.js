import { View, Text, TextInput, StyleSheet, Pressable  } from 'react-native';
import StyleStatics from '../StyleStatics';
import React from 'react'
import { useState  } from 'react';

export default function WText({ 
    label, 
    content,
    style,
  }) {

  const styles = StyleSheet.create({
    view: {
        marginTop: 20,
    },
    label: {
      fontFamily: 'Poppins-Bold',
      fontSize: 16,
    },
    contentBox: {
        fontFamily: 'Poppins',
    }
  })

  return (
    <View style={[styles.view, style ]}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.contentBox}> {content} </Text>
    </View>
  );
}


