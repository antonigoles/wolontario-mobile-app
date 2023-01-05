import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, RefreshControl, Modal, KeyboardAvoidingView, Alert } from 'react-native';
import global from '../../../../../../helpers/global';
import PlusIcon from '../../../../../../../assets/icons/plus.svg'
import StyleStatics from '../../../../../../StyleStatics';
import group from '../../../../../../api/group';
import WLoadingAnimation from '../../../../../../components/WLoadingAnimation'
import time from '../../../../../../helpers/time';
import stringUtils from '../../../../../../helpers/stringUtils';
import WTextInput from '../../../../../../components/WTextInput'

export default function GroupAnnouncements({ navigation, route }) {
    const [ data, setData ] = useState(null);
    const [ refreshing, setRefreshing ] = useState(false);
    const [ isUserAdmin, setIsUserAdmin ] = useState( route.params.isAdmin )
    const [ groupId, setGroupId ] = useState( route.params.displayGroup )
    const [ readMoreVisibility, setReadMoreVisibility ] = useState(false);
    const [ addBroadcastVisibility, setAddBroadcastVisibility ] = useState(false);
    const [ focusedBroadcast, setFocusedBroadcast ] = useState(null)

    const loadData = async () => {
        try {
            setData(null);
            const result = await group.fetchAnnouncements( groupId );
            setData( result );
            setRefreshing(false);
        } catch ( err ) {
            global.raportError(err);
        } 
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadData();
    })

    useEffect(() => {
        loadData()
    }, [])
    
    const iconOptions = {
        fill: StyleStatics.primary,
        width: 45,
        height: 45,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }

    const styles = StyleSheet.create({
        view: {
            width: "100%",
            height: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
        },
        addButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: 100,
        },
        addButtonFont: {
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
            color: StyleStatics.primary,
        },
    })

    const readMore = ( idx ) => {
        setFocusedBroadcast( data[idx] );
        setReadMoreVisibility(true);
    }

    return (
        <View style={styles.view}>
            <Modal
                animationType="fade"
                visible={readMoreVisibility}
                transparent={true}
                onRequestClose={() => {
                    setReadMoreVisibility(!readMoreVisibility);
                }}
            >
                { focusedBroadcast && <ReadMoreModal 
                    annoucementId={focusedBroadcast.id}
                    groupId={groupId}
                    title={focusedBroadcast.title} 
                    message={focusedBroadcast.message} 
                    createdAt={focusedBroadcast.createdAt}
                    isAdmin={isUserAdmin}
                    onHide={ () => { setReadMoreVisibility(false); } }
                /> }
            </Modal>
            <Modal
                animationType="fade"
                visible={addBroadcastVisibility}
                transparent={true}
                onRequestClose={() => {
                    setAddBroadcastVisibility(!addBroadcastVisibility);
                }}
            >
                <AddBroadcastModal groupid={groupId} onHide={ () => { setAddBroadcastVisibility(false) } } />
            </Modal>
            { data ? 
                <ScrollView
                    contentContainerStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        // justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    refreshControl={
                        <RefreshControl 
                            refreshing={ refreshing }
                            onRefresh={onRefresh}
                        />
                    }
                >
                    { data.map( (e,idx) => <Announcement 
                        key={idx}
                        createdAt={e.createdAt} 
                        title={ e.title } 
                        message={ e.message } 
                        onReadMore={() => {
                            readMore( idx );
                        }}
                    />)
                    }
                </ScrollView>
            : <WLoadingAnimation />
            }
            { isUserAdmin &&
                <Pressable onPress={ () => { setAddBroadcastVisibility(true) } } style={styles.addButton}>
                    <PlusIcon { ...iconOptions }/>
                    <Text style={styles.addButtonFont}>Dodaj ogłosznie</Text>
                </Pressable>
            }
        </View>
    )
}

function Announcement({ createdAt, title, message, onReadMore }) {
    const styles = StyleSheet.create({
        view: {
            width: 330,
            marginVertical: 10,
        }, 
        createdAt: {
            fontFamily: 'Poppins-Medium',
            fontSize: 10,
            color: StyleStatics.lightText,
            padding: 5,
        },
        base: {
            width: "100%",
            borderRadius: 24,
            backgroundColor: StyleStatics.white,
        },
        title: {
            padding: 16,
            fontFamily: 'Poppins-Bold',
            fontSize: 14,
            color: StyleStatics.darkText,
        },
        message: {
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.darkText,
            fontSize: 12,
            paddingHorizontal: 15,
        },
        readMore: {
            paddingHorizontal: 15,
            paddingVertical: 15,
            fontFamily: 'Poppins-Bold',
            fontSize: 12,
            textAlign: 'right',
        }
    })
    return (
        <Pressable onPress={onReadMore} style={styles.view}>
            <Text style={styles.createdAt}>{ time.prettyTimespan( createdAt, true )} temu</Text>
            <View style={styles.base}>
                <Text style={styles.title}>{title}</Text>
                <Text numberOfLines={4} style={styles.message}>{message}</Text>
                <Text style={styles.readMore}> Czytaj więcej </Text>
            </View>
        </Pressable>
    )
}

function ReadMoreModal({ annoucementId, groupId, createdAt, title, message, onHide, isAdmin }) {
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
            height: 500,
            borderRadius: 20,
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
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.darkText,
            padding: 10,
            fontSize: 16,
        },

        message: {
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            padding: 20,
            paddingVertical: 0,
            color: StyleStatics.darkText,
        },

        createdAt: {
            padding: 15,
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.lightText,
            width: "100%",
        },

        footer: {
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: "80%",
        },

        footerButton: {
        },

        footerButtonLabel: {
            fontFamily: 'Poppins-Bold',
            color: StyleStatics.primary,
        }
    })
    const proceedDelete = async () => {
        try {
            const result = await group.deleteAnnouncement(groupId, annoucementId)
            global.popUp("Sukces", "Pomyślnie usunięto ogłoszenie")
            onHide(); 
        } catch (error) {
            global.popUp("Oh nie!", `Wystąpił błąd w trakcie usuwanie... ${error}`)
        }
    }

    const deleteBroadcast = () => {
        Alert.alert("Uwaga", "Czy na pewno chcesz usunąć to ogłoszenie? (Jest to nieodwracalne)",
        [
            { text: 'Anuluj', style: 'cancel', onPress: () => {} },
            { text: 'Usuń!', style: 'destructive', onPress: () => {
                proceedDelete();
            }}
        ])  
    }

    return (
        <View style={styles.view}>
            <View style={styles.base}>
                <View style={styles.header}>
                    <Text style={styles.headerFont}>{title}</Text>
                </View>
                <Text style={styles.createdAt}>{(time.dateToString(new Date(createdAt)))}</Text>
                <ScrollView>
                    <Text style={styles.message}>
                        { stringUtils.hightlightUrls( message ) }
                    </Text>
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.footerButton}>
                        { isAdmin && 
                        <Text 
                            onPress={ () => {
                                deleteBroadcast();
                                
                            }}
                            style={[ styles.footerButtonLabel, { color: StyleStatics.error } ]}
                        >
                            Usuń
                        </Text>
                        }
                    </View>
                    <View style={styles.footerButton}>
                        <Text 
                            onPress={ () => {
                                onHide();
                            }}
                            style={styles.footerButtonLabel}
                        >
                            Schowaj
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

function AddBroadcastModal({ onHide, groupid }) {
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
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
            width: "100%",
            height: "100%",
            // borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
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
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.darkText,
            padding: 10,
            fontSize: 16,
        },

        inputContainer: {
            height: "50%",
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        spacer: {
            marginTop: 20,
        },

        footer: {
            width: "100%",
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 0,
        },

        footerButton: {
            margin: 5,
            // backgroundColor: StyleStatics.white,
            color: StyleStatics.primary,
            fontFamily: 'Poppins-Bold',
            fontSize: 16,
            padding: 0,
        }
    })

    const submit = async () => {
        try {
            if ( title.length < 2 || message.length < 3 ) {
                return global.popUp("Złe dane", "Tytuł lub treść są zdecydowanie za krótkie");
            }
            const result = await group.postAnnouncement( groupid, title, message );
            global.popUp("Sukces", "Pomyślnie dodano ogłoszenie")
            onHide();
        } catch (error) {
            global.popUp("Błąd", `O nie! Wystąpił bład... ${error}`);
        }
    }

    return (
        <View style={styles.view}>
            <View style={styles.base}>
                <View style={styles.header}>
                    <Text style={styles.headerFont}>Dodaj nowe ogłoszenie</Text>
                </View>
                <View style={styles.inputContainer}>
                    <KeyboardAvoidingView
                        behavior="position"
                    >
                        <ScrollView>
                            <WTextInput 
                                val={title} 
                                setVal={setTitle} 
                                containerStyle={[styles.spacer]}
                                label="Tytuł ogłoszenia" 
                                placeholder="Tytuł ogłoszenia" 
                            />
                            <WTextInput 
                                val={message}
                                setVal={setMessage}
                                containerStyle={[styles.spacer]}
                                inputStyle={{ maxHeight: "90%" }} 
                                label="Treść ogłoszenia"
                                placeholder="Treść ogłoszenia"
                                additionalInputParams={{
                                    multiline: true,
                                    numberOfLines: 12,
                                }}
                            />
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
                <View style={styles.footer}>
                    <Text onPress={onHide} style={styles.footerButton}>Anuluj</Text>
                    <Text onPress={submit} style={styles.footerButton}>Wyślij</Text>
                </View>
                
            </View>
        </View>
    )
}