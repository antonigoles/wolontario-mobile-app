import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import { useState, useEffect } from 'react';
import users from '../../../../api/users';
import StyleStatics from '../../../../StyleStatics';
import PlusIcon from '../../../../../assets/icons/plus.svg'
import WLoadingAnimation from "../../../../components/WLoadingAnimation"
import skillLevels from '../../../../helpers/skillLevels';

export default function EditSkills({ navigation }) {
    const [ skills, setSkills ] = useState([])

    const styles = StyleSheet.create({
        view: {
            display: 'flex',
            alignItems: 'center',
        },

        listElement: {
            backgroundColor: StyleStatics.inputBlock,
            width: "90%",
            marginTop: 15,
            borderRadius: 10,
        },
    
        listTitle: {
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
            fontSize: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: "100%",
            maxWidth: "100%",
            flxe: 1,
            flexWrap: 'nowrap',
        }, 
    
        listTitleText: {
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
            fontSize: 16,
            marginLeft: 15,
        },
        
        listSubtitle: {
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.lightText,
            fontSize: 13,
            fontStyle: 'italic',
            fontWeight: 'bold',
        },
    
        listHeader: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: 16,
            paddingLeft: 10,
            paddingRight: 10,
            height: 80,
            alignItems: 'flex-start',
        },
    
        listDescription: {
            marginTop: -10,
            fontSize: 12,
            padding: 14,
            paddingTop: 15,
            textAlign: 'left',
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.lightText,
            borderTopColor: StyleStatics.darkText,
            borderTopWidth: 0.2,
        },
    })

    useEffect(() => {
        const loadSkills = async () => {
            try {
                const result = await users.fetchSkills()
                setSkills(result)
            } catch(err) {
                // alert(err);
            }
        };
        loadSkills();
    },[])
    return (
        <View style={styles.view}>
            <ScrollView style={{ width: "100%", height: "85%"}} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                { skills ? 
                    skills.map( (el,idx) => 
                        <Pressable 
                            onPress={ () => navigation.navigate('SkillEdit', { 
                                skillIndex: idx,
                                headerTitleOverwrite: "Edytuj",
                                skills: skills,
                                skillData: { 
                                    name: el.name,
                                    description: el.description,
                                    level: el.level
                                } 
                            }) }
                            key={idx} 
                            style={styles.listElement}
                        >
                            <View style={styles.listHeader}>
                                <Text numberOfLines={1} style={styles.listTitle}> {el.name} </Text>
                                <Text style={styles.listSubtitle}> {el.level} </Text>
                            </View>
                            { el.description.length > 0 ? 
                                <Text style={styles.listDescription}> {el.description} </Text> 
                            : ''}
                        </Pressable> 
                    )
                : <WLoadingAnimation /> }
            </ScrollView>
            <Pressable 
                onPress={ () => skills ? navigation.navigate('SkillEdit', { 
                    headerTitleOverwrite: "Dodaj",
                    skillIndex: skills.length, 
                    skills: skills,
                    skillData: { 
                        name: "",
                        description: "",
                        level: skillLevels.SKILL_LEVELS[0]
                    } 
                }) : '' }
                style={{
                    width: "100%",
                    height: "15%",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
            >
                <PlusIcon 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',  
                    }}
                    fill={ StyleStatics.primary } 
                    width={40}
                    height={40}
                    preserveAspectRatio="xMinYMin slice" 
                    viewBox="2 2 50 50"
                />
                <Text style={{
                    color: StyleStatics.primary,
                    fontSize: 20,
                    fontFamily: 'Poppins-Medium'
                }}>
                    Dodaj
                </Text>
            </Pressable>
        </View>
    )
}