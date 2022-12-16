import AsyncStorage from "@react-native-async-storage/async-storage"

export default {
    async set( data, callback ) {
        await AsyncStorage.setItem( "@rememberedData", JSON.stringify(data) )
        if ( callback ) callback()
    },
    
    async get ( callback ) {
        const data = await AsyncStorage.getItem("@rememberedData")
        if ( callback ) callback(data)
    },

    EMPTY_SESSION: {
        session: null,
    }
}