import session from '../helpers/session';
import config from './config'

export default class {

    static async fetchTasks( groupid ) {
        try {
            const token = (await session.get()).token
            let result = (await 
                fetch( `${config.API_URL}/task/list/${groupid}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then( data => data.json() ))
            if ( result.error ) throw result.error
            else return result.message
        } catch(err) {
            throw err;
        }  
    }
}