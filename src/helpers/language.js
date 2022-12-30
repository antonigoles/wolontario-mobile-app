import langCodes from '../../assets/lang_codes.json'
import langByCountryJSON from '../../assets/country_list.json'
const codeByCountry = {}
langByCountryJSON.forEach( c => {
    if ( c["lang_code"] ) {
        codeByCountry[ c["lang_code"] ] = {
            country: c["country_code_name"],
            fullname: c["lang_name"],
        }
    }
} )

const acceptedLevels = [
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
    { 
        "code": "NATIVE",
        "full": "Ojczysty",
    },
]

const allCodes = Object.entries(codeByCountry).map( e => e[0].toLowerCase() )

export default {
    acceptedLevels,

    getAllCodes: () => {
        return allCodes
    },

    codeToFull: (code) => {
        let _code = code.toLowerCase()
        let result = codeByCountry[_code] == undefined ? undefined : codeByCountry[_code].fullname
        if ( result == undefined ) return result;
        result = result[0].toUpperCase() + result.slice(1)
        return result
    },

    langToFlagCode: ( code ) => {
        let _code = code.toLowerCase()
        return codeByCountry[ _code ] ? codeByCountry[ _code ]["country"] : ""
    },

    levelToIndex: (code) => {
        return acceptedLevels.findIndex( e => e["code"] == code.toUpperCase() )
    },

    codeToIndex: (code) => {
        return allCodes.findIndex( e => e == code.toLowerCase() )
    },

    
}