import { View, Text, StyleSheet, ScrollView, Pressable, Modal, StatusBar } from "react-native";
import WTextForm from "../../../../../../components/WTextInput";
import StyleStatics from "../../../../../../StyleStatics";
import { useState } from "react";
import TrashIcon from '../../../../../../../assets/icons/trash.svg'

export default function CreateTask({}) {
    const [ addSubTaskVisible, setAddSubTaskVisible ] = useState(false)
    const [ subtasks, setSubTasks ] = useState([ 
        { "description": "Testowe podzadanko"},
        { "description": "Testowe podzadanko"}, 
        { "description": "Testowe podzadanko"}, 
        { "description": "Testowe podzadanko"},
    ]);

    const styles = StyleSheet.create({
        view: {
            height: "100%",
            width: "100%",
            display: 'flex',
            alignItems: 'center',
        },
        inputSubGroup: {
            marginTop: 15,
            width: "100%",
        },
        bottomButtons: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: "85%",
        },
        bottomButton: {
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.primary,
            fontSize: 20,
            padding: 15,
        },
        subTaskBox: {
            width: "100%",
            marginTop: 40,
            backgroundColor: StyleStatics.inputBlock,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            maxHeight: 400,
            marginBottom: 40,
        },
        subTasksHeader: {
            padding: 10,
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
            fontSize: 14,
            textAlign: 'center',
        },
        addSubTask: {
            padding: 10,
            paddingVertical: 20,
            fontFamily: 'Poppins-Bold',
            color: StyleStatics.primary,
            fontSize: 16,
            textAlign: 'center',
            borderTopColor: StyleStatics.lightText,
            borderTopWidth: 0.5,
            width: "80%",
            marginTop: 10,
        }
    })
    return (
        <View style={styles.view}>
            <AddSubTaskModal visible={addSubTaskVisible} setVisible={setAddSubTaskVisible} />
            <ScrollView contentContainerStyle={{ display: 'flex', alignItems: 'center' }}> 
                <WTextForm containerStyle={styles.inputSubGroup} label="Tytuł" placeholder="Tytuł zadania"/>
                <WTextForm 
                    containerStyle={styles.inputSubGroup}  
                    inputStyle={{ maxHeight: 220 }}
                    label="Opis" 
                    placeholder="Opis zadania"
                    additionalInputParams={{
                        multiline: true,
                        numberOfLines: 11,
                        maxLength: 512,
                    }}
                />
                <WTextForm 
                    containerStyle={styles.inputSubGroup} 
                    additionalInputParams={{ editable: false }} 
                    label="Do kiedy"
                />
                <View>
                    <WTextForm 
                        containerStyle={styles.inputSubGroup}
                        label="Kategoria" 
                        additionalInputParams={{ editable: false }}  
                    />
                </View>
                <View style={styles.subTaskBox}>
                    <Text style={styles.subTasksHeader}>Podzadania</Text>
                    <ScrollView>
                        { subtasks.map( (subtask, idx) => <SubTaskListElement key={idx} data={subtask} /> ) }
                    </ScrollView>
                    <Pressable onPressOut={()=>setAddSubTaskVisible(true)}>
                        <Text style={styles.addSubTask}>Dodaj</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <View style={styles.bottomButtons}>
                <Text style={styles.bottomButton}>Anuluj</Text>
                <Text style={styles.bottomButton}>Dodaj</Text>
            </View>
        </View>
    )
}

function AddSubTaskModal({ visible, setVisible, onAdd }) {
    const [ value, setValue ] = useState();
    const styles = StyleSheet.create({
        view: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            width: "100%",
            height: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        base: {
            width: "95%",
            // height: "50%",
            backgroundColor: StyleStatics.white,
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
        },
        bottomButtons: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: "85%",
        },
        bottomButton: {
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.primary,
            fontSize: 20,
            padding: 15,
        },
        inputGroup: {
            marginVertical: 25,
            marginHorizontal: 15,
        }
    })
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }} 
        >    
            <StatusBar backgroundColor={'rgba(0,0,0,0.4)'} barStyle="light-content" />
            <View style={styles.view}>
                <View style={styles.base}>  
                    <WTextForm 
                        val={value}
                        setVal={setValue}
                        containerStyle={styles.inputGroup} 
                        label="Treść" 
                        placeholder="Treść podzadania" 
                    />
                    <View style={styles.bottomButtons}>
                        <Pressable onPressOut={() => setVisible(false)}>
                            <Text style={styles.bottomButton}>Anuluj</Text> 
                        </Pressable>
                        <Pressable onPressOut={onAdd}>
                            <Text style={styles.bottomButton}>Dodaj</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
} 

function SubTaskListElement({ data, removeThis }) {
    const styles = StyleSheet.create({
        view: {
            margin: 5,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            // backgroundColor: 'black',
            justifyContent: 'space-between',
        },
        label: {
            width: "70%",
            fontFamily: 'Poppins-Medium'
        },
        removeButton: {
            borderLeftWidth: 1,
            backgroundColor: StyleStatics.error+`44`,
            borderLeftColor: StyleStatics.error,
            padding: 6,
        }
    })
    const iconOptions = {
        fill: StyleStatics.error,
        width: 35,
        height: 35,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }
    return (
        <View style={styles.view}>
            <Text numberOfLines={1} style={styles.label}>{ data.description }</Text>
            <Pressable onPressOut={removeThis} style={styles.removeButton}>
                <TrashIcon {...iconOptions}/>
            </Pressable>
        </View>
    )
}