import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './auth.css'

export default function Auth() {

    const [apiKey, setApiKey] = useState<string>('')
    const navigate = useNavigate();

    async function fetchData() {

        await axios.get('https://v3.football.api-sports.io/status',{
            headers:{
                "x-rapidapi-key": `${apiKey}`,
                "x-rapidapi-host": "v3.football.api-sports.io"
            }
        })
        .then(response =>{
            const userData = response.data.response.account
            const data = {
                email: userData.email,
                firstname: userData.firstname,
                key: apiKey
            }
            localStorage.setItem('@myTeam', JSON.stringify(data));
            navigate('/dashboard')
               
        })
        .catch((error)=>{
            console.log(error)
            alert('Key Invalida')
        })
        
    }

    return (
        <div className="container">
            <h1>Meu Time</h1>
            <h3>Veja Dados das melhores ligas do mundo!</h3>
            <div className="section_key">
                <h4>Coloque sua key para ter acesso a plataforma</h4>
                <div className="form">
                    <span>Key:</span>
                    <input type="text" placeholder="Digite sua Key" onChange={(e) => setApiKey(e.target.value)} />
                    <button onClick={fetchData}>Enviar</button>
                </div>
            </div>
            <p>Nao tem conta? Cadastre-se</p>
        </div>
    )
}