import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Private({children}:any){
    const [loading, setLoading]= useState<boolean>(true);
    const [signed, setSigned]= useState<boolean>(false);
    
    useEffect(()=>{
        async function checkLogin(){
            const userData:any = !!localStorage.getItem('@myTeam');
            if(userData){
                setLoading(false)
                setSigned(true)
                
            }else{
                setLoading(false)
                setSigned(false)
            }
        
            
        }
        checkLogin();
    },[])

    if(loading){
        <div>Carregando...</div>

    }else if(!signed){
        return <Navigate to="/" replace={true}/>
    }
    return children;

}
