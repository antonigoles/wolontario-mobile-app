import config from "./config";
import session from "../helpers/session";

export default class {
    static async fetchList() {
        try {
            const token = (await session.get()).token
            return (await 
                fetch( `${config.API_URL}/grouprequest/list/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        }
                    })
                    .then( data => data.json() )).message
        } catch(err) {
            throw err;
        } 
    }

    static async fetchPending() {
        try {
            const token = (await session.get()).token
            return (await 
                fetch( `${config.API_URL}/grouprequest/pending/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        }
                    })
                    .then( data => data.json() )).message
        } catch(err) {
            throw err;
        } 
    }

    static async submitRequest( formData ) {
        try {
            const token = (await session.get()).token
            return (await 
                fetch( `${config.API_URL}/grouprequest/`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify( formData )
                    })
                    .then( data => data.json() )).message
        } catch(err) {
            throw err;
        } 
    }
}