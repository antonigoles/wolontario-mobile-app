import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, RefreshControl, Pressable } from "react-native"
import PlusIcon from '../../../../../../../assets/icons/plus.svg';
import task from "../../../../../../api/task";
import config from "../../../../../../api/config";
import WLoadingAnimation from "../../../../../../components/WLoadingAnimation";
import colors from "../../../../../../helpers/colors";
import global from "../../../../../../helpers/global";
import session from "../../../../../../helpers/session";
import StyleStatics from "../../../../../../StyleStatics";
import WImage from "../../../../../../components/WImage"
import time from '../../../../../../helpers/time'
import TaskPopUp from "./TaskPopUp";

const getGroupID = (route) => {
    return route.params.displayGroup;
}
export default function GroupTasks({ navigation, route }) {
    const [ tasks, setTasks ] = useState(null);
    const [ refreshing, setRefeshing ] = useState(false);
    const [ displayMode, setDisplayMode ] = useState("groupMembers")
    const [ isUserAdmin, setIsUserAdmin ] = useState( route.params.isAdmin )
    const [ displayTaskVisible, setDisplayTaskVisible ] = useState(null)
    const [ displayTaskData, setDisplayTaskData ] = useState(null)
    const [ userId, setUserId ] = useState(null)

    const reloadTasks = async () => {
        try {
            const result = await task.fetchTasks( getGroupID(route) );
            setTasks(result.sort( (a,b) => a.deadLine - b.deadLine ))
            setRefeshing(false)
            const currentSession = await session.get()
            setUserId(currentSession.data.id)
        } catch (error) {
            global.raportError(error.toString())
        }
    }
    
    const onRefresh = async () => {
        setRefeshing(true)
        await reloadTasks();
    }

    useEffect(() => {
        reloadTasks()
    }, [])

    const iconOptions = {
        fill: StyleStatics.primary,
        width: 45,
        height: 45,
        preserveAspectRatio: "xMinYMin slice", 
        viewBox: "0 0 50 50",
    }
    
    const styles = StyleSheet.create({
        view: {
            width: "100%",
            height: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
        },
        addButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: 100,
        },
        addButtonFont: {
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
            color: StyleStatics.primary,
        },

        modeButtons: {
            width: "90%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            margin: 15,
        },
        buttonSelectable: {
            backgroundColor: StyleStatics.white,
            width: "48%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 24,
        },

        buttonSelectableLabel: {
            fontFamily: 'Poppins-SemiBold',
            color: StyleStatics.darkText,
        },
        buttonGroupMember: {
            backgroundColor: displayMode == 'groupMembers' ? StyleStatics.primary : StyleStatics.white,
        },
        labelGroupMember: {
            color: displayMode == 'groupMembers' ? StyleStatics.white : StyleStatics.darkText,
        },
        buttonAssigned: {
            backgroundColor: displayMode == 'assigned' ? StyleStatics.primary : StyleStatics.white,
        },
        labelAssigned: {
            color: displayMode == 'assigned' ? StyleStatics.white : StyleStatics.darkText,
        }

    })

    const setAssignedMode = () => setDisplayMode('assigned')
    const setGroupMembersMode = () => setDisplayMode('groupMembers')
    
    const displayTask = ( data ) => {
        setDisplayTaskData( data );
        setDisplayTaskVisible( true );
    }

    const createTask = () => {
        navigation.navigate("CreateTask", { displayGroup: getGroupID(route) })
    }

    return (
        <View style={styles.view}> 
            { displayTaskData && 
            <TaskPopUp 
                data={displayTaskData} 
                visible={displayTaskVisible} 
                setVisible={setDisplayTaskVisible} 
            />    
            }
            <View style={styles.modeButtons}>
                <Pressable onPress={setGroupMembersMode} style={[styles.buttonSelectable, styles.buttonGroupMember ]}>
                    <Text style={[styles.buttonSelectableLabel, styles.labelGroupMember]}>
                        Wszystko
                    </Text>
                </Pressable>
                <Pressable onPress={setAssignedMode} style={[styles.buttonSelectable, styles.buttonAssigned]}>
                    <Text style={[styles.buttonSelectableLabel, styles.labelAssigned]}>
                        Tylko moje
                    </Text>
                </Pressable>
            </View>
                {
                    tasks ? 
                        <ScrollView
                            contentContainerStyle={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            refreshControl={
                                <RefreshControl 
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        >
                            { tasks.length > 0 ? tasks.map( (e,idx) => 
                            <TaskListElement onDisplay={displayTask} data={e} key={idx} userId={userId} mode={displayMode} />) 
                            :
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Medium',
                                        marginTop: 50,
                                        width: "80%",
                                        textAlign: 'center',
                                        color: StyleStatics.lightText,
                                        fontSize: 20,
                                    }}
                                > 
                                    Wygląda na to że nie ma nic do zrobienia {'\n'} ... {'\n'}
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Medium',
                                            textAlign: 'center',
                                            color: StyleStatics.disabled,
                                            fontSize: 12,
                                        }}
                                    >
                                        (przeciągnij w dół aby odświeżyć)
                                    </Text>
                                </Text>
                            }
                        </ScrollView>
                    : <WLoadingAnimation />
                }
            { isUserAdmin &&
                <Pressable onPress={ createTask } style={styles.addButton}>
                    <PlusIcon { ...iconOptions }/>
                    <Text style={styles.addButtonFont}>Dodaj zadanie</Text>
                </Pressable>
            }
        </View>
    )
}



function TaskListElement({data, userId, mode, onDisplay }) {
    const styles = StyleSheet.create({
        view: {
            width: "90%",
            margin: 15,
        },
        header: {
            width: "100%",
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            backgroundColor: data.taskColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
        },
        categoryLabel: {
            textAlign: 'center',
            fontFamily: 'Poppins-Bold',
            fontSize: 12,
            // opacity: 0.6,
            color: colors.counterColor( data.taskColor ),
        },
        base: {
            width: "100%",
            backgroundColor: StyleStatics.white,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        textInfo: {
            padding: 10,
            paddingHorizontal: 15,
            paddingBottom: 20,
            // flexGrow: 3,
            width: "65%",
        },
        title: {
            fontFamily: 'Poppins-Bold',
            color: StyleStatics.darkText,
        },
        deadline: {
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.lightText,
            fontSize: 11,
        },
        deadlineTop: {
            margin: 5,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 12,
            color: StyleStatics.lightText,
        }
    })

    const users = data.assigned.map( user => { return {
        id: user.id,
        surname: user.surname,
        name: user.name,
        avatar: `${config.API_URL}/user/avatar/${user.id}` 
    }})

    const displayThisTask = ( ) => {
        onDisplay(data)
    } 

    if ( mode == 'assigned' && !data.assigned.some( user => user.id == userId ) ) return;
    return (
        <Pressable onPress={displayThisTask} style={styles.view} >
             <Text style={styles.deadlineTop}> { time.prettyTimespan( data.deadLine-Date.now(), false ) } </Text>
            <View style={styles.header}>
                <Text style={styles.categoryLabel}>{data.taskCategory}</Text>
            </View>
            <View style={styles.base}>
                <View style={styles.textInfo}>
                    <Text numberOfLines={1} style={styles.title}>{ data.title }</Text>
                    <Text numberOfLines={1} style={styles.deadline}>{ time.dateToString( new Date(data.deadLine) ) } </Text>
                </View>
                <RenderMiniPfps users={users} userId={userId} />
            </View>
        </Pressable>
    )
}


function RenderMiniPfps({ users, max, userId, onClick }) {
    const [ displayUser, setDisplayUser] = useState(null);
    const [ manyPeople, setManyPeople ] = useState(false);
    const [ includingMe, setIncludingMe ] = useState(false);
    useEffect(()=>{
        if ( users.length == 0 ) {
            setDisplayUser( null )
        } 
        if ( users.length > 0 ) {
            setDisplayUser( users[0] )
            const idx = users.findIndex( user => user.id == userId )
            if ( idx >= 0 ) {
                setDisplayUser( users[idx] )
                setIncludingMe( true ) 
            }
        }
        setManyPeople(Boolean(users.length > 1))

    },[])
    const styles = StyleSheet.create({
        view: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: 20,
            paddingHorizontal: 15,
            paddingBottom: 20,
            width: "35%",
        },
        image: {
            width: 30,
            height: 30,
            borderRadius: 9999,
        },
        nullImage: {
            width: 30,
            height: 30,
            backgroundColor: StyleStatics.lightText,
            borderRadius: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        nullImageQuestionMark: {
            fontFamily: 'Poppins-Bold',
            color: StyleStatics.white,
        },
        label: {
            marginTop: 4,
            fontFamily: 'Poppins-Bold',
            fontSize: 9,
            textAlign: 'center',
        }
    })

    return (
        <View style={styles.view}>
            { displayUser ? 
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <WImage externalStyle={styles.image} url={ displayUser.avatar } />
                { manyPeople && <Text style={{
                    marginLeft: 5,
                    marginTop: 2, 
                    fontSize: 18,
                    fontFamily: 'Poppins-SemiBold',
                    color: StyleStatics.darkText,
                    textAlign: 'center',
                }}
                >+</Text> }
            </View>
            :
            <View style={styles.nullImage}>
                <Text style={styles.nullImageQuestionMark}>?</Text>
            </View>
            }
            <Text style={styles.label}>
                { displayUser ? 
                    manyPeople ? 
                    `Wiele osób\n${includingMe?"(W tym ty)":""}`
                    :
                    includingMe ? "Ty" : `${displayUser.name} ${displayUser.surname}` 
                : "Nieprzydzielone" }
            </Text>
        </View>
    )
}