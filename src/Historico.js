import { useEffect, useState } from "react"
import styled from "styled-components"
import { diferencaDeTempo, queHorasSao } from "./back/utils"
import Mostrador from "./Mostrador"
import { useNavigate } from "react-router-dom"

export default function Historico({contexto}){
    const {texto1,texto2,texto3,texto4,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const navigate=useNavigate()
    
    return(
        <Inicial>
            <Mostrador wi={'calc(100% - 40px)'} hei={'calc(100% - 120px)'} cont={cont} dados={dados}/>
            <Cab>
                <Mudar onClick={()=>navigate('/edit')}>Editar</Mudar>
            </Cab>
            
        </Inicial>
    )
}

const Inicial=styled.div`
height:calc(100% - 50px);width:100%;padding-top:30px;
align-items:center;
flex-direction:column;
`

const Cab=styled.div`
margin-top:10px;
width:100%;height:60px;align-items:center;
justify-content:space-evenly;
`
const Mudar=styled.div`
height:50px;width:150px;
background:yellow;border-radius:20px;
cursor:pointer;margin:0 10px 0 10px;
justify-content:center;align-items:center;
p{font-size:18px;text-align:center;}
`
const Tela=styled.div`
flex-direction:column;
height:100%;width:calc(100% - 200px);max-width:500px;
justify-content:space-evenly;align-items:center;
h1{margin:0;font-size:20px;}
`