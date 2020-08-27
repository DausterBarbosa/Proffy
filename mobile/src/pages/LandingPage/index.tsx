import React, {useEffect, useState} from "react";
import {View, Image, Text} from "react-native";

import Api from "../../services/Api";

import {useNavigation} from "@react-navigation/native";

import {RectButton} from "react-native-gesture-handler";

import styles from "./styles";

import LandingImg from "../../assets/images/landing.png";
import studyIcon from "../../assets/images/icons/study.png";
import giveClassesIcon from "../../assets/images/icons/give-classes.png";
import heartIcon from "../../assets/images/icons/heart.png";

export default function LandingPage(){
    const [totalConnections, setTotalConnections] = useState(0);

    const {navigate} = useNavigation();

    function handleNavigateToGiveClassesPage(){
        navigate("GiveClasses");
    }

    function handleNavigateToStudyPage(){
        navigate("Study");
    }

    useEffect(() => {
        async function handleTotalConnections(){
           const connections = await Api.get("/connections");
           setTotalConnections(connections.data.total);
        }

        handleTotalConnections();
    }, [])

    return (
        <View style={styles.container}>
            <Image source={LandingImg} style={styles.banner}/>

            <Text style={styles.title}>
                Seja bem-vindo, {"\n"}

                <Text style={styles.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton
                    onPress={handleNavigateToStudyPage}
                    style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon}/>

                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton
                    onPress={handleNavigateToGiveClassesPage}
                    style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon}/>

                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {" "}
                <Image source={heartIcon}/>
            </Text>
        </View>
    );
}