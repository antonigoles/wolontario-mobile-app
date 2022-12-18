import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import WTextInput from '../../../../components/WTextInput'
import StyleStatics from '../../../../StyleStatics'
import SearchIcon from "../../../../../assets/icons/search.svg"
import ArrowIcon from "../../../../../assets/icons/arrowRight1.svg"

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
        width: 240,
        height: 64,
        backgroundColor: StyleStatics.inputBlock,
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        // borderTopRightRadius: 20,
        // borderBottomRightRadius: 20,
    },

    searchIconContainer: {
        height: 64,
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
        height: 64,
        backgroundColor: StyleStatics.primary,
        // borderRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        // marginLeft: 10,
    }
})

function SearchBar() {
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
                style={searchBarStyles.inputBar}
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
    }
})

export default function HomeTab() {
    return (
        <View style={styles.container}>
            <SearchBar />
            <View style={styles.header}>
                <Text style={styles.lastAddedLabel}> Ostatnio dodane </Text>
                <Text style={styles.showMoreLabel}> Zobacz wszystko </Text>
            </View>
            <ScrollView>

            </ScrollView>
        </View>
    )
}