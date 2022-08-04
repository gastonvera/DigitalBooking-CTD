import React from 'react';

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "40vh",
        gap: "20px",
        flexDirection: "column"
    },
    img: {
        width: "80px",
        height: "80px",
        objectFit: "cover"
    }
}

const NothingHere = () => {
    return (
        <div style={styles.container}>
            <img src="http://cdn.onlinewebfonts.com/svg/img_253643.png" alt="carita desanimada" style={styles.img}/>
            <h2>Upsss! Nada por aquí.</h2>
        </div>
    )
}

export default NothingHere;