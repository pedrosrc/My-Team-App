import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function Fixture() {
    const { season } = useParams();
    const { list } = useParams();
    const { info } = useParams();
    const [dataFixture, setDataFixture] = useState<any[]>([{
        fixtures: {
            draws: { total: 0 },
            wins: { total: 13 },
            losses: { total: 10 }
        }
    }])
    const [loading, setLoading] = useState(false)
    const dataLocal: any = localStorage.getItem('@myTeam');
    const keyUSer = (JSON.parse(dataLocal))

    useEffect(() => {

        async function loadFixture() {
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
                    setDataFixture(response.data.response)
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error)
                })

        }
        loadFixture();
    }, [])

    if (loading) {
        return (
            <div className="section_fixture">
                <h2>Carregando...</h2>
            </div>
        )
    }

    return (
        <div className="container_player">
            {dataFixture.map((fixture, index) => {
                return (
                    <table key={index} className="section_fixture">
                        <thead>
                            <tr>
                                <th>Total:</th>
                                <th>Vitórias:</th>
                                <th> Derrotas:</th>
                                <th>Empates:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{fixture.fixtures.wins.total}</td>
                                <td>{fixture.fixtures.loses.total}</td>
                                <td>{fixture.fixtures.played.total}</td>
                                <td>{fixture.fixtures.draws.total}</td>
                            </tr>
                        </tbody>



                    </table>
                )
            })}
        </div>
    )
}