import NavBar from "../../components/NavBar"
import './team.css'
import Players from "./players"
import Lineup from "./lineup"
export default function Team(){
    return(
        <div className="container_team">
            <NavBar/>
            <h2>Informações </h2>
            <h3>Lista de Jogadores</h3>
            
            <h3>A formação mais utilizada na Temporada</h3>
            <Lineup/>
            <h3>Resultados</h3>
        </div>
    )
}