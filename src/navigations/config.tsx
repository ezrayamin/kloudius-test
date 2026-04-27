import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ComponentProps } from "react";
import { AuthStack, NoAuthStack } from "./types";
import Login from "@screens/Login"
import SignUp from "@screens/SignUp";
import Home from "@screens/Home";
import { NavigationManager } from "./navigationRef";

export const StackNotLoggedIn = createNativeStackNavigator<NoAuthStack>();
export const StackLoggedIn = createNativeStackNavigator<AuthStack>();

export const noAuthScreens: ComponentProps<(typeof StackNotLoggedIn)['Screen']>[] = [
    {
        name: 'Login',
        component: Login,
    },
    {
        name: 'SignUp',
        component: SignUp,
    },
]
export const authScreens: ComponentProps<(typeof StackLoggedIn)['Screen']>[] = [
    {
        name: 'Home',
        component: Home,
    },
]

export const {
    navigate, pop, popToTop, push, replace, reset, getCurrentRoute,
} = NavigationManager<NoAuthStack & AuthStack>()