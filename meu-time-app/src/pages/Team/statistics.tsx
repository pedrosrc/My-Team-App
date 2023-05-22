import axios from "axios";
import { useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import { Chart } from "react-google-charts";


export default function Statistics() {

    const { season } = useParams();
    const { list } = useParams();
    const { info } = useParams();
    const [apiKey, setApiKey] = useState<any>('')
    const [statisticsData, setStatisticsData] = useState<any[]>([])

   
    useEffect(() => {
        async function loadStatistics() {

            const dataLocal: any = localStorage.getItem('@myTeam');
            const keyUSer = (JSON.parse(dataLocal))
            setApiKey(keyUSer.key)
            //console.log(apiKey)
            await axios.get(`https://v3.football.api-sports.io/teams/statistics`, {
                headers: {
                    "x-rapidapi-key": `${apiKey}`,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                },
                params: {
                    season: `${season}`,
                    league: `${list}`,
                    team: `${info}`
                }
            })
                .then((response) => {
                   
                    setStatisticsData(response.data.response.goals)
                    console.log(response.data.response.goals)
                })
                .catch((error) => {
                    console.log(error)
                })

        }
        loadStatistics();
    }, [])

    
    return (
        <div className="container_lineup">
            <h3>Resultados</h3>
            
            <h3>Estasticas</h3>
            <Chart
            chartType="PieChart"
            data={statisticsData}
            width={"100%"}
            height={"400px"}/>

        </div>
    )
}