import NavBar from "../../components/NavBar"
import './team.css'
import Players from "./players"
import Statistics from "./statistics"
import Lineup from "./lineup"
import Fixture from "./fixture"
export default function Team(){
    return(
        <div className="container_team">
            <NavBar/>
            <h2>Informações </h2>
            <h3>Lista de Jogadores</h3>
            <Players/>
            <h3>A formação mais utilizada na Temporada</h3>
            <Lineup/>
            <h3>Resultados na Temporada</h3>
            <Fixture/>
            <h3>Estatísticas</h3>
            <Statistics/>
        </div>
    )
}