import React from "react";
import {StatusBar} from "react-native";

import StackNavigation from "./routes/stackNavigation";

export default function App(){
    return (
        <>
            <StatusBar translucent backgroundColor={"transparent"}/>
            <StackNavigation/>
        </>
    );
}