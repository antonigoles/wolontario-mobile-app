import { View, Text, StyleSheet, ScrollView } from 'react-native';
import WButton from '../../../../../components/WButton';
import WCheckbox from '../../../../../components/WCheckbox';
import WTextForm from '../../../../../components/WTextInput';

export default function RequestForm({}) {
    const styles = StyleSheet.create({
        spacer: {
            marginTop: 15,
        }
    })
    return (
        <View>
            <ScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center', height: "220%", }}>
                <WTextForm containerStyle={styles.spacer} label="Tytuł wolontariatu"/>
                <WTextForm containerStyle={styles.spacer} label="Nazwa organizacji"/>
                <WTextForm containerStyle={styles.spacer} label="Kategoria"/>
                <WTextForm containerStyle={styles.spacer} label="Kiedy się zaczyna"/>
                <WTextForm containerStyle={styles.spacer} label="Kiedy się kończy"/>
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
                />
                <WCheckbox containerStyle={{...styles.spacer}} label="Organizacja zapewnia certyfikat dla wolontariuszy" />
                <WButton containerStyle={{
                    marginTop: 60,
                }} label="Wyślij"/>
            </ScrollView>
        </View>
    )
}