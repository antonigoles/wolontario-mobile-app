import { View, Text, StyleSheet, Pressable } from "react-native";
import GaleryIcon from '../../../assets/icons/galery.svg'
import CameraIcon from '../../../assets/icons/camera.svg'
import StyleStatics from "../../StyleStatics";

export default function BrowseImages({ navigation, onHide, setOutput })  {
    const styles = StyleSheet.create({
        view: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: "100%",
            backgroundColor: 'rgba(1,1,1,0.6)',
            paddingBottom: 25,
        },

        box: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 25,
            height: "40%",
            backgroundColor: StyleStatics.white,
            borderRadius: 24,
        },

        backButton: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 22,
            color: StyleStatics.primary,
        },

        choiceBox: {
            display: 'flex',
            flexDirection: 'row',
            width: 300,
            alignItems: 'center',
            justifyContent: 'space-between',
            height: "80%",
        },
        choice: {
            display: 'flex',
            alignItems: 'center',
            borderColor: StyleStatics.primary,
            borderWidth: 0.2,
            borderRadius: 15,
            padding: 15,
        },

        choiceTitle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            color: StyleStatics.primary,
            textAlign: 'center',
        }
    })

    const iconOptions = {
        fill: StyleStatics.primary,
        width: 100,
        height: 100,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "-2 0 50 50"
    }

    return (
        <View style={styles.view}>
            <View style={styles.box}>
                <View style={styles.choiceBox}>
                    <Pressable onPress={ () => { setOutput('library'); onHide() } } style={styles.choice}>
                        <Text style={styles.choiceTitle}>Galeria</Text>
                        <GaleryIcon {...iconOptions} />
                    </Pressable>
                    <Pressable onPress={ () => { setOutput('camera'); onHide() } } style={styles.choice}>
                        <Text style={styles.choiceTitle}>Aparat</Text>
                        <CameraIcon {...iconOptions} />
                    </Pressable>
                </View>
                <Text
                    onPress={ onHide ? onHide : null } 
                    style={styles.backButton}> 
                    Anuluj 
                </Text>
            </View>
        </View>
    )
}