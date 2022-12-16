import AsyncStorage from "@react-native-async-storage/async-storage"

export default {
    set(data) {
        AsyncStorage.setItem( "@sessiondata", JSON.stringify(data) )
    },
    
    get( ) {
        return AsyncStorage.getItem("@sessiondata")
    },

    EMPTY_SESSION: {
        session: null,
    }
}