import React from "react";
import {View, ImageBackground, Text} from "react-native";

import {useNavigation} from "@react-navigation/native";

import {RectButton} from "react-native-gesture-handler";

import giveClassesImg from "../../assets/images/give-classes-background.png";

import styles from "./styles";

export default function GiveClasses(){
    const {goBack} = useNavigation();

    function handleNavigateToLandingPage(){
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="contain"
                source={giveClassesImg}
                style={styles.content}
            >
                <Text style={styles.title}>Quer se tornar um Proffy?</Text>
                <Text style={styles.description}>
                    Para começar você deve se cadastras em nossa plataforma web.
                </Text>
            </ImageBackground>
            <RectButton onPress={handleNavigateToLandingPage} style={styles.button}>
                <Text style={styles.buttonText}>Tudo bem</Text>
            </RectButton>
        </View>
    );
}