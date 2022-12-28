import langCodes from '../../assets/lang_codes.json'

export default {
    getAllCodes: () => {
        return Object.entries(langCodes).map( e => e[0].toUpperCase() )
    },

    codeToFull: (code) => {
        let _code = code.toLowerCase()
        return langCodes[_code] == undefined ? undefined : langCodes[_code].name
    },

    normalizeCodeForFlag: ( code ) => {
        let _code = code.toLowerCase()
        return _code == 'en' ? 'gb' : _code
    },

    acceptedLevels: [
        { 
            "code": "A1",
            "full": "Początkujący",
        },
        { 
            "code": "A2",
            "full": "Początkujący",
        },
        { 
            "code": "B1",
            "full": "Średnio zaawansowany",
        },
        { 
            "code": "B2",
            "full": "Średnio zaawansowany",
        },
        { 
            "code": "C1",
            "full": "Zaawansowany",
        },
        { 
            "code": "C2",
            "full": "Zaawansowany",
        },
    ]
}