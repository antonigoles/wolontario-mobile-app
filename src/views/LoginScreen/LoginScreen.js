import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import WTextInput from "../../components/WTextInput";
import WButton from "../../components/WButton";
import WCheckbox from "../../components/WCheckbox";
import StyleStatics from '../../StyleStatics';
import auth from '../../api/auth.js';

export default function LoginScreen({ navigation }) {
	const [ error, setError ] = useState("");
	const [ loginButtonDisabled, setLoginButtonDisabled ] = useState(true);

	const [ loginData, setLoginData ] = useState(JSON.stringify({
        email: "",
        password: "",
    }))

    const updateData = (field, value) => {
        let copyLoginData = JSON.parse(loginData);
        copyLoginData[field] = value;
        const validationResult = validateData( copyLoginData)
        if ( validationResult[0] ) setLoginButtonDisabled( false );
        else setLoginButtonDisabled( true )
        setLoginData( JSON.stringify( copyLoginData ) )

        setError(validationResult[1])
    }

    const generateOnUpdate = (field) => {
        return ((value) => {
            updateData( field, value )
        })
    }

	const validateData = ( json ) => {
        if ( !validateEmail(json.email) ) return [false, "Niepoprawny adres email" ];   
		if ( json.password.length < 8 ) return [false, "Za krótkie hasło"]
        return [true, ""]
    }

	const attemptLogin = async () => {
		// alert("test")
		try {
			await auth.requestLogin( JSON.parse(loginData) );
		} catch(err) {
			// alert(err)
		}
		
	}

	return (
		<View style={style.view}>
		<View style={style.header}>
			<Text style={style.headerTop}>
			Witaj
			</Text>
			<Text style={style.headerSub}>
			<Text> Nie masz jeszcze konta? </Text>
			<Text 
				style={style.joinButton}
				onPress={()=>navigation.navigate('Register')}
			> 
				Dołącz teraz 
			</Text> 
			</Text>
		</View>
		<View style={style.inputContainer}>
			<WTextInput onUpdate={generateOnUpdate("email")} containerStyle={style.textForm} label="Email" placeholder="Wpisz swój adres email" />
			<WTextInput onUpdate={generateOnUpdate("password")} containerStyle={style.textForm} label="Hasło" placeholder="Wpisz swoje hasło" isSecure={true} />
			<WCheckbox label="Zapamiętaj mnie" />
			<Text style={style.error}>{error}</Text>
		</View>
		<View>
			<WButton onClick={attemptLogin} disabled={loginButtonDisabled} containerStyle={style.loginButton} label="Zaloguj" />
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
		marginVertical: 10,
	},

	inputContainer: {
		height: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		// marginVertical: 5,
	},
	
	loginButton: {
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