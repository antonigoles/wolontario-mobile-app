import config from "./config";
import session from "../helpers/session";

export default class { 
    static async fetchGroups() {
        try {
            const token = (await session.get()).token
            const result = (await 
                fetch( `${config.API_URL}/group/list/`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        }
                    })
                    .then( data => data.json() ))
            if ( result.error ) throw result;
            return result.message
        } catch(err) {
            throw err;
        } 
    }

    static async fetchIsUserAdmin( groupid ) {
        try {
            const token = (await session.get()).token
            const result = (await 
                fetch( `${config.API_URL}/group/is-user-admin/${groupid}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        }
                    })
                    .then( data => data.json() ))
            if ( result.error ) throw result;
            return result.message
        } catch(err) {
            throw err;
        }
    }

    static async fetchAnnouncements( groupid ) {
        try {
            const token = (await session.get()).token
            const result = (await 
                fetch( `${config.API_URL}/group/broadcasts/${groupid}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        }
                    })
                    .then( data => data.json() ))
            if ( result.error ) throw result;
            return result.message
        } catch(err) {
            throw err;
        }
    }

    static async postAnnouncement( groupid, title, message ) {
        try {
            const token = (await session.get()).token
            const result = (await fetch( `${config.API_URL}/group/broadcast/`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ groupid, title, message })
                    })
                    .then( data => data.json() ))
            if ( result.error ) throw result;
            return result.message

        } catch(err) {
            throw err;
        }
    }

    static async deleteAnnouncement( groupid, announcementid ) {
        try {
            const token = (await session.get()).token
            const result = (await fetch( `${config.API_URL}/group/broadcast/`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ groupid, broadcastid: announcementid })
                    })
                    .then( data => data.json() ))
            if ( result.error ) throw result;
            return result.message

        } catch(err) {
            throw err;
        }
    }

}