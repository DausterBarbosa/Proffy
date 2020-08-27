import React, {useState, FormEvent} from "react";

import Api from "../../services/api";

import "./styles.css";

import PageHeader from "../../components/PageHeader";
import TeacherItem, {Teacher} from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";

function TeachersList(){
    const [subject, setSubject] = useState("");
    const [week_day, setWeek_day] = useState("");
    const [time, setTime] = useState("");
    const [teachers, setTeachers] = useState([]);

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        const searchTeacher = await Api.get("/classes", {
            params:{
                subject,
                week_day,
                time
            }
        });

        setTeachers(searchTeacher.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            {value: "Matemática", label: "Matemática"},
                            {value: "Física", label: "Física"},
                            {value: "Geografia", label: "Geografia"},
                            {value: "Música", label: "Matemática"},
                            {value: "Ciencias", label: "Ciencias"}
                        ]}
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => setWeek_day(e.target.value)}
                        options={[
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
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />

                    <button type="submit"> 
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    console.log(teacher);
                    return <TeacherItem key={teacher.id} teacher={teacher}/>;
                })}
            </main>
        </div>
    );
}

export default TeachersList;