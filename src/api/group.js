import config from "./config";
import session from "../helpers/session";

export default class { 
    static async fetchGroups() {
        try {
            const token = (await session.get()).token
            return (await 
                fetch( `${config.API_URL}/group/list/`,
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

}