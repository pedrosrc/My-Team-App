import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import NavBar from '../../components/NavBar'

import './seasons.css'
export default function Seasons(){

    const {country} = useParams();
    const {id} = useParams()
    const [apiKey, setApiKey] = useState<any>('')
    const [dataSeason , setDataSeason] = useState<any[]>([])
    
    useEffect(() => {
        async function loadSeasons() {
            
            const dataLocal: any = localStorage.getItem('@myTeam');
            const keyUSer = (JSON.parse(dataLocal))
            setApiKey(keyUSer.key)
            //console.log(apiKey)
            await axios.get(`https://v3.football.api-sports.io/leagues?country=${country}`, {
                headers: {
                    "x-rapidapi-key": `${apiKey}`,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                },
                params:{
                    country: `${country}`,
                    id: `${id}`
                }
            })
                .then(response => {
                    console.log(response.data.response)
                    setDataSeason(response.data.response)
                })
                .catch((error) => {
                    console.log(error)
                })

        }
        loadSeasons();
    }, [])

    return(
        <div className="container_seasons">
            <NavBar/>
            <h2>Selecione a temporada</h2>
            <div className="section_season">
                {dataSeason.map((season)=>{
                    return(
                        <div key={season.id}>
                            <Link to={`/teams/${country}/${id}/${season.season.year}`}>
                                <strong>{season.season.year}</strong>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
       
    )
}