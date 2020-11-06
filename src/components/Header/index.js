import React from 'react';
import './styles.css';

export default ({black})=>{
    return(
        <header className={black ?"black" : ''}>
            <div className="header--logo">
                <img src="https://play-lh.googleusercontent.com/m8VKrn8dhqEWrQOmyYaAnij9zww1NlkdRkwL_xZDKpEPLNajyRBgOEQK732vAOaHQw"/>
            </div>
            <div className="header--user">
                <img src="https://image.freepik.com/vetores-gratis/perfil-de-avatar-de-homem-no-icone-redondo_24640-14044.jpg"/>
            </div>
        </header>
    )
}