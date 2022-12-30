import session from '../helpers/session.js';
import config from './config.js'

export default {
    requestLogin: async ( data ) => {
        try {
            const result = await fetch( `${config.API_URL}/user/login`, 
                {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                .then( res => res.json() )
    
            // alert( JSON.stringify( data )) 
            return result;
        } catch( err ) {
            throw err;
        }
    },

    requestRegister: async ( data ) => {
        try {
            const result = await fetch( `${config.API_URL}/user/register`, 
                {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                .then( res => res.json() )
            
            // alert( JSON.stringify( data )) 
            return result;
        } catch( err ) {
            throw err;
        }
    },

    
    async validateCurrentSession(callback) {
        let result = true;
        if ( callback ) callback( result )
        return true;
    },

    async logout() {
        try {
            const token = (await (session.get())).token;
            await fetch(`${config.API_URL}/user/blacklisttoken`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'content-type': 'application/json'
                },
            })
            await session.set( null )
        } catch (err) {
            throw err;
        }
    },
}