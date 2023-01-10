import { useEffect, useState } from "react";
import { View, ScrollView, RefreshControl, Text, StyleSheet, Modal, Pressable, ImageBackground, Alert } from "react-native";
import group from "../../../../../../api/group";
import WLoadingAnimation from "../../../../../../components/WLoadingAnimation";
import WTextForm from "../../../../../../components/WTextInput";
import global from "../../../../../../helpers/global";
import StyleStatics from "../../../../../../StyleStatics";
import PlusIcon from '../../../../../../../assets/icons/plus.svg'
import GaleryIcon from '../../../../../../../assets/icons/galery.svg'
import WImage from "../../../../../../components/WImage";
import BrowseImages from "../../../../../Modals/BrowseImages";
import * as ImagePicker from 'expo-image-picker';
import WFullPost from "../../../../../../components/WFullPost";
import WCheckbox from "../../../../../../components/WCheckbox";
import WPost from '../../../../../../components/WPost';
import { isLessThanTheMB, getFileInfo } from "../../../../../../helpers/fileUtils";

const getGroupId = (route) => {
    return route.params.displayGroup;
}

export default function GroupAdverts({ navigation, route,  }) {

    const [ refreshing, setRefreshing ] = useState(false);
    const [ adverts, setAdverts ] = useState(null);
    const [ createAdvertModalVisible, setCreateAdvertModalVisible ] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        loadAdverts();
    }
    
    const loadAdverts = async () => {
        try {
            const result = await group.fetchAdverts( getGroupId(route) );
            setAdverts(result)
            setRefreshing(false);
        } catch( err ) {
            global.popUp("Oh nie!", `Wystąpił nieoczekiwany błąd! :( ${err}`)
        }
    }   

    useEffect(()=>{
        loadAdverts();
        
    },[])

    const hideCreateAdvertModal = () => {
        setCreateAdvertModalVisible(false);
        loadAdverts()
    }

    const showCreateAdvertModal = () => {
        
        setCreateAdvertModalVisible(true);
    }

    const styles = StyleSheet.create({
        view: {
            height: "100%",
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            justifyContent: 'space-between',
        },
        scrollview: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        noAdvertsInfo: {
            fontFamily: 'Poppins-Medium',
            marginTop: 50,
            width: "80%",
            textAlign: 'center',
            color: StyleStatics.lightText,
            fontSize: 20,
        },

        noAdvertsInfoSub: {
            fontFamily: 'Poppins-Medium',
            textAlign: 'center',
            color: StyleStatics.disabled,
            fontSize: 12,
        },

        addNew: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: "15%",
            width: "100%",
            
        },
        addNewLabel: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            color: StyleStatics.primary,
        }
    })

    const iconOptions = {
        fill: StyleStatics.primary,
        width: 45,
        height: 45,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }

    return ( 
        <View style={styles.view}>
            <CreateAdvertModal postCount={adverts && adverts.length} onHide={hideCreateAdvertModal} route={route} visible={createAdvertModalVisible} setVisible={setCreateAdvertModalVisible} />
            { adverts ?
                <View style={{ height: "85%" }}>
                    <ScrollView
                        contentContainerStyle={styles.scrollview}
                        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
                    >
                    { adverts.length > 0 ? adverts.map( (e,idx) => <WPost onPostDelete={loadAdverts} editorMode={true} el={e} key={idx}/> ) : 
                        <Text style={styles.noAdvertsInfo}> 
                            Wygląda na to że nie ma żadnych ogłoszeń {'\n'} ... {'\n'}
                            <Text style={styles.noAdvertsInfoSub}>
                                (przeciągnij w dół aby odświeżyć)
                            </Text>
                        </Text>
                    }
                    </ScrollView> 
                </View>
            : <WLoadingAnimation /> }
            <Pressable onPress={ showCreateAdvertModal } style={styles.addNew}>
                <PlusIcon style={styles.addNewLabel} {...iconOptions} />
                <Text style={styles.addNewLabel}> Dodaj nowe ogłoszenie </Text>
            </Pressable>
        </View>
    )
}

function CreateAdvertModal({ visible, setVisible, route, onHide, postCount }) {
    const [ postPreviewVisibility, setPostPreviewVisiblity ] = useState(false);
    const [ containImage, setContainImage ] = useState(false);
    const [ advertImage, setAdvertImage ] = useState(null);
    const [ fullGroupData, setFullGroupData ] = useState(null)
    const [ previewData, setPreviewData ] = useState(null);
    const [ data, setData ] = useState(JSON.stringify({
        title: "", description: "", requirements: "", contactPhone: "",
        contactEmail: "", contactWebsite: ""
    }))

    const styles = StyleSheet.create({
        view: {
            height: "100%",
            width: "100%",
            backgroundColor: StyleStatics.white,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'space-evenly',
        },
        header: {
            textAlign: 'center',
            fontSize: 16,
            fontFamily: 'Poppins-Bold',
            color: StyleStatics.darkText,
        },
        subheader: {
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
            fontSize: 12,
            color: StyleStatics.lightText,
        },
        scrollview: {
            display: 'flex',
            alignItems: 'center',
        },
        inputContainer: {
            margin: 5,
        },

        buttonContainer: {
            width: 330,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 25,
        },
        button: {
            backgroundColor: 'transparent',
            borderColor: StyleStatics.primary,
            borderWidth: 1,
            borderRadius: 12,
            padding: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonLabel: {
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.primary,
        },
    })

    const fetchGroupData = async () => {
        try {
            const result = await group.fetchGroup( getGroupId(route) );
            const parsedData = JSON.parse( data );
            setData(JSON.stringify({
                ...parsedData,
                title: result.name, description: result.description, 
            }))
            // global.popUp("TEST", JSON.stringify(result))
            setFullGroupData(JSON.stringify(result))
        } catch( err ) {
            global.popUp("Oh nie!", `Wystąpił nieoczekiwany błąd! :( ${err}`)
        }
    }

    useEffect( () => {
        fetchGroupData(); 
        if ( postCount && fullGroupData ) {
            if ( postCount >= JSON.parse(fullGroupData).advertLimit ) {
                onHide();
                global.popUp("Hmm...","Wygląda na to że nie możesz dodać już więcej postów... usuń starsze żeby zrobić miejsce na nowe!")
            }
        }
    }, [visible])

    const generateInputHandler = (label) => {
        return ( changed ) => {
            const parsedData = JSON.parse( data );
            parsedData[label] = changed;
            setData( JSON.stringify(parsedData) )
        }
    }

    const generateInputTarget = (label) => {
        return JSON.parse( data )[label]
    }
    
    const compileDataForPreview = () => {
        const __fullGroupData = JSON.parse(fullGroupData);
        // global.popUp("test", JSON.stringify(__fullGroupData))
        return {
            ...JSON.parse(data),
            date: __fullGroupData.date,
            endsOn: __fullGroupData.endsOn,
            category: __fullGroupData.category,
            organization: __fullGroupData.orgName,
            location: __fullGroupData.location,
            certificate: __fullGroupData.certificateAfter,
            imageUri: advertImage ? JSON.parse(advertImage).localUri : null,
        }
    }

    const previewPost = () => {
        const compiledData = compileDataForPreview()
        setPreviewData( compiledData );
        setPostPreviewVisiblity(true);
    }

    const cancelPrompt = () => {
        Alert.alert("Uwaga", 
        "Czy na pewno chcesz anulować? (Twoje zmiany mogą się nie zapisać)", [
            { text: 'Anuluj', style: 'cancel', onPress: () => {} },
            { text: 'Ok', style: 'destructive', 
                onPress: () => {
                    onHide();
                }
            }
        ])
    }

    const submitPost = async () => {
        try {
            const parsedData = JSON.parse(data);
            let parsedAdvertImage = null;
            if ( advertImage ) parsedAdvertImage = JSON.parse(advertImage);
            
            if ( parsedData.title.length < 5 || 
                parsedData.description.length < 5 
            ) {
                global.popUp("Złe dane","Pola: tytuł, opis lub wymagania mają zdecydowanie za mało informacji!")
                return;
            }

            const result = await group.postAdvert( 
                getGroupId(route),
                parsedData.title,
                parsedData.description,
                parsedData.requirements,
                parsedData.contactPhone,
                parsedData.contactEmail,
                parsedData.contactWebsite,
                parsedAdvertImage,
                containImage
            )
            global.popUp("Sukces", "Pomyślnie wysłano ogłoszenie!");
            onHide()
        } catch (error) {
            global.popUp("Oh nie!", `Wystąpił błąd :( ${error}`)
            // throw error;
        }
    }

    const submitPostPrompt = () => {
        Alert.alert("Potwierdź", 
        "Czy na pewno chcesz wysłać zgłoszenie?", [
            { text: 'Anuluj', style: 'cancel', onPress: () => {} },
            { text: 'Ok', style: 'destructive', 
                onPress: () => {
                    submitPost();
                }
            }
        ])
    }

    return (
        <Modal
            animationType="fade"
            visible={visible}
            transparent={true}
            onRequestClose={() => {
                setVisible(!visible);
            }}
        >
            <Modal
                animationType="fade"
                visible={postPreviewVisibility}
                transparent={true}
                onRequestClose={() => {
                    setPostPreviewVisiblity(!postPreviewVisibility);
                }}
            >
                <WFullPost 
                    containImage={containImage}
                    inModal={true} 
                    onHide={ () => {
                        setPostPreviewVisiblity(false);
                    }} 
                    postData={ previewData } 
                />


            </Modal>
            <View style={styles.view}>
                <View style={{ width: "80%" }}>
                    <Text style={styles.header}>Dodaj nowe ogłosznie</Text>
                    <Text style={styles.subheader}>
                        Lokacja, Data rozpoczęcia i zakończenia, Nazwa organizacji, 
                        Kategoria i Informacja o certyfikacie jest uzupełniona automatycznie
                    </Text>
                    <Text style={[styles.subheader, {color: StyleStatics.error}]}> 
                    Możesz dodać maksymalnie { fullGroupData && JSON.parse(fullGroupData).advertLimit } ogłoszenia! 
                    </Text>
                </View>
                <View style={{ height: "75%" }}> 
                    <ScrollView contentContainerStyle={styles.scrollview}>
                        <ImageUpload setContain={setContainImage} setOutput={setAdvertImage} />
                        <WTextForm 
                            val={generateInputTarget("title")}
                            setVal={ generateInputHandler("title") }
                            additionalInputParams={{ maxLength: 100 }} 
                            placeholder="Tytuł ogłoszenia (Max 100 znaków)" 
                            containerStyle={styles.inputContainer} 
                            label="Tytuł ogłoszenia" />
                        <WTextForm 
                            val={generateInputTarget("description")}
                            setVal={ generateInputHandler("description") }
                            placeholder="Opis wolontariatu (Max. 1200 znaków)"
                            containerStyle={styles.inputContainer} 
                            label="Opis" 
                            additionalInputParams={{
                                multiline: true,
                                numberOfLines: 10,
                                maxLength: 1200,
                            }}
                        />
                        <WTextForm 
                            val={generateInputTarget("requirements")}
                            setVal={ generateInputHandler("requirements") }
                            placeholder="Wymagania jakie muszą spełnić potencjalni kandydaci. Może być brak wymagań. (Max. 1200 znaków). "
                            containerStyle={styles.inputContainer} 
                            label="Wymagania" 
                            required={false}
                            additionalInputParams={{
                                multiline: true,
                                numberOfLines: 10,
                                maxLength: 1200,
                            }}
                        />
                        <WTextForm 
                            val={generateInputTarget("contactPhone")}
                            setVal={ generateInputHandler("contactPhone") }
                            additionalInputParams={{ maxLength: 9, keyboardType: 'numeric' }} 
                            placeholder="Telefon kontaktowy (Max. 9 znaków)"
                            required={false} 
                            containerStyle={styles.inputContainer} 
                            label="Telefon kontaktowy" 
                        />
                        <WTextForm 
                            val={generateInputTarget("contactEmail")}
                            setVal={ generateInputHandler("contactEmail") }
                            required={false}
                            additionalInputParams={{ keyboardType: 'email-address'}} 
                            placeholder="Email kontakowy (Max. 100 znaków)"
                            containerStyle={styles.inputContainer} 
                            label="Email kontakowy" 
                        />
                        <WTextForm 
                            val={generateInputTarget("contactWebsite")}
                            setVal={ generateInputHandler("contactWebsite") }
                            additionalInputParams={{ maxLength: 100 }} 
                            containerStyle={styles.inputContainer} 
                            required={false} 
                            placeholder="Strona internetowa (Max. 100 znaków)"
                            label="Strona internetowa" 
                        />
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Pressable onPress={cancelPrompt} style={styles.button}>
                            <Text style={styles.buttonLabel}> Anuluj </Text>
                        </Pressable>
                        <Pressable onPress={previewPost} style={styles.button}>
                            <Text style={styles.buttonLabel}> Podgląd </Text>
                        </Pressable>
                        <Pressable onPress={submitPostPrompt} style={styles.button}>
                            <Text style={styles.buttonLabel}> Wyślij </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

function ImageUpload({ setOutput, setContain }) {
    const [ imagePath, setImagePath ] = useState();
    const [ browseImagesResult, setBrowseImagesResult ] = useState(null);
    const [ browseImagesVisibility, setBrowseImagesVisibility ] = useState(false);
    const [statusLibrary, requestPermissionLibrary ] = ImagePicker.useMediaLibraryPermissions();
    const [containImage, setContainImage] = useState(false);
    const styles = StyleSheet.create({
        view: {
            width: 300,
            height: 230,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: StyleStatics.disabled,
            marginBottom: 15,
            borderRadius: 12,
        },
        label: {
            fontFamily: 'Poppins-Bold',
            fontSize: 14,
            padding: 5,
            textAlign: 'center',
        },

        imageBackground: {
            width: 300,
            height: 230,
            backgroundColor: 'black',
            marginBottom: 15,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        imageStyle: {
            height: 230,
            width: '100%',
        }
    })

    const iconOptions = {
        fill: StyleStatics.darkText,
        width: 60,
        height: 60,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }

    const loadImageWithLibrary = async ( ) => {
        try {
            if ( !statusLibrary ) await requestPermissionLibrary()
            if ( !statusLibrary ) return;
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            })

            if ( result.canceled ) {
                setOutput(null);
                setImagePath(null);
                return; 
            }

            const fileInfo = await getFileInfo( result.assets[0].uri );

            // global.popUp( "test", fileInfo.size )
            if ( !isLessThanTheMB( fileInfo.size, 2 ) ) {
                global.popUp("Uh oh", "Wydaje się że wybrany plik jest za duży :/ Maksymalny rozmiar to 2MB")
                return;
            }

            setImagePath(result.assets[0].uri)
            let localUri = result.assets[0].uri;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            
            setOutput( JSON.stringify({
                localUri, filename, type
            }))

        } catch ( err ) {
            global.popUp("Oh nie! ", `Wystąpił błąd... ${err}`)
            throw err;
        }
    }

    useEffect(()=>{
        if ( browseImagesResult ) {
            loadImageWithLibrary()
            setBrowseImagesResult(false);
        }
    }, [browseImagesResult])

    return (
        <View>
            <Pressable onPress={()=>setBrowseImagesVisibility(true)}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={browseImagesVisibility}
                >
                    <BrowseImages setOutput={setBrowseImagesResult} onHide={() => setBrowseImagesVisibility(false)}/>
                </Modal>
                
                <Text style={styles.label}> Zdjęcie ogłoszenia (kliknij aby wybrać) </Text>
                { imagePath ? 
                    <ImageBackground borderRadius={12} blurRadius={12} source={ { uri: imagePath } } resizeMode="cover" style={styles.imageBackground}>
                        <WImage externalStyle={styles.imageStyle} resizeMode={ containImage ? "contain" : "cover" } url={imagePath} />  
                    </ImageBackground>
                    :
                    <View style={styles.view}>
                        <GaleryIcon {...iconOptions} />  
                    </View>                
                }
            </Pressable>
            <WCheckbox onChange={(state) => { 
                setContainImage(state) 
                setContain(state)
            }} 
            containerStyle={{ marginVertical: 15, }} label="Dopasuj obrazek" />
        </View>        
    )
}
