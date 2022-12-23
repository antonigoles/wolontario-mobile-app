import AsyncStorage from "@react-native-async-storage/async-storage"

export default {
    async set(data, callback) {
        await AsyncStorage.setItem( "@sessiondata", JSON.stringify(data) )
        if ( callback ) callback()
    },
    
    async get( callback ) {
        const data = JSON.parse(await AsyncStorage.getItem("@sessiondata"))
        if ( callback ) callback(data)
        else return data;
    },

    EMPTY_SESSION: {
        session: null,
    }
}