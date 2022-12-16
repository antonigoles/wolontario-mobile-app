import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import WTextInput from "../../components/WTextInput";
import WButton from "../../components/WButton";
import WCheckbox from "../../components/WCheckbox";
import StyleStatics from '../../StyleStatics';

import validateEmail from '../../helpers/validateEmail';
import validatePassword from '../../helpers/validatePassword';

import auth from '../../api/auth.js'

export default function RegisterScreen({ navigation }) {
    const [ registerButtonDisabled, setRegisterButtonDisabled ] = useState(true);
    const [ error, setError ] = useState("");
    const [ loginData, setLoginData ] = useState(JSON.stringify({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPass: "",
        tosAccepted: false,
    }))

    const updateData = (field, value) => {
        let copyLoginData = JSON.parse(loginData);
        copyLoginData[field] = value;
        const validationResult = validateData( copyLoginData)
        setRegisterButtonDisabled( !validationResult[0] );
        setLoginData( JSON.stringify( copyLoginData ) )

        setError(validationResult[1])
    }

    const generateOnUpdate = (field) => {
        return ((value) => {
            updateData( field, value )
        })
    }

    const validateData = ( json ) => {
        if ( json.name.length < 3 ) return [false, "Niepoprawne imie"];
        if ( json.surname.length < 3 ) return [false, "Niepoprawne naziwsko"];
        if ( !validateEmail(json.email) ) return [false, "Niepoprawny adres email" ];
        if ( !validatePassword(json.password) ) 
            return [false, "Hasło powinno zawierać: Minimum 8 znaków, Minimum jedną litere oraz minimum jedną cyfre"]
        if ( json.password != json.confirmPass ) 
            return [false, "Hasła nie są takie same"]
        if ( !json.tosAccepted )
            return [false, "Musisz zaakceptować ToS"]
        
        return [true, ""]
    }

    const attemptRegister = async () => {
		// alert("test")
		try {
			const data = await auth.requestRegister( JSON.parse(loginData) );
			if ( data.error ) {
				setError( data.error )
			}
		} catch(err) {
			setError(err.error)
		}
		
	}

    return (
        <View style={style.view}>
            <View style={style.header}>
                <Text style={style.headerTop}>
                    Cześć!
                </Text>
                <Text style={style.headerSub}>
                    <Text> Stwórz konto lub </Text>
                    <Text 
                        style={style.joinButton}
                        onPress={()=>navigation.navigate('Login')}
                    > 
                        Zaloguj się
                    </Text> 
                </Text>
            </View>
            <View style={style.inputContainer}>
                <View style={style.nameFormContainer}> 
                    <WTextInput onUpdate={ generateOnUpdate("name") } isHalfSize={true} containerStyle={{...style.textForm, ...style.nameForm }} label="Imie" placeholder="Wpisz swoje imie" />
                    <WTextInput onUpdate={ generateOnUpdate("surname") } isHalfSize={true} containerStyle={{...style.textForm, ...style.nameForm }} label="Nazwisko" placeholder="Wpisz swoje nazwisko" />
                </View>
                
                <WTextInput onUpdate={ generateOnUpdate("email") } containerStyle={style.textForm} label="Email" placeholder="Wpisz swój adres email" />
                <WTextInput onUpdate={ generateOnUpdate("password") } containerStyle={style.textForm} label="Hasło" placeholder="Wpisz swoje hasło" isSecure={true} />
                <WTextInput onUpdate={ generateOnUpdate("confirmPass") } containerStyle={style.textForm} label="Potwierdź Hasło" placeholder="Potwierdź swoje hasło" isSecure={true} />
                <WCheckbox  checked={false} onChange={ generateOnUpdate("tosAccepted") } label="Akceptuje warunki korzystania z serwisu" />
                <Text style={style.error}>{error}</Text>
            </View>
            <View>
                
                <WButton onClick={attemptRegister} disabled={registerButtonDisabled} containerStyle={style.registerButton} label="Stwórz konto" />
            </View>
        </View>
    );
}

const style = StyleSheet.create({
	view: {
		backgroundColor: StyleStatics.background,
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		// alignContent: "flex-end",
	},

	header: {
		textAlign: 'center',
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "20%",
		marginTop: 10,
	},

	headerTop: {
		fontSize: 28,
		fontWeight: 'bold',
		color: StyleStatics.darkText,
	},

	joinButton: {
		color: StyleStatics.primary,
	},

	headerSub: {
		color: StyleStatics.lightText,
		fontSize: 18,
	},

	textForm: {
		marginVertical: 5,
	},

    // nameForm: {
    //     width: 120,
    // },

    nameFormContainer: {
        display: 'flex',
        width: 305,
        flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
    },  

	inputContainer: {
		height: "50%",
		// display: "flex",
        // flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		// marginVertical: 25,
	},
	
	registerButton: {
		marginVertical: 25,
		marginTop: 80,
		alignSelf: 'flex-end'
	},

    error: {
        color: StyleStatics.error,
        fontWeight: 'bold',
        marginVertical: 5,
        fontSize: 12,
        textAlign: 'center'
    }
})