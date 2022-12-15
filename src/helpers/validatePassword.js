import includesAny from "./includesAny";

export default validatePassword = (password) => {
    return includesAny(password, "0123456789".split("") ) 
        && includesAny(password, "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".split(""))
        && password.length > 8
};

