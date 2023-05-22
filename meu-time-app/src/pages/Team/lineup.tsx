import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function Lineup(){

    const {season} = useParams();
    const {list} = useParams();
    const {info} = useParams();
    const [apiKey, setApiKey] = useState<any>('')
    const [dataLine, setDataLine] = useState<any[]>([])

    useEffect(() => {
        async function loadLineup() {
            
            const dataLocal: any = localStorage.getItem('@myTeam');
            const keyUSer = (JSON.parse(dataLocal))
            setApiKey(keyUSer.key)
            //console.log(apiKey)
            await axios.get(`https://v3.football.api-sports.io/teams/statistics`, {
                headers: {
                    "x-rapidapi-key": `${apiKey}`,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                },
                params:{
                    season: `${season}`,
                    league: `${list}`,
                    team: `${info}`
                }
            })
                .then(response => {
                    setDataLine(response.data)
                    console.log(response.data.response)
                })
                .catch((error) => {
                    console.log(error)
                })

        }
        loadLineup();
    }, [])
    return(
        <div className="container_lineup">
            {dataLine.map((lineup, index)=>{
                return(
                    <div key={index} className="section_lineup">
                        <strong>Nome: {lineup.lineups.formation}</strong>
                    </div>
                )
            })}
        </div>
    )
}