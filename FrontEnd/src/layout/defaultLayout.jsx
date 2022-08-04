import React, { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/footer/Footer.jsx";
import Bot from '../components/chatBot/Bot';
import useWindowDimensions from '../hooks/useWindowDimension';
import { useStore } from '../store/StoreProvider';

const DefaultLayout = ({ children }) => {
    const [open, setOpen] = useState(false);
    const dimensions = useWindowDimensions();
    const { user } = useStore();
    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <div style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
            <Header />
            {children}
            {dimensions.width > 468 &&
            <img
                src='https://umni.bg/wp-content/uploads/2021/11/cropped-umni_icon_512.png'
                alt='chatbot'
                style={{ 
                    position: 'absolute', 
                    bottom: '42px', 
                    right: '17px', 
                    cursor: 'pointer', 
                    width: '40px', 
                    height: '40px',
                    display: (user.rol === "ROLE_USER") ? "block" : "none"
                 }} 
                onClick={handleOpen}
            />}
            {dimensions.width > 468 && open && (user.rol === "ROLE_USER") && <Bot handleOpen={handleOpen}/>}
            <Footer />
        </div>
    )
}

export default DefaultLayout;