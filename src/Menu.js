import { useState } from "react"
import styled from "styled-components"
import { queHorasSao } from "./back/utils"
import Mostrador from "./Mostrador"
import { useLocation, useNavigate } from "react-router-dom"
import { LucideChartColumnIncreasing, LucideCigarette, LucideListCheck } from "lucide-react"
export default function Menu(){
    const navigate=useNavigate()
    const {pathname:pn}=useLocation()
    const taNoHistory=pn.includes('edit')||pn.includes('history')
    const taNoGraphic=pn.includes('graphics')||pn.includes('graphic')
    return(
        <Tela>
            <Cab>
                <Mudar onClick={()=>navigate('/history')}>
                    <LucideListCheck  style={{cursor:'pointer'}} 
                    size={35} color={taNoHistory?'white':'#45e045'}/>
                </Mudar>
                <Mudar  onClick={()=>navigate('/')}>
                <LucideCigarette  style={{cursor:'pointer'}} 
                    size={35} color={pn=='/'?'white':'#45e045'}/>
                </Mudar>
                <Mudar  onClick={()=>navigate('/graphics')}>
                <LucideChartColumnIncreasing  style={{cursor:'pointer'}} 
                    size={35} color={taNoGraphic?'white':'#45e045'}/>
                </Mudar>
            </Cab>
        </Tela>
    )
}

const Cab=styled.div`
max-width:600px;
width:100%;height:100%;
align-items:center;
justify-content:space-evenly;
`
const Mudar=styled.div`
height:50px;width:90%;
background:;border-radius:20px;
cursor:pointer;margin:0 10px 0 10px;
justify-content:center;align-items:center;
p{font-size:19px;text-align:center;
font-weight:600;
margin-left:5px;
color:${p=>p.sel?'white':'#45e045'};}
`
const Tela=styled.div`
width:100%;height:50px;
align-items:center;
justify-content:center;
background:#388738;
h1{margin:0;font-size:20px;}
`