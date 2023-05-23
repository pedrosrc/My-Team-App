import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import NavBar from '../../components/NavBar'

import './seasons.css'
export default function Seasons(){

    
    
    const [dataSeason , setDataSeason] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const {id} = useParams();
    const dataLocal: any = localStorage.getItem('@myTeam');
    const keyUSer = (JSON.parse(dataLocal))
   
    
    useEffect(() => {
        
        
        async function loadSeasons() {
        
            await axios.get(`https://v3.football.api-sports.io/leagues/seasons`, {
                headers: {
                    "x-rapidapi-key": `${keyUSer.key}`,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                },
                
            })
            .then((response)=>{
               setDataSeason(response.data.response.slice(0,15));
                setLoading(false); 
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        loadSeasons();
        return ()=>{

        }

    }, []);

    if(loading){
        return(
            <div className="container_seasons">
                <NavBar/>
                <h2>Carregando...</h2>
            </div>
        )
    }

    return(
        <div className="container_seasons">
            <NavBar/>
            <h2>Selecione a temporada</h2>
            <div className="section_season">
                {dataSeason.map((season, index)=>{
                    return(
                        <div key={index} className='season'>
                            <Link to={`/leagues/${id}/${season}`}>
                               <strong>Temporada:{season}/{season+1}</strong>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
       
    )
}