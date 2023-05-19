import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import NavBar from "../../components/NavBar"
import './teams.css'
export default function Teams(){


    const {country} = useParams();
    const {id} = useParams()
    const {season} = useParams();
    const [apiKey, setApiKey] = useState<any>('')
    const [dataTeams , setDataTeams] = useState<any[]>([])
    
    useEffect(() => {
        async function loadSeasons() {
            
            const dataLocal: any = localStorage.getItem('@myTeam');
            const keyUSer = (JSON.parse(dataLocal))
            setApiKey(keyUSer.key)
            //console.log(apiKey)
            await axios.get(`https://v3.football.api-sports.io/teams`, {
                headers: {
                    "x-rapidapi-key": `${apiKey}`,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                },
                params:{
                    country: `${country}`,
                    league: `${id}`,
                    season: `${season}`
                }
            })
                .then(response => {
                    console.log(response.data.response)
                    setDataTeams(response.data.response)
                })
                .catch((error) => {
                    console.log(error)
                })

        }
        loadSeasons();
    }, [])

    return(
        <div className="container_teams">
            <NavBar/>
            <h2>Selecione o time</h2>
            {dataTeams.map((teams)=>{
                return(
                    <div key={teams.id}>
                        
                    </div>
                )
            })}
        </div>
    )
}