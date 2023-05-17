import NavBar from "../../components/NavBar"
import axios from "axios"

import {useState, useEffect} from 'react'
export default function Dashboard(){

    const [apiKey, setApiKey] = useState<any>()
    const [dados, setDados] = useState<any[]>([])

    useEffect(()=>{
        async function loadData() {

            const dataLocal:any = localStorage.getItem('@myTeam');
            const keyUSer = (JSON.parse(dataLocal))
            setApiKey(keyUSer.key)
            await axios.get('https://v3.football.api-sports.io/countries',{
                headers:{
                    "x-rapidapi-key": `${apiKey}`,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                }
            })
            .then(response=>{
                setDados(response.data)
                console.log(dados)
            })
            .catch((error)=>{
                console.log(error)
            })
            
        }
        loadData();
    },[])
    


    return(
        <div>
            <NavBar/>
            <h1>Selecione o país da liga que deseja</h1>
        </div>
    )
}