import { View, Text, StyleSheet, Pressable } from "react-native"
import StyleStatics from "../../StyleStatics"
import MenuIcon from "../../../assets/icons/menu.svg"
import BackArrowIcon from "../../../assets/icons/backArrow.svg"
import WUserAvatar from "../../components/WUserAvatar"


export default function TabHeader({ navigation, title, homePage=true }) {
    const iconOptions = {
        fill: StyleStatics.darkText,
        width: 30,
        height: 30,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }

    // alert(JSON.stringify(navigation))

    const styles = StyleSheet.create({
        view: {
            fontFamily: 'Poppins',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: "100%",
            width: "100%"
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
    
        backButton: {
    
        },
        settingsButton: {
            
        },
        headerTitle: {
            // width: "100%",
            display: 'flex',
            alignItems: 'flex-start',
            flexShrink: 1,
            flexWrap: 'wrap',
            fontFamily: 'Poppins-SemiBold',
            // fontWeight: 'semi-bold',
            fontSize: Math.min( 24, Math.floor((40 / title.length) * 20)),
            textAlign: 'left',
            color: StyleStatics.darkText,
            justifySelf: "flex-start",
            marginLeft: 15,
        }
    
    })

    return (
        <View style={styles.view}>
            <View style={styles.container}>
                { homePage ? 
                <Pressable onPress={ navigation ? () => navigation.navigate('Options') : null } style={{...styles.squareButton, ...styles.backButton}}>
                    <MenuIcon { ...iconOptions } />
                </Pressable> 
                :
                <Pressable onPress={ navigation ? navigation.goBack : (()=>{}) } style={{...styles.squareButton ,...styles.settingsButton}}>
                    <BackArrowIcon style={{transform: [{ scaleX: -1 }]}} { ...iconOptions } />
                </Pressable>
                }     
                <Text style={styles.headerTitle}>
                    {title}
                </Text>
            </View>
            { homePage ? <WUserAvatar /> : '' }
        </View>
    )
}

