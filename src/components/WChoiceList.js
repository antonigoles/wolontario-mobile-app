import { View, Text, StyleSheet, Pressable, ScrollView, TouchableHighlight  } from 'react-native';
import StyleStatics from '../StyleStatics';
import React from 'react'
import { useState  } from 'react';
import { CommonActions, TabActions } from '@react-navigation/native'; 




export default function WChoiceList(params) {
    const route = params.route
    const startingValue = route ? (route.params ? (route.params.initialSelected ? route.params.initialSelected : 0) : 0 ) : 0;
    const [ selected, setSelected ] = useState( startingValue )
    const [ pressedIn, setPressedIn ] = useState( false )
    const style = StyleSheet.create({
        listElement: {
            width: "100%",
            height: 80,
            fontSize: 18,
            fontFamily: 'Poppins-Medium',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        
        selectedListElement: {
            backgroundColor: StyleStatics.inputBlock,
            // fontWeight: 'bold',
        },

        listElementText: {
            fontSize: 18,
            fontFamily: 'Poppins-Medium',
        },

        bottomButton: {
            // backgroundColor: pressedIn ? 'white' : 'transparent',
        },

        bottomButtonText: {
            fontFamily: pressedIn ? 'Poppins-Bold' : 'Poppins-Medium'
        },
    })
    
    const data = params.route.params.data
    const listBuilderFunction = params.route.params.listBuilderFunction
    const previousNavigationState = params.route.params.previousState
    const previousRoute = params.route.params.previousRoute

    
    return (
        <View style={{
            width: "100%",
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            // alignItems: 'center',
        }}>
            <View>
                { listBuilderFunction ? 
                data.map( listBuilderFunction ) : 
                data.map( ( el, idx ) => {
                    return (
                        <Pressable onPress={ () => setSelected(idx) } key={idx} style={{ 
                            ...style.listElement, 
                            ...( selected == idx ? style.selectedListElement : {} ) 
                        }}>
                            <Text style={style.listElementText}>{el}</Text>
                        </Pressable>
                    )
                }) } 
            </View>
            <Pressable 
                onPressIn={ () => setPressedIn(true) }
                onPressOut={ () => setPressedIn(false) }

                onPress={ () => {
                    // params.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "WChoiceList"}] }));
                    // alert( JSON.stringify(previousNavigationState) )
                    // params.navigation.dispatch({
                    //     ...CommonActions.setParams({ user: 'Wojtek' }),
                    //     source: previousScreenRoute.key,
                    // });
                    previousNavigationState.routes = previousNavigationState.routes.map(
                        route => { 
                            if ( route.name == previousRoute ) 
                                route.params = { ...route.params, ...{ selected: selected } }
                            return route
                        }
                    ) 

                    // alert(JSON.stringify(previousNavigationState.routes))
                    params.navigation.dispatch({
                        ...CommonActions.reset(
                            previousNavigationState
                        )
                    });
                    
                    // // params.navigation.jumpTo( previousScreen, {
                    // //     selected: selected
                    // // })
                }}

                style={ { ...{
                    width: "100%",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 120,
                    backgroundColor: StyleStatics.background,
                }, ...style.bottomButton } }
            >
                <Text style={{...{
                    color: StyleStatics.primary,
                    fontFamily: 'Poppins-Medium',
                    fontSize: 20,
                }, ...style.bottomButtonText}}>
                    Wybierz
                </Text>
            </Pressable>
        </View>
    );
}


