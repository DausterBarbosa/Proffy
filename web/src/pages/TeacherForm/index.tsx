import React, {useState, FormEvent} from "react";

import {useHistory} from "react-router-dom";

import Api from "../../services/api";

import PageHeader from "../../components/PageHeader"
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";

import WarningIcon from "../../assets/images/icons/warning.svg"

import "./styles.css";

function TeacherForm(){
    const history = useHistory();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [bio, setBio] = useState("");

    const [subject, setSubject] = useState("default");
    const [cost, setCost] = useState("");

    const [scheduleItems, setScheduleItems] = useState([{week_day: -1, from: "", to: ""}]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {week_day: -1, from: "", to: ""}
        ]);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        Api.post("/classes", {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(()=>{
            alert("Cadastro realizado com sucesso!");
            history.push("/");
        }).catch(()=>{
            alert("Erro ao realizar cadastro!");
        });
    }

    function setScheduleItemValue(position:number, field:string, value:string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index)=> {
            if(index === position){
                return {...scheduleItem, [field]: value}
            }

            return scheduleItem
        });

        setScheduleItems(updatedScheduleItems);
    }

    return (
        <div id="page-teacher-form" className=".container">
            <PageHeader 
                title="Que incrível que você quer ensinar."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <form onSubmit={handleCreateClass}>
                <main>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name" 
                            label="Nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input 
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                        />

                        <TextArea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={[
                                {value: "default", label: "Selecione uma opção"},
                                {value: "Matemática", label: "Matemática"},
                                {value: "Física", label: "Física"},
                                {value: "Geografia", label: "Geografia"},
                                {value: "Música", label: "Matemática"},
                                {value: "Ciencias", label: "Ciencias"}
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo por sua hora de aula"
                            value={cost}
                            type="number"
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>

                        {scheduleItems.map((schedule, index) => {
                            return (
                                <div key={schedule.week_day} className="shedule-item">
                                    <Select 
                                        name="week_day" 
                                        label="Dia da semana"
                                        value={schedule.week_day}
                                        onChange={(e) => setScheduleItemValue(index, "week_day", e.target.value)}
                                        options={[
                                            {value: "-1", label: "Selecione uma opção"},
                                            {value: "0", label: "Domingo"},
                                            {value: "1", label: "Segunda-feira"},
                                            {value: "2", label: "Terça-feira"},
                                            {value: "3", label: "Quarta-feira"},
                                            {value: "4", label: "Quinta-feira"},
                                            {value: "5", label: "Sexta-feira"},
                                            {value: "6", label: "Sábado"}
                                        ]}
                                    />
                                    <Input 
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={schedule.from}
                                        onChange={(e) => setScheduleItemValue(index, "from", e.target.value)}
                                    />
                                    <Input 
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={schedule.to}
                                        onChange={(e) => setScheduleItemValue(index, "to", e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={WarningIcon} alt="Aviso importante"/>
                            !Importante <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </main>
            </form>
        </div>
        
    );
}

export default TeacherForm;