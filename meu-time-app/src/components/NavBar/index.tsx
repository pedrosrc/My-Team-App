import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {RxExit} from 'react-icons/rx'
import {BiFootball} from 'react-icons/bi'
import './navbar.css'

export default function NavBar(){
    const navigate = useNavigate()
    async function handleLogout() {
        localStorage.removeItem('@myTeam')
        navigate('/')
    }
    return(
        <div className="bar">
            <h1><Link to='/dashboard'>Meu Time<BiFootball color={'#fff'}/> </Link></h1>
            <button onClick={handleLogout} title="Sair"><RxExit size={20}/></button>
        </div>
    )
}