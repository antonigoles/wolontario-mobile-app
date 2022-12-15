import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import WTextInput from "../../components/WTextInput";
import WButton from "../../components/WButton";
import WCheckbox from "../../components/WCheckbox";
import StyleStatics from '../../StyleStatics';

export default function RegisterScreen({ navigation }) {
    const [ registerButtonDisabled, setRegisterButtonDisabled ] = useState(true);

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
                    <WTextInput isHalfSize={true} containerStyle={{...style.textForm, ...style.nameForm }} label="Imie" placeholder="Wpisz swoje imie" />
                    <WTextInput isHalfSize={true} containerStyle={{...style.textForm, ...style.nameForm }} label="Nazwisko" placeholder="Wpisz swoje nazwisko" />
                </View>
                
                <WTextInput containerStyle={style.textForm} label="Email" placeholder="Wpisz swój adres email" isSecure={true} />
                <WTextInput containerStyle={style.textForm} label="Hasło" placeholder="Wpisz swoje hasło" isSecure={true} />
                <WTextInput containerStyle={style.textForm} label="Potwierdź Hasło" placeholder="Potwierdź swoje hasło" isSecure={true} />
                <WCheckbox onChange={() => { }} label="Akceptuje warunki korzystania z serwisu" />
            </View>
            <View>
            <WButton disabled={registerButtonDisabled} containerStyle={style.registerButton} label="Stwórz konto" />
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
	}
})