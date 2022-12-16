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
    
            return result;
        } catch( err ) {
            throw err;
        }
    },

    requestRegister: async () => {
        try {
            const result = await fetch( `${config.API_URL}/user/login`, 
                {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                .then( res => res.json() )
    
            return result;
        } catch( err ) {
            throw err;
        }
    },
}