import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "../../components/NavBar"

export default function NotFound(){
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/dashboard')
    })
    return(
        <div>
            <NavBar/>
            <h1>404</h1>
            <span>Not Found!</span>
        </div>
    )
}