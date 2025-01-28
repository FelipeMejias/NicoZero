import { useEffect, useState } from "react"
import styled from "styled-components"
import { diferencaDeTempo, queHorasSao } from "./back/utils"
import Mostrador from "./Mostrador"
import { useNavigate } from "react-router-dom"
import { LucideCheck, LucideCheckCircle, LucideCheckSquare, LucideCigarette, LucideFilePenLine, LucideListCheck } from "lucide-react"

export default function Historico({contexto}){
    const {texto1,texto2,texto3,texto4,
        setDadosProv,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const navigate=useNavigate()
    return(
        <Inicial>
            <Mostrador wi={'calc(100% - 40px)'} hei={'calc(100% - 150px)'} cont={cont} dados={dados}/>
            <Cab>
                <Mudar onClick={()=>navigate('/edit')}>
                    <LucideFilePenLine  style={{cursor:'pointer'}} size={25} color={'black'}/>
                </Mudar>
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
margin-top:10px;height:60px;align-items:center;
justify-content:space-between;
`

const Mudar=styled.div`
flex-direction:column;
height:62px;width:62px;
background:yellow;
border-radius:200px;
cursor:pointer;margin:10px 0 0 0;
justify-content:center;align-items:center;
`

