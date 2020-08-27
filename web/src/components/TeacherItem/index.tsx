import React from "react";

import Api from "../../services/api";

import WhatsIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

export interface Teacher{
    id: number,
    avatar: string,
    bio: string,
    cost: number,
    name: string,
    whatsapp: string,
    subject: string,
}

interface TeacherItemProps {
    teacher: Teacher,
}

const TeacherItem:React.FC<TeacherItemProps> = ({teacher}) => {
    function createConnection(){
        Api.post("/connections", {
        user_id: teacher.id
    });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt="Joseph Stalin"/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>
                {teacher.bio}
                <br/><br/>
                
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a
                    href={` https://wa.me/${teacher.whatsapp}`}
                    onClick={createConnection}
                    target="_blank"
                >
                    <img src={WhatsIcon} alt="WhatsIcon"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;