import session from '../helpers/session';
import config from './config'

export default class {

    static async fetchProfile(id) {
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
    }

    static async fetchSkills() {
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
    }

    static async addSkill(skillData, skills) {
        let newSkills = [ ...skills ]
        newSkills.push( skillData )
        try {
            await this.skillPUTRequest( newSkills )
        } catch(err) {
            throw err;
        } 
    }

    static async updateSkill(skillIndex, skillData, skills) {
        let newSkills = [ ...skills ]
        newSkills[skillIndex] = skillData;
        try {
            await this.skillPUTRequest( newSkills )
        } catch(err) {
            throw err;
        }
    }

    static async deleteSkill(skillIndex, skills) {
        let newSkills = skills.filter( (_,i) => i != skillIndex ) 
        try {
            await this.skillPUTRequest( newSkills )
        } catch(err) {
            throw err;
        }
        
    }

    static async skillPUTRequest( body ) {
        try {
            const token = (await session.get()).token
            return (await 
                fetch( `${config.API_URL}/user/skills/`,
                    {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ newSkillsArray: body })
                    })
                    .then( data => data.json() ))
        } catch(err) {
            throw err;
        } 
    }

    static async fetchLangs() {
        try {
            const token = (await session.get()).token
            return (await 
                fetch( `${config.API_URL}/user/langs/`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then( data => data.json() )).message
        } catch(err) {
            throw err;
        }  
    }

    static async addLang(langData, langs) {
        let newLangs = [ ...langs ]
        newLangs.push( langData )
        try {
            await this.langPUTRequest( newLangs )
        } catch(err) {
            throw err;
        } 
    }

    static async updateLang(langIndex, langData, langs) {
        let newLangs = [ ...langs ]
        newLangs[langIndex] = langData;
        try {
            await this.langPUTRequest( newLangs )
        } catch(err) {
            throw err;
        }
    }

    static async deleteLang(langIndex, langs) {
        let newLangs = langs.filter( (_,i) => i != langIndex ) 
        try {
            await this.langPUTRequest( newLangs )
        } catch(err) {
            throw err;
        }
        
    }

    static async langPUTRequest( body ) {
        try {
            const token = (await session.get()).token
            return (await 
                fetch( `${config.API_URL}/user/langs/`,
                    {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ newLangsArray: body })
                    })
                    .then( data => data.json() ))
        } catch(err) {
            throw err;
        } 
    }


    static async updateAboutMe( newAboutMe ) {
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