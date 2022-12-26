import session from '../helpers/session';
import config from './config'

export default {

    async fetchProfile(id) {
        try {
            const token = (await session.get()).token
            return (await 
                fetch( `${config.API_URL}/user/profile/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then( data => data.json() )).message
        } catch(err) {
            throw err;
        }  
    },

    async fetchSkills() {
        try {
            const token = (await session.get()).token
            return (await 
                fetch( `${config.API_URL}/user/skills/`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then( data => data.json() )).message
        } catch(err) {
            throw err;
        }  
    },


    async updateAboutMe( newAboutMe ) {
        try {
            const token = (await session.get()).token
            // alert( JSON.stringify({ newAboutMe: newAboutMe }))
            const result = await 
                fetch( `${config.API_URL}/user/aboutme/`,
                    {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ newAboutMe: newAboutMe }),
                        
                    })
                    .then( data => data.json() )
            return result
        } catch(err) {
            alert( JSON.stringify(err) ) 
            
        }  
    }


}