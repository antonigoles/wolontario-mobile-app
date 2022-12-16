import includesAny from "./includesAny";

export default validatePassword = (password) => {
    const conditions = [
        includesAny(password, "0123456789".split("") ),
        includesAny(password, "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".split("")),
        password.length > 8,
    ]

    return !conditions.some( e => e == false ); 
};

