import React, { useState, useEffect } from "react";
import {View, Image, Text, Linking} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

import { RectButton } from "react-native-gesture-handler";

import heartOutline from "../../assets/images/icons/heart-outline.png";
import unFavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsApp from "../../assets/images/icons/whatsapp.png";

import Api from "../../services/Api";

import styles from "./styles";

import {useFocusEffect} from "@react-navigation/native";

export interface Proffy {
    id: number,
    avatar: string,
    bio: string,
    cost: number,
    name: string,
    subject: string,
    whatsapp: string
}

interface PropsTeacherItem {
    proffy: Proffy
}

const TeacherItem:React.FC<PropsTeacherItem> = ({proffy}) => {
    const [favorited, setFavorited] = useState(false);

    async function handleWhatsappLinking(){
        Linking.openURL(`whatsapp://send?phone=${proffy.whatsapp}`);

        await Api.post("/connections", {
            user_id: proffy.id
        });
    }

    async function handleFavorite(){
        const favorites = await AsyncStorage.getItem("favoriteProffy");
        if(favorites){
            const parseFavorite = JSON.parse(favorites);
            const proffyIndex = parseFavorite.find(((favorite:Proffy) => favorite.id === proffy.id));
            if(proffyIndex){
                setFavorited(true);
            }
        }
    }

    async function handleNotFavorited(){
        if(favorited){
            const favorites = await AsyncStorage.getItem("favoriteProffy");
            const parseFavorite = JSON.parse(favorites!);
            const proffyIndex = parseFavorite.find(((favorite:Proffy) => favorite.id === proffy.id));
            if(!proffyIndex){
                setFavorited(false);
            }
        }
    }

    async function favoritedAction(){
        if(favorited){
            const favorites = await AsyncStorage.getItem("favoriteProffy");
            const parseFavorite = JSON.parse(favorites!);
            const proffyIndex = parseFavorite.findIndex(((favorite:Proffy) => {
                return favorite.id === proffy.id;
            }));
            parseFavorite.splice(proffyIndex, 1);
            await AsyncStorage.setItem("favoriteProffy", JSON.stringify(parseFavorite));
            setFavorited(false);
        }else{
            const favorites = await AsyncStorage.getItem("favoriteProffy");
            if(favorites){
                const parseFavorite = JSON.parse(favorites!);
                parseFavorite.push(proffy);
                await AsyncStorage.setItem("favoriteProffy", JSON.stringify(parseFavorite));
            }else{
                const parseFavorite = [];
                parseFavorite.push(proffy);
                await AsyncStorage.setItem("favoriteProffy", JSON.stringify(parseFavorite));
            }
            setFavorited(true);
        }
    }

    useEffect(() => {
        handleFavorite();
    }, []);

    useFocusEffect(() => {
        handleNotFavorited();
    });

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{uri: `${proffy.avatar}`}}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{proffy.name}</Text>
                    <Text style={styles.subject}>{proffy.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {proffy.bio}
                {"\n"}{"\n"}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {"   "}
                    <Text style={styles.priceValue}> R$ {proffy.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton onPress={favoritedAction} style={[styles.favoriteButton, favorited && styles.favorited]}>
                        {favorited
                        ? <Image source={unFavoriteIcon}/>
                        : <Image source={heartOutline}/>}
                    </RectButton>

                    <RectButton onPress={handleWhatsappLinking} style={styles.contactButton}>
                        <Image source={whatsApp}/>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;