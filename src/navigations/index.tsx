import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { authScreens, noAuthScreens, StackLoggedIn, StackNotLoggedIn } from './config'
import { navigationRef } from './navigationRef'
import { TransitionPresets } from '@react-navigation/stack'
import { useAuth } from '@context/AuthContext'

const screenOptions: any = {
    ...TransitionPresets.SlideFromRightIOS
}

function AppNavigations() {
    const {user} = useAuth();
    return (
        <>
            <NavigationContainer
                ref={navigationRef}
                key={!user ? 'SignUp' : 'Home'}
            >
                {
                    !user ?
                        (
                            <StackNotLoggedIn.Navigator
                                key={'SignUp'}
                                initialRouteName='SignUp'
                                screenOptions={screenOptions}
                            >
                                {
                                    noAuthScreens.map((screen, index) => (
                                        <StackNotLoggedIn.Screen {...screen} key={index} />
                                    ))
                                }
                            </StackNotLoggedIn.Navigator>
                        )
                        :
                        (
                            <StackLoggedIn.Navigator
                                screenOptions={screenOptions}
                            >
                                {authScreens.map((screen, index) => (
                                    <StackLoggedIn.Screen {...screen} key={index} />
                                ))}
                            </StackLoggedIn.Navigator>
                        )
                }
            </NavigationContainer>
        </>
    )
}

export default AppNavigations