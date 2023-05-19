import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import './leagues.css'

export default function Leagues(){

    const {id} = useParams();
    const [apiKey, setApiKey] = useState<any>('')

    useEffect(() => {
        async function loadLeagues() {
            
            const dataLocal: any = localStorage.getItem('@myTeam');
            const keyUSer = (JSON.parse(dataLocal))
            setApiKey(keyUSer.key)
            //console.log(apiKey)
            await axios.get(`https://v3.football.api-sports.io/leagues`, {
                headers: {
                    "x-rapidapi-key": `${apiKey}`,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                },
                params:{
                    code: `${id}`
                }
            })
                .then(response => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })

        }
        loadLeagues();
    }, [])

    return(
        <div className="container_leagues">
            <NavBar/>
            <h2>Selecione a Liga</h2>
        </div>
    )
}