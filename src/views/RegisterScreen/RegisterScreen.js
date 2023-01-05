import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native'
import WTextInput from "../../components/WTextInput";
import WButton from "../../components/WButton";
import WCheckbox from "../../components/WCheckbox";
import StyleStatics from '../../StyleStatics';

import validateEmail from '../../helpers/validateEmail';
import validatePassword from '../../helpers/validatePassword';

import auth from '../../api/auth.js'
import session from '../../helpers/session';
import time from '../../helpers/time';
import WAlert from '../../components/WAlert';
import global from '../../helpers/global';

export default function RegisterScreen({ navigation }) {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ registerButtonDisabled, setRegisterButtonDisabled ] = useState(true);
    const [ resetTimer, setResetTimer ] = useState(null);
    const [ nextEmailTimer, setNextEmailTimer ] = useState(0);
    const [ emailCode, setEmailCode ] = useState("")
    const [ confirmEmailDisabled, setConfirmEmailDisabled ] = useState(true);
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

    useEffect( ( ) => {

        setConfirmEmailDisabled( Boolean(emailCode.length < 6) )

    }, [ emailCode ] )

    const popError = (err) => {
        global.popups["RegisterScreenError"].runPopup("Błąd", err.toString());
    }

    const popInfo = (info) => {
        global.popups["RegisterScreenError"].runPopup("Informacja", info);
    }

    useEffect(() => {
        setResetTimer(false);
        const interval = setInterval( () => {
            if ( nextEmailTimer > 0 ) setNextEmailTimer( last => last - 1000 );
        }, 1000)

        // alert( JSON.stringify(global.popups) )

        return () => clearInterval(interval);
    }, [resetTimer])

    const attemptRegister = async () => {    
		// alert("test")
		try {
			const data = await auth.requestRegister( JSON.parse(loginData) );
			if ( data.error ) {
				setError( data.error )
                return;
			}
            setModalVisible(true);

            setNextEmailTimer( data.nextEmailAvailableIn )

            setResetTimer(true);
            // await session.set(data)
		} catch(err) {
			setError(err.error)
		}
	}
 
    const resendEmail = async () => {
        try {
            const parsedData = JSON.parse( loginData )
            const result = await auth.resetEmailToken( parsedData["email"] );
            setNextEmailTimer( 46000 ); // 46 seconds
            popInfo( result.message )
            setResetTimer(true);
        } catch ( err ) {
            popError( err.error )
        }
    }

    const verifyEmail = async () => {
        try {
            const result = await auth.verifyEmail(JSON.parse(loginData).email, emailCode );
            popInfo( `${result.message}. Możesz się zalogować (Przekieruje cie za 3 sekundy)`)
            setTimeout(() => {
                navigation.navigate('Login');
            }, 3000)
            setResetTimer(true);
        } catch ( err ) {
            popError( err.error )
        }
    }

    const modalStyles = StyleSheet.create({
        view: {
            width: "100%",
            height: "100%",
            backgroundColor: 'rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        base: {
            width: "90%",
            height: 650,
            backgroundColor: StyleStatics.white,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
        header: {
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            padding: 20,
            paddingTop: 24,
            fontFamily: 'Poppins-Bold',
            fontSize: 20,
            color: StyleStatics.darkText,
        },

        subtext: {
            width: "80%",
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontSize: 14,
            color: StyleStatics.lightText, 
            padding: 5,
        },

        sendAgain: {
            width: "80%",
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            fontFamily: 'Poppins-SemiBold',
            fontSize: 14,
            color: StyleStatics.primary, 
            padding: 5,
            marginTop: 15,
        }
    })

    const hideMail = ( email ) => {
        return `${email.length > 0 ? email[0]+email[1]+email[2] : ''}***@${ email.length > 0 ? email.split("@")[1] : "gmail.com" }`
    }

    return (
        <View style={style.view}>
            <WAlert id={"RegisterScreenError"} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
            >
                <View style={modalStyles.view}>
                    <View style={modalStyles.base}>
                        <View style={{
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={modalStyles.header}>
                                Zweryfikuj adres e-mail
                            </Text>
                            <Text style={modalStyles.subtext}>
                                Na adres e-mail {'\n'}{ hideMail( JSON.parse(loginData)["email"] ) }
                                {'\n'} został wysłany kod.  Wprowadź go poniżej aby zweryfikować swoje konto
                            </Text>
                            <Text onPress={ nextEmailTimer > 0 ? null : resendEmail } style={modalStyles.sendAgain}> 
                                Nie dostałeś maila? {'\n'}
                                {nextEmailTimer > 0 ? `Poczekaj jeszcze ${time.prettyTimespan(nextEmailTimer, false)}` : `Wyślij ponownie`} 
                            </Text>
                        </View>
                        <View style={{
                            height: "40%",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <WTextInput 
                                val={emailCode}
                                setVal={setEmailCode}
                                placeholder={"Kod"} 
                                inputStyle={{
                                    width: "60%",
                                    textAlign: 'center',
                                }} 
                                additionalInputParams={{
                                    keyboardType: "numeric",
                                }}
                            />
                        </View>
                        <WButton disabled={confirmEmailDisabled} onClick={() => { verifyEmail() }} label={"Dalej"} containerStyle={{
                            width: "60%",
                        }}/>
                    </View>
                </View>
            </Modal>
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