import { View, Text, StyleSheet, TextInput, FlatList, Dimensions   } from 'react-native'
import StyleStatics from '../../../../StyleStatics'
import SearchIcon from "../../../../../assets/icons/search.svg"
import ArrowIcon from "../../../../../assets/icons/arrowRight1.svg"
import WPost from '../../../../components/WPost'
import AnimatedTab from '../AnimatedTab';
import responsivenessUtility from "../../../../helpers/responsivenessUtility" 
import { useEffect, useState } from 'react'
import { Modal } from 'react-native-paper'
const window = Dimensions.get("window");



function SearchBar() {
    const [ focusMode, setFocusMode ] = useState(false)
    const focusModeHeight = 100;
    const searchBarStyles = StyleSheet.create({
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: "row",
            width: "100%",
            marginTop: 15,
        },
        inputBar: {
            width: "55%",
            height: focusMode ? focusModeHeight : 64,
            backgroundColor: StyleStatics.inputBlock,
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.lightText,
            // borderTopRightRadius: 20,
            // borderBottomRightRadius: 20,
        },
    
        searchIconContainer: {
            height: focusMode ? focusModeHeight : 64,
            width: 64,
            backgroundColor: StyleStatics.inputBlock,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    
        goButton: {
            width: 64,
            height: focusMode ? focusModeHeight : 64,
            backgroundColor: StyleStatics.primary,
            // borderRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
        }
    })
    return (
        <View style={searchBarStyles.container}>
            <View style={searchBarStyles.searchIconContainer}>
                <SearchIcon 
                    fill={StyleStatics.disabled}
                    viewBox="-30 -27 100 100" 
                    width={75}
                    height={75}
                />
            </View>
            <TextInput 
                style={ searchBarStyles.inputBar }
                placeholder={"Szukaj ogłoszeń"}
                placeholderTextColor={StyleStatics.disabled}
            />
            <View style={searchBarStyles.goButton}>
                <ArrowIcon 
                    fill={StyleStatics.white}
                    viewBox="-20 -20 100 100" 
                    width={75}
                    height={75}
                />
                {/* <SearchIcon 
                    fill={StyleStatics.white}
                    viewBox="-18 -20 100 100" 
                    width={75}
                    height={75}
                /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: "100%",
    },
    header: {
        display: 'flex',
        width: "95%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    lastAddedLabel: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
        color: StyleStatics.darkText,
    },
    showMoreLabel: {
        fontSize: 14,
        color: StyleStatics.lightText,
        fontFamily: 'Poppins',
    }, 
    feedScroll: {
        height: window.height-375,
    }
})



export default function HomeTab({ navigation, setNav }) {
    useEffect(()=>{
        setNav( navigation );
    }, [navigation])
    const samplePostList = [ "test", "Test2", "Test2", "Test2", "Test2", "Test2", "Test2", "Test2", "Test2", "Test2", "Test2" ]
    const minCols = 1;
    // alert(  );

    return (
        <AnimatedTab navigation={navigation}>
            <View style={styles.container}>
                <SearchBar />
                <View style={styles.header}>
                    <Text style={styles.lastAddedLabel}> Ostatnio dodane </Text>
                    <Text style={styles.showMoreLabel}> Zobacz wszystko </Text>
                </View>
                <FlatList  
                    style={styles.feedScroll}
                    data={samplePostList}
                    renderItem={WPost}
                    keyExtractor={(_,idx) => idx}
                    numColumns={Math.max( minCols, Math.floor(window.width / (320+10)))}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </AnimatedTab>
    )
}