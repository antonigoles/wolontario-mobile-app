import config from './config'

export default {

    async fetchProfile(id) {
        try {
            return await fetch( `${config.API_URL}/user/${id}`).then( data => data.json() )
        } catch(err) {
            throw err;
        }
        
    }

}