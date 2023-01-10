import { View, Text, StyleSheet, Pressable, ImageBackground, ScrollView } from "react-native";
import StyleStatics from "../StyleStatics";
import BackArrowIcon from "../../assets/icons/backArrow.svg"
import WImage from "./WImage";
import time from "../helpers/time";
import CalendarIcon from '../../assets/icons/calendar.svg'
import ClockIcon from '../../assets/icons/clock.svg'
import CertIcon from '../../assets/icons/certificate.svg'
import OrgIcon from '../../assets/icons/org.svg'
import LocIcon from '../../assets/icons/location.svg'
import { useEffect, useState } from "react";
import WButton from "./WButton";
import stringUtils from "../helpers/stringUtils";

export default function WFullPost({ postData, inModal=false, onHide, containImage }) {
   
    // imageUri, title, organization, date, endsOn, 
    // category, location, certificate, description,
    // requirements, contactPhone, contactEmail, contactWebsite

    const [ isContact, setIsContact ] = useState(false)

    const styles = StyleSheet.create({
        view: {
            width: "100%",
            height: "100%",
            backgroundColor: StyleStatics.white,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        imageContainer: {
            width: 330,
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // borderRadius: 24,
        },
        image: {
            height: 200,
            width: "100%",
            // aspectRatio: 1/2,
        },
        title: {
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.darkText,
            fontSize: 20,
            padding: 5,
            paddingVertical: 30,
            width: 280,
        },
        miniinfo: {
            padding: 20,
            backgroundColor: StyleStatics.infoBlock,
            borderRadius: 24,
        },

        blockSection: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 40,
        },

        blockSectionTitle: {
            fontFamily: 'Poppins-SemiBold',
            padding: 10,
            fontSize: 22,
            color: StyleStatics.darkText,
            backgroundColor: StyleStatics.infoBlock,
            width: 300,
            textAlign: 'center',
            borderRadius: 24,
        },

        blockSectionContent: {
            fontFamily: 'Poppins-Medium',
            padding: 10,
            fontSize: 14,
            color: StyleStatics.lightText,
            marginTop: 15,
            marginBottom: 45,
            width: 310,
            textAlign: 'justify',
        },
        contactBlockContent: {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
        },
        contactInfoContent: {

        },
        contactInfoContent: {
            fontFamily: 'Poppins-Medium',
            margin: 5,
        },

        contactInfoElement: {
            margin: 5,
        },
        contactInfoLabel: {
            fontFamily: 'Poppins-SemiBold',
        }
    })

    useEffect(()=>{
        setIsContact(
            postData.contactEmail.length > 0 || 
            postData.contactPhone.length > 0 || 
            postData.contactWebsite.length > 0 
        )

        
    }, [])

    return (
        <View style={styles.view}>
            { inModal && <SimplifiedTabHeader onHide={onHide} /> }
            { postData && 
                <View style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    height: "75%" 
                }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ display: 'flex',}}>
                        { postData.imageUri && 
                        <ImageBackground blurRadius={12} borderRadius={24} resizeMode="cover" source={{ uri: postData.imageUri }} style={styles.imageContainer}> 
                            <WImage externalStyle={styles.image}  resizeMode={ containImage ? "contain" : "cover" }  url={ postData.imageUri } /> 
                        </ImageBackground> 
                        }
                        <Text style={styles.title}>{postData.title} </Text>
                        <View style={styles.miniinfo}>
                            <MiniInfoBlock 
                                Icon={CalendarIcon} 
                                label={ `${time.dateToString(new Date( postData.date ))}  do  ${time.dateToString(new Date( postData.endsOn ))}`} 
                            />
                            <MiniInfoBlock 
                                Icon={ClockIcon} 
                                label={ `${time.prettyTimespan(postData.endsOn-postData.date, false)}` } 
                            />
                            <MiniInfoBlock Icon={OrgIcon} label={ postData.organization } />
                            <MiniInfoBlock Icon={LocIcon} label={ postData.location } />
                            { postData.certificate && <MiniInfoBlock Icon={CertIcon} label={ "Certyfikat" } /> }
                        </View>
                        <View style={styles.blockSection}>
                            <Text style={styles.blockSectionTitle}> Opis </Text>
                            <Text style={styles.blockSectionContent}> 
                            { postData.description } 
                            </Text>
                        </View>
                        {   postData.requirements?.length > 0 && 
                            <View style={styles.blockSection}>
                                <Text style={styles.blockSectionTitle}> Wymagania </Text>
                                <Text style={styles.blockSectionContent}> { postData.requirements } </Text>
                            </View>
                        }
                        { isContact && 
                        <View style={[styles.blockSection, { marginBottom: 100 }]}>
                            <Text style={styles.blockSectionTitle}> Kontakt </Text>
                            <View style={[styles.blockSectionContent, styles.contactBlockContent]}> 
                                <View style={styles.contactInfoElement}>
                                    <Text style={styles.contactInfoLabel}>Numer telefonu</Text>
                                    <Text style={styles.contactInfoContent}> 
                                     { postData.contactPhone } 
                                    </Text>
                                </View>
                                <View style={styles.contactInfoElement}>
                                    <Text style={styles.contactInfoLabel}>E-mail</Text>
                                    <Text style={styles.contactInfoContent}> 
                                    { postData.contactEmail } 
                                    </Text>
                                </View>
                                <View style={styles.contactInfoElement}>
                                    <Text style={styles.contactInfoLabel}>Strona internetowa</Text>
                                    <Text style={styles.contactInfoContent}> 
                                        { stringUtils.hightlightUrls(postData.contactWebsite) }
                                    </Text>
                                </View>
                            </View>
                        </View>
                        }
                    </ScrollView>
                    <WButton  label="Zgłoś się" />
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
            paddingVertical: 3,
            width: 280,
        },
        label: {
            textAlign: 'left',
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.lightText,
            paddingLeft: 5,
            width: "80%",
        }
    })

    const iconOptions = {
        fill: StyleStatics.lightText,
        width: 25,
        height: 25,
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

function SimplifiedTabHeader({ onHide }) {

    const styles = StyleSheet.create({
        tabHeader: {
            fontFamily: 'Poppins',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: "100%",
            height: 160,
            padding: 15,
        },
    
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
    
        squareButton: {
            width: 50,
            height: 50,
            backgroundColor: StyleStatics.inputBlock,
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    
        headerTitle: {
            // width: "100%",
            display: 'flex',
            alignItems: 'flex-start',
            flexShrink: 1,
            flexWrap: 'wrap',
            fontFamily: 'Poppins-SemiBold',
            // fontWeight: 'semi-bold',
            fontSize: 24,
            textAlign: 'left',
            color: StyleStatics.darkText,
            justifySelf: "flex-start",
            marginLeft: 15,
        }
    })

    const iconOptions = {
        fill: StyleStatics.darkText,
        width: 30,
        height: 30,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }

    return (
        <View style={styles.tabHeader}>
            <View style={styles.container}>
                <Pressable onPress={onHide} style={{...styles.squareButton }}>
                    <BackArrowIcon style={{transform: [{ scaleX: -1 }]}} { ...iconOptions } />
                </Pressable>   
                <Text style={styles.headerTitle}> Podgląd ogłoszenia </Text>
            </View>
        </View>
    )
}