import langCodes from '../../assets/lang_codes.json'

export default {
    codeToFull: (code) => {
        return langCodes[code] == undefined ? undefined : langCodes[code].name
    },

    normalizeCodeForFlag: ( code ) => {
        return code == 'en' ? 'gb' : code
    }
}