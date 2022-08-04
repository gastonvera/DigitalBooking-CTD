import React, { useRef, useEffect } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import WikipediaSearch from './WikipediaSearch.jsx';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Bot.css";

const theme = {
    background: '#f5f8fb',
    headerBgColor: 'var(--primary)',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: 'var(--primary)',
    botFontColor: '#fff',
    userBubbleColor: '#0cb3c9',
    userFontColor: '#fff',
}


const Bot = ({ handleOpen }) => {
    const refOne = useRef(null)

    const hiddenOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            handleOpen();
        }
    }

    useEffect(() => {
        document.addEventListener("click", hiddenOnClickOutside, true)
    }, []);

    return (
        <div className='gv-bot-container' ref={refOne}>
            <div style={{position: "relative"}}>
                <ThemeProvider theme={theme}>
                    <ChatBot
                        steps={[
                            {
                                id: "1",
                                message: "Hola! ¿Cómo es tu nombre?",
                                trigger: "2"
                            },
                            {
                                id: "2",
                                user: true,
                                validator: (value) => {
                                    if (/^[A-Z]{1}[a-z]{2,15}$/.test(value)) {
                                        return true;
                                    }
                                    else {
                                        return 'No parece un nombre...';
                                    }
                                },
                                trigger: "3"
                            },
                            {
                                id: "3",
                                message: "Hola querido {previousValue}, ¡Encantado de conocerte!",
                                trigger: "4"
                            },
                            {
                                id: "4",
                                message: "¿Necesitas ayuda en algo?",
                                trigger: "5"
                            },
                            {
                                id: "5",
                                options: [
                                    { value: "y", label: "Yes", trigger: "6A" },
                                    { value: "n", label: "No", trigger: "6B" },
                                ]
                            },
                            {
                                id: "6A",
                                message: "Great! Tell me what are you looking for...",
                                trigger: "seleccion"
                            },
                            {
                                id: "6B",
                                message: "Im sorry if I cannot be of help to you. See you later",
                                end: true
                            },
                            {
                                id: "seleccion",
                                options: [
                                    { value: "f", label: "Front-End", trigger: "7A" },
                                    { value: "b", label: "Back-End", trigger: "7B" },
                                ]
                            },
                            {
                                id: "7A",
                                message: "I see you like Front-End programming! Which of these frameworks would you like to know more about?",
                                trigger: "seleccionFront"
                            },
                            {
                                id: "7B",
                                message: "I see you like Back-End programming! Which of these frameworks would you like to know more about?",
                                trigger: "seleccionBack"
                            },
                            {
                                id: "seleccionFront",
                                options: [
                                    { value: "Angular_(framework)", label: "Angular", trigger: "9" },
                                    { value: "React", label: "React", trigger: "9" },
                                    { value: "Vue.js", label: "Vue.js", trigger: "9" },
                                ]
                            },
                            {
                                id: "seleccionBack",
                                options: [
                                    { value: "Spring_Framework", label: "Spring", trigger: "9" },
                                    { value: "Laravel", label: "Laravel", trigger: "9" },
                                    { value: ".NET_Core", label: ".Net Core", trigger: "9" },
                                ]
                            },
                            {
                                id: "9",
                                component: <WikipediaSearch />,
                                asMessage: true,
                                trigger: "preguntaVuelta"
                            },
                            {
                                id: "preguntaVuelta",
                                message: "Do you need to know anything else?",
                                trigger: "respuestaVuelta",
                            },
                            {
                                id: "respuestaVuelta",
                                options: [
                                    { value: "y", label: "Yes", trigger: "6A" },
                                    { value: "n", label: "No", trigger: "6B" },
                                ],
                            }
                        ]}
                    />
                </ThemeProvider>
                <FontAwesomeIcon onClick={handleOpen} icon={faXmark} style={{ position: "absolute",fontSize:"1.5rem", color: "#fff", right: "15px", top: "10px", zIndex: 999, cursor: "pointer" }} />
            </div>
        </div>
    )
}

export default Bot