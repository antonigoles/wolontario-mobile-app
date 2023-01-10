import { View, Text, StyleSheet, Modal, ScrollView, StatusBar, Pressable } from "react-native";
import config from "../../../../../../api/config";
import colors from "../../../../../../helpers/colors";
import time from "../../../../../../helpers/time";
import StyleStatics from "../../../../../../StyleStatics";
import WImage from "../../../../../../components/WImage";
import WText from "../../../../../../components/WText";
import CheckMarkIcon from '../../../../../../../assets/icons/checkmark.svg'
import SendIcon from '../../../../../../../assets/icons/send.svg'
import CancelIcon from '../../../../../../../assets/icons/cancel.svg'
import { useState } from "react";


export default function TaskPopUp({ data, visible, setVisible }) {
    const [ subVisible, setSubVisible ] = useState(false)
    const styles = StyleSheet.create({
        view: {
            height: "100%",
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: 'rgba(0,0,0,0.4)'
            // backgroundColor: StyleStatics.background,
        },
        base: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: "90%",
            backgroundColor: StyleStatics.white,
            borderRadius: 24,
        },
        header: {
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: data.taskColor,
            padding: 10,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
        },
        content: {
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            // backgroundColor: 'black',
        },
        headerLabel: {
            textAlign: 'center',
            color: colors.counterColor(data.taskColor),
            fontFamily: 'Poppins-Bold',
        },
        title: {
            fontFamily: 'Poppins-Bold',
            color: StyleStatics.darkText,
            fontSize: 16,
            paddingTop: 10,
            paddingHorizontal: 15,
            width: "100%",
        },
        deadline: {
            fontFamily: 'Poppins-Medium',
            fontSize: 12,
            color: StyleStatics.lightText,
            paddingHorizontal: 15,
            width: "100%",
        },
        assignedAvatars: {
            width: "100%",
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            paddingHorizontal: 15,
        },
        information: {
            width: "90%",
            padding: 10,
        },
        infoBlock: {
            backgroundColor: StyleStatics.infoBlock,
            padding: 15,
            paddingVertical: 20,
            borderRadius: 24,
            // marginBottom: 25,
        },
        subTasks: {
            display: 'flex',
            alignItems: 'center',
            width: "100%",
            // height: "45%",
            padding: 15,
            // marginBottom: 10,
        },
        subTasksHeader: {
            paddingLeft: 15,
            alignSelf: 'flex-start',
            fontFamily: 'Poppins-Bold',
        },
        bottomButtons: {
            width: "100%",
            margin: 0,
            marginTop: 15,
        },
        sendRapport: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: "100%",
            backgroundColor: data.taskColor,
            display: 'flex',
            alignItems: 'center',
        },
        sendRapportLabel: {
            color: colors.counterColor(data.taskColor),
            fontFamily: 'Poppins-Medium',
            padding: 15,
        },
        optOut: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: "100%",
            backgroundColor: colors.darkenColor( data.taskColor, 0.727 ),
            display: 'flex',
            alignItems: 'center',
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
        },
        optOutLabel: {
            color: colors.counterColor( colors.darkenColor( data.taskColor, 0.727 ) ),
            fontFamily: 'Poppins-Medium',
            padding: 15,
        },
        showAllSubTasks: {
            marginTop: 5,
            color: StyleStatics.primary,
            fontFamily: 'Poppins-SemiBold',
            // padding: 5,
        }
    })

    const iconOptions = {
        fill: StyleStatics.primary,
        width: 25,
        height: 25,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }

    const subTasksModalStyles = StyleSheet.create({
        view: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            width: "100%",
            height: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        subTasks: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 35,
            borderRadius: 24,
        },
        hidebtn: {
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.primary,

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
            <Modal
                transparent={true}
                animationType="fade"
                visible={ subVisible }
                onRequestClose={() => {
                    setSubVisible(!subVisible);
                }} 
            >   
                <View style={subTasksModalStyles.view}>
                    <View style={subTasksModalStyles.subTasks}>
                        <ScrollView style={{ maxHeight: 450 }} >
                        { data.subTasks.map( (subTask, idx) => <SubTask key={idx} data={subTask} /> ) }
                        </ScrollView>
                        <Text style={subTasksModalStyles.hidebtn} onPress={()=>setSubVisible(false)}>
                            Schowaj
                        </Text>
                    </View>
                </View>
            </Modal>
            <StatusBar backgroundColor="rgba(0,0,0,0.4)" />
            <View style={styles.view}>
                <View style={styles.base}>
                    <View style={styles.header}>
                        <Text style={styles.headerLabel}>{data.taskCategory}</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            {data.title}
                        </Text>
                        <Text style={styles.deadline}>
                            { time.dateToString(new Date(data.deadLine) )}
                        </Text>
                        <View style={styles.assignedAvatars}>
                            {   data.assigned.map( (user,idx) => 
                                    <MiniAvatar key={idx} url={`${config.API_URL}/user/avatar/${user.id}`} /> 
                                ) 
                            }
                        </View>
                        <View style={styles.information}>
                            <WText 
                                fontSize={14}
                                style={styles.infoBlock} 
                                label="Informacje" 
                                content={data.description} 
                            />
                        </View>
                        { data.subTasks.length > 0 &&

                            <View style={styles.subTasks}>
                                <Text style={styles.subTasksHeader}> Podzadania </Text>
                                <ScrollView style={{ maxHeight: 150 }}>
                                { data.subTasks.map( (subTask, idx) => <SubTask key={idx} data={subTask} /> ) }
                                { data.subTasks.map( (subTask, idx) => <SubTask key={idx} data={subTask} /> ) }
                                { data.subTasks.map( (subTask, idx) => <SubTask key={idx} data={subTask} /> ) }
                                { data.subTasks.map( (subTask, idx) => <SubTask key={idx} data={subTask} /> ) }
                                { data.subTasks.map( (subTask, idx) => <SubTask key={idx} data={subTask} /> ) }
                                </ScrollView>
                                <Text onPress={()=>setSubVisible(true)} style={styles.showAllSubTasks}> Pokaż wszystkie </Text>
                            </View>
                        }
                    </View>
                    <View style={styles.bottomButtons}>
                        <View style={styles.sendRapport}>
                            <SendIcon 
                                { ...{
                                    ...iconOptions, 
                                    ...{fill: colors.counterColor(data.taskColor) }
                                } } 
                            />
                            <Text style={styles.sendRapportLabel}>Wyślij raport progresu</Text>
                        </View> 
                        <View style={styles.optOut}>
                            <CancelIcon 
                                { ...{
                                    ...iconOptions, 
                                    ...{fill: colors.counterColor(colors.darkenColor( data.taskColor, 0.727 )) }
                                } } 
                            />
                            <Text style={styles.optOutLabel}>Zrezygnuj z zadania</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

function SubTask({ data }) {
    const styles = StyleSheet.create({
        view: {
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            padding: 5,
            marginTop: 10,
        },
        checkbox: {
            width: 26,
            height: 26,
            backgroundColor: StyleStatics.inputBlock,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'

        },
        label: {
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.darkText,
            marginLeft: 10,
            marginTop: 2,
            width: "80%",
            textDecorationLine: data.isFinished ? 'line-through' : 'none',
        },
    })
    const iconOptions = {
        fill: StyleStatics.success,
        width: 25,
        height: 25,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }
    return (
        <View style={styles.view}>
            <View style={styles.checkbox}>
                { data.isFinished && <CheckMarkIcon {...iconOptions} /> }
            </View>
            <Text style={styles.label}>{data.description}</Text>
        </View>
    )
}

function MiniAvatar({ url }) {
    const styles = StyleSheet.create({
        view: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: 5,
        },
        image: {
            width: 40,
            height: 40,
            borderRadius: 9999,
        },
    })

    return (
        <View style={styles.view}>
            <WImage externalStyle={styles.image} url={ url } />
        </View>
    )
}