import { View, StyleSheet, Text, Alert, Pressable } from 'react-native'
import StyleStatics from '../StyleStatics'
import config from "../api/config";
import CalendarIcon from '../../assets/icons/calendar.svg'
import ClockIcon from '../../assets/icons/clock.svg'
import CertIcon from '../../assets/icons/certificate.svg'
import OrgIcon from '../../assets/icons/org.svg'
import LocIcon from '../../assets/icons/location.svg'
import time from "../helpers/time";
import WImage from './WImage';
import EyeIcon from '../../assets/icons/visibilityOn.svg'
import TrashIcon from '../../assets/icons/trash.svg'
import global from '../helpers/global';
import group from '../api/group';

export default function WPost({ el, idx, editorMode=false, onPostDelete }) {
    const styles = StyleSheet.create({
        view: {
            width: 330,
            // height: 200,
            backgroundColor: StyleStatics.white,
            padding: 12,
            borderRadius: 12,
            margin: 5,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            // justifyContent: 'space-evenly',
        },
        mainContent: {
            width: 330,
            // height: 200,
            backgroundColor: StyleStatics.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        image: {
            width: 100,
            height: 220,
            borderRadius: 12,
        },
        textInfo: {
            width: 180,
            margin: 5,
            height: 220,
            marginLeft: 15,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        title: {
            fontFamily: 'Poppins-Bold',
        },
        miniinfo: {
            marginTop: 5,
        },
        editorModeTools: {
            width: 300,
            // margin: 5,
            display: 'flex',
            // backgroundColor: StyleStatics.infoBlock,
            marginTop: 10,
            borderTopColor: StyleStatics.infoBlock,
            borderTopWidth: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        viewsLabel: {
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
            padding: 5,
        },
        deleteLabel: {
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.error,
            padding: 5,
        },
        viewsBlock: {
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            margin: 5,
        },
        deleteBlock: {
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            margin: 5, 
            borderColor: StyleStatics.error, 
            borderWidth: 1, 
            padding: 5,
        }
    })
    
    if ( !el ) {
        return <View style={styles.view} key={idx}></View>
    } 
    const iconOptions = {
        fill: StyleStatics.darkText,
        width: 20,
        height: 20,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 2 50 50",
    }

    const proceedDeletePost = async () => {
        try {
            await group.deleteAdvert( el.id );
            global.popUp("Sukces", "Pomyślnie usunięto ogłosznie!")
            if ( onPostDelete ) onPostDelete();
        } catch (error) {
            global.popUp("Oh nie D:", `Wygląda na to żę wystąpił błąd... ${error}`)
        }
    }

    const tryDeletePost = () => {
        Alert.alert("Na pewno chcesz to zrobić?", "Czy na pewno chcesz usunąć to ogłoszenie? (Jest to nieodwracalne)",[
            { text: 'Anuluj', style: 'cancel', onPress: () => {} },
            { text: 'OK', style: 'destructive', 
                onPress: () => {
                    proceedDeletePost();
                }
            }
        ])
    }

    return (
        <View style={styles.view} key={idx}>
            <View style={styles.mainContent}>
                <WImage borderRadius={12} externalStyle={styles.image} url={ `${config.API_URL}/media/image/${el.image}` } />
                <View style={styles.textInfo}>
                    <Text style={styles.title}>{el.title}</Text>
                    <View style={styles.miniinfo}>
                        <MiniInfoBlock 
                            Icon={CalendarIcon} 
                            label={ `${time.dateToString(new Date( el.date ))}`} 
                        />
                        <MiniInfoBlock 
                            Icon={ClockIcon} 
                            label={ `${time.prettyTimespan(el.endsOn-el.date, false)}` } 
                        />
                        <MiniInfoBlock Icon={OrgIcon} label={ el.organization } />
                        <MiniInfoBlock Icon={LocIcon} label={ el.location } />
                        { el.certificate && <MiniInfoBlock Icon={CertIcon} label={ "Certyfikat" } /> }
                    </View>
                </View>
            </View>
            { editorMode && 
                <View style={styles.editorModeTools}>
                    <View style={styles.viewsBlock}>
                        <EyeIcon {...iconOptions} />
                        <Text style={styles.viewsLabel}> { el.views } </Text>
                    </View>
                    <Pressable onPress={tryDeletePost} style={styles.deleteBlock}>
                        <TrashIcon { ...{...iconOptions, ...{ fill: StyleStatics.error} } } />
                        <Text style={styles.deleteLabel}> Usuń </Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}

function MiniInfoBlock({ Icon, label }) {
    const styles = StyleSheet.create({
        view: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center",
            paddingLeft: 5,
            // paddingVertical: 1,
            width: 280,
        },
        label: {
            textAlign: 'left',
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.lightText,
            paddingLeft: 5,
            width: "80%",
            fontSize: 11,
        }
    })

    const iconOptions = {
        fill: StyleStatics.lightText,
        width: 15,
        height: 15,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 2 50 50",
    }

    return (
        <View style={styles.view}>
            <Icon {...iconOptions} />
            <Text numberOfLines={1} style={styles.label}>{label}</Text>
        </View>
    )
}