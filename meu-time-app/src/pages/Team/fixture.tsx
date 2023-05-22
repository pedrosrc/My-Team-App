import axios from "axios";
import { useEffect, useState} from "react"
import { useParams } from "react-router-dom";

export default function Fixture(){
    const { season } = useParams();
    const { list } = useParams();
    const { info } = useParams();
    const [apiKey, setApiKey] = useState<any>('')
    const [dataFixture, setDataFixture] = useState<any[]>([])
    useEffect(() => {
    async function loadFixture() {

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
                setDataFixture(response.data.response.fixtures)
                console.log(response.data.response.fixtures)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    loadFixture();
},[])
return(
    <div>
         {dataFixture.map((fixture) => {
                return(
                    <table key={fixture.id} className="section_fixture">
                        <tr>
                            <th>Total:</th>
                            <th>Vitórias:</th>
                            <th> Derrotas:</th>
                            <th>Empates:</th> 
                        </tr>
                        <tr>
                            <td>{fixture.wins.total}</td>
                            <td>{fixture.loses.total}</td>
                            <td>{fixture.played.total}</td>
                            <td>{fixture.draws.total}</td>
                        </tr>
                    </table>
                )
            })}
    </div>
)
}