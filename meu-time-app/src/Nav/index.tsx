import {Routes, Route } from "react-router-dom"

import Dashboard from "../pages/Dashboard"
import Auth from "../pages/Auth"
export default function Nav(){
    return(
        <Routes>
            <Route path="/" element={<Auth/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>

    )
}