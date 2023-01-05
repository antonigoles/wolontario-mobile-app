import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import global from '../helpers/global';
import StyleStatics from '../StyleStatics';

export default function WAlert({ id }) {
    const [ visible, setVisible ] = useState(false);
    const [ label, setLabel ] = useState("");
    const [ content, setContent ] = useState("");
    const [ buttons, setButtons ] = useState(null);
    const [ closeCallback, setOnCloseCallback ] = useState(null)
    const [ callbackReady, setCallbackReady ] = useState(false);

    global.popups[ id ] = {
        runPopup: (label, content, buttons=null, ) => {
            setVisible(true);
            setButtons( buttons )
            setLabel( label )
            setContent( content )
        }
    }


    const styles = StyleSheet.create({
        view: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        base: {
            backgroundColor: StyleStatics.white,
            width: 320,
            // height: 200,
            borderRadius: 20,
            // marginBottom: 100,
            display: 'flex',
            alignItems: 'center',
        },
        header: {
            width: "92%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: StyleStatics.white,
            borderBottomColor: StyleStatics.disabled,
            borderBottomWidth: 0.2,
        },
        headerFont: {
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
            padding: 10,
            fontSize: 18,
        },

        content: {
            width: "80%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 40,
        },

        contentFont: {
            textAlign: 'center',
            fontFamily: 'Poppins',
            color: StyleStatics.lightText,
            fontSize: 16,
        },

        buttonFooter: {
            width: "90%",
            display: 'flex',
            alignItems: 'center',
        },

        okButton: {
            // width: 100,
            // height: 50,
            
            // borderRadius: 12,
            borderColor: StyleStatics.success,
            borderWidth: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 15,
            paddingHorizontal: 30,
            paddingVertical: 10,
        },

        okButtonFont: {
            fontFamily: 'Poppins-Bold',
            color: StyleStatics.success,
            fontSize: 16,
            
        }
    })

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}
        >
            <View style={ styles.view }>
                <View style={ styles.base }>
                    <View style={ styles.header }>
                        <Text style={styles.headerFont}>
                        {label}
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentFont}>
                            {content}
                        </Text>
                    </View>
                    <View style={styles.buttonFooter}>
                        { buttons ? '' 
                        
                        : 
                            <Pressable onPress={() => { setVisible(false) }} style={styles.okButton}>
                                <Text style={styles.okButtonFont}>OK</Text>
                            </Pressable>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}
