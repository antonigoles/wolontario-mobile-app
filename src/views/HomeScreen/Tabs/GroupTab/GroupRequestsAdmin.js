import { View, Text, StyleSheet, Modal, Pressable, ScrollView, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import StyleStatics from "../../../../StyleStatics"
import RequestListElement from './RequestListElement'
import grouprequest from '../../../../api/grouprequest'
import WText from '../../../../components/WText'
import time from '../../../../helpers/time'
import WButton from '../../../../components/WButton'

export default function Pending({ }) {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modalData, setModalData ] = useState({});

    const styles = StyleSheet.create({
        view: {
            width: "100%",
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
        sectionLabel: {
            marginTop: 16,
            fontFamily: 'Poppins-Bold',
            color: StyleStatics.darkText,
            fontSize: 20,
            width: 330,
            textAlign: 'center',
            backgroundColor: 'transparent',
            padding: 15,
            borderRadius: 16,
        },
        modalContainer: {
            width: "100%",
            height: "100%",
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalBase: {
            width: "90%",
            height: "80%",
            backgroundColor: StyleStatics.white,
            borderRadius: 12,
            display: 'flex',
        },
        modalInfoContainer: {
            display: 'flex',
            justifyContent: 'center',
            // alignItems: 'center'
            padding: 20,
        },

        trustedTag: {
            fontFamily: 'Poppins-Bold',
            fontSize: 12,
            backgroundColor: StyleStatics.success,
            color: StyleStatics.white,
            borderRadius: 12,
            paddingHorizontal: 5,
            marginRight: 5,
            textAlign: 'center',
        },

        footer: {
            width: "100%",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            padding: 10,
        },

        footerButton: {
            padding: 15,
            backgroundColor: StyleStatics.success,
            borderRadius: 12,
            // width: "40%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        footerButtonRed: {
            backgroundColor: StyleStatics.error,
        },

        footerButtonGray: {
            backgroundColor: StyleStatics.disabled,
        },

        footerButtonLabel: {
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.white
        }

    })

    const [ pendingRequests, setPendingRequests ] = useState([])

    const loadRequests = async () => {
        try {
            const result = await grouprequest.fetchPending();
            setPendingRequests( result )
        } catch ( err ) {
            alert(err)
        }
    }

    useEffect(()=>{
        loadRequests()
    },[])

    const displayRequest = (data) => {
        setModalVisible( true );
        setModalData(data)
    }

    const proceedUpdateRequestStatus = async ( status ) => {
        try {
            await grouprequest.updateStatus(modalData.id, status);
            setModalVisible(false); 
            await loadRequests();
        } catch ( err ) {
            alert(err)
            throw err;
        }
    }

    const updateRequestStatus = async ( status ) => {
        try {
            let proceed;
            await Alert.alert(
                "Czy na pewno chcesz to zrobić?",
                `Czy na pewno chcesz ${status == 'DENIED' ? "odmówić" : "zaakceptować"} zgłoszenie?`,
                [
                    {
                        text: "Tak",
                        onPress: () => { proceedUpdateRequestStatus( status ) }
                      },
                      {
                        text: "Anuluj",
                        onPress: () => { return; },
                        style: "cancel"
                      },
                ]
            )       
        } catch ( err ) {
            alert(err);
            throw err;
        }
    }

    return (
        <View>
            <View style={styles.view}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => { setModalVisible(!modalVisible); }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBase}>
                            <View style={{
                                width: "100%",
                                // height: 40,
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                borderBottomColor: StyleStatics.darkText,
                                borderBottomWidth: 0.2,
                                padding: 10,
                            }}> 
                                { modalData.createdBy ?  
                                <View style={{
                                    // width: 100,
                                    padding: 6,
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                }}>
                                    { modalData.createdBy.trusted ? <Text style={styles.trustedTag}> Zaufany </Text> : ''}
                                    <Text style={{
                                        fontFamily: 'Poppins-Bold',
                                    }}> 
                                        { modalData.createdBy.name } { modalData.createdBy.surname } 
                                    </Text>
                                </View>
                                : '' }
                            </View>
                            <ScrollView contentContainerStyle={styles.modalInfoContainer}>
                                <WText label={"Tytuł"} content={modalData.name} />
                                <WText label={"Organizacja"} content={modalData.orgName} />
                                <WText label={"Informacje do weryfikacji"} content={modalData.verificationDescription} />
                                <WText label={"Kategoria"} content={modalData.groupCategory} />
                                <WText label={"Zaczyna się"} content={ time.dateToString(new Date(modalData.date)) } />
                                <WText label={"Kończy się"} content={time.dateToString( new Date(modalData.endsOn))} />
                                <WText label={"Opis"} content={modalData.description} />
                                <WText label={"Certyfikat dla uczestników"} content={modalData.certificateAfter ? "Tak" : "Nie" } />
                                <WText label={"Lokalizacja"} content={modalData.location} />
                            </ScrollView>
                            <View style={styles.footer}>
                                <Pressable onPress={() => { updateRequestStatus('DENIED') }} style={[ styles.footerButton, styles.footerButtonRed] }>
                                    <Text style={ styles.footerButtonLabel}>Odmów</Text>
                                </Pressable>
                                <Pressable onPress={() => { updateRequestStatus('ACCEPTED') }} style={styles.footerButton}>
                                    <Text style={styles.footerButtonLabel}>Zaakceptuj</Text>
                                </Pressable>
                                <Pressable onPress={() => { setModalVisible(false) }} style={[ styles.footerButton, styles.footerButtonGray] }>
                                    <Text style={ styles.footerButtonLabel}> Anuluj </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.sectionLabel}> Prośby do zweryfikowania </Text>
                { pendingRequests.length > 0 ? 
                    pendingRequests.map( (e,idx) => (
                        <Pressable onPress={() => { displayRequest(e) } } key={idx}>
                            <RequestListElement 
                                title={e.name} 
                                org={e.orgName} 
                                createdBy={e.createdBy} 
                                status={e.status}
                            />
                        </Pressable>
                    ) )
                : ''}
            </View>
        </View>
    )
} 