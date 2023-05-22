import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import './leagues.css'

export default function Leagues(){

    const {season} = useParams();
    const {id} = useParams();
    const [apiKey, setApiKey] = useState<any>('')
    const [dataLeague, setDataLeague] = useState<any[]>([])

    useEffect(() => {
        async function loadLeagues() {
            
            const dataLocal: any = localStorage.getItem('@myTeam');
            const keyUSer = (JSON.parse(dataLocal))
            setApiKey(keyUSer.key)
            await axios.get(`https://v3.football.api-sports.io/leagues?country=${id}`, {
                headers: {
                    "x-rapidapi-key": `${apiKey}`,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                },
                params:{
                    country: `${id}`,
                    season: `${season}`
                }
            })
                .then(response => {
                    setDataLeague(response.data.response)
                    console.log(response.data.response)
                })
                .catch((error) => {
                    console.log(error)
                })

        }
        loadLeagues();
    }, [dataLeague])

    return(
        <div className="container_leagues">
            <NavBar/>
            <h2>Selecione a Liga</h2>
            <div className="section_leagues">
                {dataLeague.map((league)=>{
                    return(
                        <div key={league.id} className="league">
                            <Link to={`/teams/${id}/${season}/${league.league.id}`}>
                                <img src={league.league.logo} alt="Logo da liga" />
                                <strong>{league.league.name}</strong>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}