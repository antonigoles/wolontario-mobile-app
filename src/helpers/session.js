export default {
    set(data) {
        localStorage.setItem( "sessiondata", JSON.stringify(data) )
    },
    
    get( ) {
        return localStorage.getItem("sessiondata")
    },

    async validateSession() {
        return true;
    },

    EMPTY_SESSION: {
        session: null,
    }
}