import React, { useState } from "react";
import {View, ScrollView, Text, TouchableOpacity} from "react-native";

import {BorderlessButton, RectButton} from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Picker} from "@react-native-community/picker";

import Icon from "react-native-vector-icons/Feather";

import styles from "./styles";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";

import Api from "../../services/Api";

import {Proffy} from "../../components/TeacherItem";

export default function TeacherList(){
    const [filter, setFilter] = useState(true);

    const [timerPicker, setTimerPicker] = useState(false);

    const [materia, setMateria] = useState<React.ReactText>("Química");
    const [dayWeek, setDayWeek] = useState<React.ReactText>("0");
    const [hourDay, setHour] = useState(new Date());
    const [hourFormated, setHourFotmated] = useState("0:00");

    const [proffys, setProffys] = useState([]);

    function changeDayWeek(itemValue:React.ReactText){
        setDayWeek(itemValue);
    }

    function changeMateria(itemValue:React.ReactText){
        setMateria(itemValue);
    }

    function changeHour(event:any,selectedHour:any){
        setTimerPicker(false);
        selectedHour && (setHour(selectedHour), formatHour(selectedHour));
    }

    function formatHour(hour:Date){
        const minutesOfHour = hour.getMinutes();
        const minutes = minutesOfHour < 10 ? "0" + minutesOfHour : minutesOfHour;
        const formatedHour = hour.getHours() + ":" + minutes;
        setHourFotmated(formatedHour);
    }

    function changeFilterState(){
        setFilter(!filter);
        setTimerPicker(false);
    }

    function showTimePicker(){
        setTimerPicker(true);
    }

    async function requestApi(){
        const request = await Api.get("/classes", {
            params: {
                week_day: dayWeek,
                subject: materia,
                time: hourFormated
            }
        });
        setProffys(request.data);
        setFilter(false);
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis"
                FilterButton={(
                    <BorderlessButton onPress={changeFilterState}>
                        <Icon name="filter" color="#FFF" size={30}/>
                    </BorderlessButton>
                )}>
                    {filter && (
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>Matéria</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    style={styles.picker}
                                    mode="dialog"
                                    selectedValue={materia}
                                    onValueChange={changeMateria}
                                >
                                    <Picker.Item label="Química" value="Química"/>
                                    <Picker.Item label="Geografia" value="Geografia"/>
                                    <Picker.Item label="História" value="História"/>
                                    <Picker.Item label="Física" value="Física"/>
                                    <Picker.Item label="Ciências" value="Ciências"/>
                                </Picker>
                            </View>

                            <View style={styles.inputGroup}>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da semana</Text>
                                    <View style={styles.pickerContainer}>
                                        <Picker
                                            style={styles.picker}
                                            mode="dialog"
                                            selectedValue={dayWeek}
                                            onValueChange={changeDayWeek}
                                        >
                                            <Picker.Item label="Domingo" value="0"/>
                                            <Picker.Item label="Segunda" value="1"/>
                                            <Picker.Item label="Terça" value="2"/>
                                            <Picker.Item label="Quarta" value="3"/>
                                            <Picker.Item label="Quinta" value="4"/>
                                            <Picker.Item label="Sexta" value="5"/>
                                            <Picker.Item label="Sábado" value="6"/>
                                        </Picker>
                                    </View>
                                </View>

                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TouchableOpacity
                                        onPress={showTimePicker}
                                        style={[styles.pickerContainer, styles.time]}
                                    >
                                        <Text style={styles.picker}>{hourFormated}</Text>
                                        <Icon name="clock" color="#C1BCCC" size={20}/>
                                    </TouchableOpacity>
                                </View>
                                {timerPicker && <DateTimePicker
                                    value={hourDay}
                                    mode="time"
                                    onChange={changeHour}
                                />}
                            </View>

                            <RectButton onPress={requestApi} style={styles.submitButton}>
                                <Text style={styles.submitText}>Filtrar</Text>
                            </RectButton>
                    </View>
                    )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {proffys.map((proffy:Proffy) => {
                    return <TeacherItem key={proffy.id} proffy={proffy}/>
                })}
            </ScrollView>
        </View>
    );
}