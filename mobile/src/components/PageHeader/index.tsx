import React from "react";
import {View, Image, Text} from "react-native";

import {BorderlessButton} from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import BackIcon from "../../assets/images/icons/back.png"
import LogoImg from "../../assets/images/logo.png";

import styles from "./styles";

interface PageHeaderProps {
    title: string,
    FilterButton?: React.ReactNode
}

const PageHeader:React.FC<PageHeaderProps> = ({title, children, FilterButton}) => {
    const {navigate} = useNavigation();

    function handleGoBack(){
        navigate("LandingPage");
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={BackIcon} resizeMode="contain"/>
                </BorderlessButton>

                <Image source={LogoImg} resizeMode="contain"/>
            </View>

        <View style={styles.group}>
            <Text style={styles.title}>{title}</Text>
            {FilterButton}
        </View>

        {children}
        </View>
    );
}

export default PageHeader;