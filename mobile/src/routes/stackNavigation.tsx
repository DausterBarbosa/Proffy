import React from "react";

import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";

import LandingPage from "../pages/LandingPage";
import GiveClasses from "../pages/GiveClasses";

import Study from "./studyTabs";

const Stack = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="LandingPage"
                    component={LandingPage}
                />
                <Stack.Screen
                    name="GiveClasses"
                    component={GiveClasses}
                />
                <Stack.Screen
                    name="Study"
                    component={Study}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}