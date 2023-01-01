import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import WButton from '../../../../../components/WButton';
import WCheckbox from '../../../../../components/WCheckbox';
import WTextForm from '../../../../../components/WTextInput';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import time from '../../../../../helpers/time';
import StyleStatics from '../../../../../StyleStatics';
import grouprequest from '../../../../../api/grouprequest';


const fillZero = ( num ) => {
    let casted = num.toString()
    return casted.length == 1 ? '0'+casted : casted; 
}

const dateToString = (date) => {
    let dd = fillZero(date.getDate());
    let mm = fillZero(date.getMonth()+1);
    let yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`
}

export default function RequestForm({ navigation }) {
    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState(new Date())
    const [openDateFrom, setOpenDateFrom] = useState(false)
    const [openDateTo, setOpenDateTo] = useState(false)

    const [ title, setTitle ] = useState();
    const [ orgName, setOrgName ] = useState();
    const [ category, setCategory ] = useState();
    const [ location, setLocation ] = useState();
    const [ desc, setDesc ] = useState();
    const [ verDesc, setVerDesc ] = useState();
    const [ cert, setCert ] = useState(false);

    const [ errorText, setErrorText ] = useState("");

    const styles = StyleSheet.create({
        spacer: {
            marginTop: 15,
        }
    })

    const submit = async () => {
        const formData = {
            name: title,
            orgName: orgName,
            verificationDescription: verDesc,
            groupCategory: category,
            date: dateFrom.getTime(),
            endsOn: dateTo.getTime(),
            description: desc,
            certificateAfter: cert,
            location: location,
        }
        setErrorText("")
        for ( const [_, value] of Object.entries(formData) ) {
            if ( value == undefined || value == "" ) {
                // fail
                setErrorText("Nie wszystkie pola zostały uzupełnione poprawnie!")
                return;
            }
        }

        try {
            await grouprequest.submitRequest( formData );
            await navigation.goBack()
        } catch ( err ) {
            alert(err);
        }

    }

    return (
        <View>
            <ScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center' }}>
                <WTextForm val={title} setVal={setTitle} containerStyle={styles.spacer} label="Tytuł wolontariatu" placeholder="Tytuł wolontariatu"/>
                <WTextForm val={orgName} setVal={setOrgName} containerStyle={styles.spacer} label="Nazwa organizacji" placeholder="Nazwa organizacji" />
                <WTextForm val={category} setVal={setCategory} containerStyle={styles.spacer} label="Kategoria" placeholder="Kategoria"/>
                <WTextForm val={location} setVal={setLocation} containerStyle={styles.spacer} label="Lokalizacja" placeholder="Lokalizacja"/>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 300,
                }}>
                    <Pressable
                        onPress={ () => {
                            setOpenDateFrom(true);
                        }} 
                    >
                        <WTextForm 
                            additionalInputParams={{ editable: false }} 
                            containerStyle={styles.spacer} 
                            label="Kiedy się zaczyna"
                            isHalfSize={true}
                            val={dateToString(dateFrom)}
                        />
                        <DateTimePickerModal
                            isVisible={openDateFrom}
                            mode="date"
                            onConfirm={(date) => {
                                setDateFrom(date)
                                setOpenDateFrom(false)
                                if ( dateTo.getTime() - date.getTime() < 0 ) {
                                    setDateTo( date )
                                }
                                alert(  dateTo.getTime() - dateFrom.getTime() )
                            }}
                            onCancel={() => {
                                setOpenDateFrom(false)
                            }}
                        />
                    </Pressable>
                    <Pressable
                        onPress={ () => {
                            setOpenDateTo(true);
                        }} 
                    >
                        <WTextForm 
                            additionalInputParams={{ editable: false }} 
                            containerStyle={styles.spacer} 
                            label="Kiedy się kończy"
                            isHalfSize={true}
                            val={dateToString(dateTo)}
                        />
                        <DateTimePickerModal
                            isVisible={openDateTo}
                            mode="date"
                            onConfirm={(date) => {
                                setDateTo(date)
                                setOpenDateTo(false)
                            }}
                            onCancel={() => {
                                setOpenDateTo(false)
                            }}
                            minimumDate={ dateFrom }
                        />
                    </Pressable>
                </View>
                <Text style={[{
                    fontFamily: 'Poppins-SemiBold',
                }, styles.spacer]}>
                    Wydarzenie będzie trwać { time.prettyTimespan(dateTo.getTime()-dateFrom.getTime(), false) }
                </Text>
                <WTextForm 
                    containerStyle={styles.spacer} 
                    inputStyle={{
                        textAlignVertical: 'top',
                        maxHeight: 220,
                    }} 
                    label="Opis"
                    additionalInputParams={{
                        multiline: true,
                        numberOfLines : 15,
                        maxLength: 600,
                    }}
                    placeholder="Opis wydarzenia"
                    val={desc}
                    setVal={setDesc}
                />
                <WTextForm 
                    containerStyle={styles.spacer}
                    inputStyle={{
                        textAlignVertical: 'top',
                        maxHeight: 220,
                    }} 
                    label="Informacje potrzebne do weryfikacji wiarygodności"
                    additionalInputParams={{
                        multiline: true,
                        numberOfLines : 15,
                        maxLength: 600,
                    }}
                    placeholder="Informacje, które pomogą nam zweryfikować wiarygodność prośby. To może być np.
                strona internetowa wolontariatu i numer telefonu do osoby reprezentującej wolontariat, który także znajduje się na podanej stronie. "
                    val={verDesc}
                    setVal={setVerDesc}
                />
                <WCheckbox isChecked={cert} onChange={ () => setCert(true) } containerStyle={{...styles.spacer}} label="Organizacja zapewnia certyfikat dla wolontariuszy" />
                <View>
                    <Text style={{
                        padding: 15,
                        fontSize: 13,
                        fontFamily: 'Poppins',
                        color: StyleStatics.error,
                        textAlign: 'center',
                    }}>
                        W celu zapobiegania spamu, ograniczamy ilość możliwych jednoczesnych oczekujących zgłoszeń. (Jedno zgłoszenie) 
                    </Text>
                </View>
                
                <WButton onClick={submit} containerStyle={{
                    marginTop: 60,
                }} label="Wyślij"/>
                <View>
                    <Text style={{
                        marginTop: 20,
                        marginBottom: 20,
                        padding: 30,
                        fontSize: 13,
                        fontFamily: 'Poppins',
                        color: StyleStatics.error,
                        textAlign: 'center',
                    }}>
                        { errorText }
                    </Text>
                </View>

            </ScrollView>
        </View>
    )
}