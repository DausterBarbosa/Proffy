import React, { useState } from "react";
import {View, ScrollView} from "react-native";

import {useFocusEffect} from "@react-navigation/native";

import AsyncStorage from "@react-native-community/async-storage";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Proffy } from "../../components/TeacherItem";

import styles from "./styles";

export default function Favorites(){
    const [favorites, setFavorites] = useState([]);

    async function handleFavorite(){
        const favorite = await AsyncStorage.getItem("favoriteProffy");
        if(favorite){
            const favoriteProffy = JSON.parse(favorite);
            setFavorites(favoriteProffy);
        }
    }

    useFocusEffect(() => {
        handleFavorite();
    });

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"/>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((proffy:Proffy) => {
                    return <TeacherItem key={proffy.id} proffy={proffy}/>
                })}
            </ScrollView>
        </View>
    );
}