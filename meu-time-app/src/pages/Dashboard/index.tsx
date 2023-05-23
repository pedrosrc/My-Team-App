import NavBar from "../../components/NavBar"
import axios from "axios"
import './dashboard.css'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import {AiOutlineSearch} from 'react-icons/ai'
export default function Dashboard() {

    
    const [dados, setDados] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [countriesToShow, setCountriesToShow] = useState<any[]>([]);
    const [visibleCountries, setVisibleCountries] = useState(10);
    const [searchResult, setSearchResult] = useState<any>(null);
    const [loading, setLoading] = useState(true)
    const dataLocal: any = localStorage.getItem('@myTeam');
    const keyUSer = (JSON.parse(dataLocal))

    useEffect(() => {

        async function loadData() {
            const resp = await axios.get('https://v3.football.api-sports.io/countries', {
                headers: {
                    "x-rapidapi-key": `${keyUSer.key}`,
                    "x-rapidapi-host": "v3.football.api-sports.io"
                }
            })
                
            setDados(resp.data.response)
            setCountriesToShow(resp.data.response.slice(0, visibleCountries))
            setLoading(false);
            
        }
        loadData();
    }, [visibleCountries])

    if(loading){
        return(
            <div className="container_dashboard">
                <NavBar/>
                <h2>Carregando...</h2>
            </div>
        )
    }
    const handleSearch = () => {
        const foundCountry:any = Object.values(dados).find(country =>
            country.name.toLowerCase() === searchTerm.toLowerCase()
        );
        setSearchResult(foundCountry);
    };

    const handleMore = () => {
        setVisibleCountries(visibleCountries + 5);
    }



    return (
        <div className="container_dashboard">
            <NavBar />
            <h2>Selecione o país da liga que deseja</h2>
            <div className="section_search">
            <span>Busque um país:</span>
            <input type="text" placeholder="Digite um país" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
            <button onClick={handleSearch}><AiOutlineSearch size={23}/></button>
            <br />
            
            </div>
            <div className="section_countries">
                
            {searchResult && 
            <div key={searchResult.id} className="countrie">
                <Link to={`/seasons/${searchResult.name}`}>
                    <img src={searchResult.flag} alt="poster" />
                    <br />
                    <strong>{searchResult.name}</strong>
                </Link>
            </div>}
            {countriesToShow.map((countries) => {
                    return (
                        <div key={countries.id} className="countrie">
                            <Link to={`/seasons/${countries.name}`}>
                                <img src={countries.flag} alt="poster" />
                                <br />
                                <strong>{countries.name}</strong>
                            </Link>
                        </div>
                    )
                }) }
                
                
            </div>
            <button onClick={handleMore} className="showmore">Mostrar mais Países</button>
        </div>
    )
}