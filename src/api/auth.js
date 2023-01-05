import session from '../helpers/session.js';
import config from './config.js'

export default class {
    static async requestLogin ( data ) {
        try {
            const result = await fetch( `${config.API_URL}/user/login`, 
                {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                .then( res => res.json() )
    
            if ( result.error ) throw result; 
            return result;
        } catch( err ) {
            throw err;
        }
    }

    static async requestRegister ( data ) {
        try {
            const result = await fetch( `${config.API_URL}/user/register`, 
                {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                .then( res => res.json() )
            
            if ( result.error ) throw result; 
            return result;
        } catch( err ) {
            throw err;
        }
    }

    
    static async validateCurrentSession(callback) {
        let result = true;
        if ( callback ) callback( result )
        return true;
    }

    static async logout() {
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
    }


    static async verifyEmail( email, code ) {
        try {
            const result = await fetch(`${config.API_URL}/user/confirm-email/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email: email, token: code })
            })
            .then( res => res.json() )
            if ( result.error ) throw result; 
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async resetEmailToken( email ) {
        try {
            const result = await fetch(`${config.API_URL}/user/reset-email-token/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
            .then( res => res.json() )
            if ( result.error ) throw result; 
            return result;
        } catch (err) {
            throw err;
        }
    }


}