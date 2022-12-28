import { View, StyleSheet, Text, ScrollView, Pressable, Alert } from 'react-native'
import { useState, useEffect } from 'react';
import WTextInput from '../../../../components/WTextInput';
import StyleStatics from '../../../../StyleStatics';
import skillLevels from '../../../../helpers/skillLevels';
import users from '../../../../api/users';

export default function SkillEdit({ route, navigation }) {
    const [ skillLevel, setSkillLevel ] = useState( skillLevels.skillLevelToIndex(route.params.skillData.level) )
    const [ skillIndex, setSkillIndex ] = useState(0)
    const [ description, setDescription ] = useState(null)
    const [ name, setName ] = useState(null)

    const styles = StyleSheet.create({
        view: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            flexDirection: 'column',
        },
        spacer: {
            marginTop: 10,
        },
        bottomButton: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
            color: StyleStatics.primary,
        },
        bottomContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: "80%",
            height: '10%',
        }
    })

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            const rt = navigation.getState().routes.find( e => e.name == "SkillEdit" )
            // alert(rt.params.selected)
            const sv =  rt.params.selected == undefined ? skillLevel : rt.params.selected;
            setSkillLevel( sv )
            setSkillIndex( rt.params.skillIndex )
            setDescription( oldDescription => oldDescription ? oldDescription : rt.params.skillData.description )
            setName( oldName => oldName ? oldName : rt.params.skillData.name )
        })
        return unsubscribe;
    }, [navigation])

    const goBack = () => {
        navigation.goBack()
    }

    const deleteSkill = async () => {
        if ( route.params.skills.length <= skillIndex ) {
            return goBack()
        };
        try {
            await users.deleteSkill( skillIndex, route.params.skills )
            setDescription(null)
            setName(null)
            return goBack()
        } catch ( err ) {
            alert(err)
        }
    }

    const saveSkill = async () => {
        try {
            
            if ( name.length < 3 || ( description.length != 0 && description.length < 8)  ) {
                Alert.alert("Złe dane", "Nazwa musi mieć więcej niż 3 znaki. Opis, jeżeli został wprowadzony, musi mieć więcej niż 8 znaków")
                return;
            }

            if ( route.params.skills.length <= skillIndex ) {
                await users.addSkill( {
                    name: name,
                    description: description,
                    level: skillLevels.SKILL_LEVELS[skillLevel]
                }, route.params.skills )
            } else {
                await users.updateSkill( skillIndex, {
                    name: name,
                    description: description,
                    level: skillLevels.SKILL_LEVELS[skillLevel]
                }, route.params.skills )
            }
            setDescription(null)
            setName(null)
            return goBack()
        } catch ( err ) {
            alert(err)
        }
    }

    return (
        <View style={styles.view}>
            <View>
                <WTextInput 
                    containerStyle={ styles.spacer } 
                    placeholder={"Nazwa"}
                    label={"Nazwa"} 
                    val={name}
                    setVal={setName}
                />
                <WTextInput 
                    containerStyle={ styles.spacer }
                    required={false}
                    inputStyle={{
                        textAlignVertical: 'top',
                        maxHeight: 220,
                    }}
                    placeholder={"Krótki opis (nieobowiązkowe)"}
                    additionalInputParams={{
                        multiline: true,
                        numberOfLines: 12,
                        maxLength: 255,
                        maxHeight: 220,
                    }}
                    label={"Krótki opis"} 
                    val={description}
                    setVal={setDescription}

                />
                <Pressable 
                    onPress={
                        () => {
                            navigation.jumpTo("WChoiceList", {
                                data: skillLevels.SKILL_LEVELS,
                                initialSelected: skillLevel,
                                previousRoute: route.name,
                                previousState: navigation.getState()
                            })
                        }
                    }>
                    <WTextInput 
                        containerStyle={ styles.spacer } 
                        label={"Szacowany poziom"} 
                        val={ skillLevels.SKILL_LEVELS[skillLevel] }
                        setVal={ setSkillLevel }
                        additionalInputParams={{
                            editable: false,
                        }}
                    /> 
                </Pressable>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable onPress={
                    () => { 
                        Alert.alert("Potwierdź decyzje", "Na pewno chcesz usunąć?", [
                            { text: "Anuluj", onPress: null, style: 'cancel' },
                            { text: "Usuń", onPress: () => deleteSkill()  }
                        ])
                    }
                }>
                    <Text style={styles.bottomButton}>Usuń</Text>
                </Pressable> 
                <Pressable onPress={
                    () => { saveSkill() }
                }>
                    <Text style={styles.bottomButton}>Zapisz</Text>
                </Pressable> 
            </View>
        </View>
    )
}