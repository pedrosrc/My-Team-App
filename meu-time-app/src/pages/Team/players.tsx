import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import './team.css'
export default function Players(){

    
    const {season} = useParams();
    const {list} = useParams();
    const {info} = useParams();
    const [dataPlayers, setDataPlayers] = useState<any[]>([])
    const dataLocal: any = localStorage.getItem('@myTeam');
    const keyUSer = (JSON.parse(dataLocal))

    useEffect(() => {
        async function loadPlayers() {
             
            await axios.get(`https://v3.football.api-sports.io/players`, {
                headers: {
                    "x-rapidapi-key": `${keyUSer.key}`,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                },
                params:{
                    season: `${season}`,
                    league: `${list}`,
                    team: `${info}`
                }
            })
                .then(response => {
                    setDataPlayers(response.data.response)
                })
                .catch((error) => {
                    console.log(error)
                })

        }
        loadPlayers();
    }, [])
    
    return(
        <div className="container_player">
            {dataPlayers.map((player, index)=>{
                return(
                    <div key={index} className="section_player">
                        <img src={player.player.photo} alt="Foto do Jogador" />
                        <strong>Nome: {player.player.name}</strong>
                        <p>Idade: {player.player.age}</p>
                        <p>Nacionalidade: {player.player.nationality}</p>

                    </div>
                )
            })}
        </div>
    )
}