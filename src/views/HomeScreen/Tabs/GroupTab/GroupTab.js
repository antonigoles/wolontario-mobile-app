import { View, Text, StyleSheet } from 'react-native'
import AnimatedTab from '../AnimatedTab';
import { useState } from 'react'
import StyleStatics from '../../../../StyleStatics';
import WButton from '../../../../components/WButton';
import group from '../../../../api/group';
import WImage from '../../../../components/WImage';
import config from '../../../../api/config';

export default function GroupTab({navigation}) {

    const [ groups, setGroups ] = useState([]); 

    const styles = StyleSheet.create({
        view: {
            width: "100%",
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        message: {
            textAlign: 'center',
            fontFamily: 'Poppins',
            color: StyleStatics.disabled,
            fontSize:  20,
        },

        messageHref: {
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
            color: StyleStatics.primary,
            fontSize:  20,
        },
        messageBox: {
            height: "85%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        listBox: {
            height: "85%",
            display: 'flex',
            alignItems: 'center',
        },

        listElemet: {
            marginTop: 15,
            width: 330,
            backgroundColor: StyleStatics.white,
            padding: 20,
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }
    })

    const reloadGroupList = async () => {
        const groupData = (await group.fetchGroups()).map( group => { 
            return {
                ...group,
                avatarUrl: `${config.API_URL}/group/avatar/${group.id}`
            }
        });
        setGroups( groupData )
    }

    useState(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            // TODO: Change this so it will refresh only if it wasn't refreshed for some time
            reloadGroupList();
        })

        return unsubscribe;
    },[])

    return (
        <AnimatedTab navigation={navigation}>
            <View style={styles.view}>
                { groups.length > 0 ?
                    <View style={styles.listBox}>
                        {groups.map( (group, idx) => {
                            return ( 
                                <View key={idx} style={styles.listElemet}>
                                    <WImage 
                                        externalStyle={{ width: 60, height: 60, borderRadius: 2999, }} 
                                        url={ group.avatarUrl }
                                    />
                                    <View style={{
                                        marginLeft: 15,
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Poppins-Bold',
                                            color: StyleStatics.darkText,
                                            fontSize: 15,
                                        }}>{group.name}</Text>
                                        <Text style={{
                                            fontFamily: 'Poppins',
                                            color: StyleStatics.darkText,
                                            fontSize: 15,
                                            marginTop: -5,
                                        }}>{group.orgName}</Text>
                                    </View>
                                </View> 
                            )
                        })}
                    </View>
                :
                    <View style={styles.messageBox}>
                        <Text style={styles.message}>
                        Wygląda na to że nie {'\n'}
                        należysz jeszcze do {'\n'}
                        żadnego wolontariatu....
                        </Text>
                        <Text style={styles.messageHref}>
                        Znajdź wolontariat
                        </Text>
                    </View>
                }
                <WButton 
                    onClick={()=>navigation.navigate("GroupRequests")} 
                    label="Zgłaszanie wolontariatu" 
                    baseColor={StyleStatics.white} 
                    labelColor={StyleStatics.primary} 
                />
            </View>
        </AnimatedTab>
    )
}