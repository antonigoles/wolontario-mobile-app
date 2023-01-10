import config from "./config";
import session from "../helpers/session";

export default class { 
    static async fetchGroup( groupid ) {
        try {
            const token = (await session.get()).token
            const result = (await 
                fetch( `${config.API_URL}/group/${groupid}`,
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

    static async fetchAdverts( groupid ) {
        try {
            const token = (await session.get()).token
            const result = (await 
                fetch( `${config.API_URL}/group/adverts/${groupid}`,
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

    static async postAdvert( 
            groupid, title, description,
            requirements, contactPhone,
            contactEmail, contactWebsite, 
            image, containImage
        ) {
        try {
            const token = (await session.get()).token
            
            let formData = new FormData();
            
            formData.append('groupid', groupid);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('requirements', requirements);
            formData.append('contactPhone', contactPhone);
            formData.append('contactEmail', contactEmail);
            formData.append('contactWebsite', contactWebsite);
            formData.append('containImage', containImage);
            
            if ( image ) {
                formData.append('image', { 
                    uri: image.localUri, 
                    name: image.filename,
                    type: image.type
                })
            }

            // alert( JSON.stringify(formData) )

            const result = (await fetch( `${config.API_URL}/group/advert/`,
                    {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            Accept: 'application/json',
                            'content-type': 'multipart/form-data',
                        },
                    })
                    .then( data => data.json() ))
            if ( result.error ) throw result;
            return result.message

        } catch(err) {
            throw err;
        }
    }

    static async deleteAdvert( advertid ) {
        try {
            const token = (await session.get()).token
            const result = (await fetch( `${config.API_URL}/group/advert/`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ advertid })
                    })
                    .then( data => data.json() ))
            if ( result.error ) throw result;
            return result.message

        } catch(err) {
            throw err;
        }
    }

}