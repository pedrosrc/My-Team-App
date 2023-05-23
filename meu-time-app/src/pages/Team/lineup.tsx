import axios from "axios";
import { useEffect, useState} from "react"
import { useParams } from "react-router-dom";

export default function Lineup(){
    const { season } = useParams();
    const { list } = useParams();
    const { info } = useParams();
    const dataLocal: any = localStorage.getItem('@myTeam');
    const keyUSer = (JSON.parse(dataLocal))
    const [dataLine, setDataLine] = useState<any[]>([])

    useEffect(() => {

        async function loadLineup() {
            await axios.get(`https://v3.football.api-sports.io/teams/statistics`, {
                headers: {
                    "x-rapidapi-key": `${keyUSer.key}`,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                },
                params: {
                    season: `${season}`,
                    league: `${list}`,
                    team: `${info}`
                }
            })
                .then((response) => {
                    setDataLine(response.data.response.lineups)
                    console.log(response.data.response.lineups)
                })
                .catch((error) => {
                    console.log(error)
                })

        }
        loadLineup();
    }, [])
    
    return(
        <div>
             {dataLine.map((lineup, index) =>{
                const maxPlayed:any = Math.max(...lineup.map((lineup:any) => lineup.played));
                const maxPlayedLineup:any = lineup.find((lineup:any) => lineup.played === maxPlayed);
                console.log(maxPlayedLineup.formation)
                return (
                    <div key={index} className="section_lineup">
                        <strong>Formação: {maxPlayedLineup.formation}</strong>
                    </div>
                )
            })}
        </div>
    )
}