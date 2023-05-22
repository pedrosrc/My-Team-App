import {Routes, Route } from "react-router-dom"

import Dashboard from "../pages/Dashboard"
import Auth from "../pages/Auth"
import Leagues from "../pages/Leagues"
import Seasons from "../pages/Seasons"
import Teams from "../pages/Teams"
import Team from "../pages/Team"
import Private from "./private"
import NotFound from "../pages/NotFound"
export default function Nav(){
    return(
        <Routes>
            <Route path="/" element={<Auth/>}/>
            <Route path="/dashboard" element={<Private> <Dashboard/> </Private>}/>
            <Route path="/seasons/:id" element={<Private> <Seasons/> </Private>} />
            <Route path="/leagues/:id/:season" element={<Private> <Leagues/> </Private>} />
            <Route path="/teams/:id/:season/:list" element={<Private> <Teams/> </Private>} />
            <Route path="/team/:id/:season/:list/:info" element={<Private> <Team/> </Private>} />
            <Route path="*" element={ <Private> <NotFound/> </Private>} />
        </Routes>

    )
}