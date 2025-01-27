import { useEffect, useState } from "react"
import styled from "styled-components"
import { Grafico } from "./Grafico"
import { info, inicioContagem } from "./back/info"
import Editar from "./Editar"
import Home from "./Home"

export function App(){
    const [pag,setPag]=useState(0)
    const [dados,setDados]=useState(JSON.parse(localStorage.getItem("dados"))||info)
    const [cont,setCont]=useState(JSON.parse(localStorage.getItem("cont"))||inicioContagem)
    const texto1='Intervalo entre preparos'
    const texto2='Intervalo entre descartes'
    const texto3='Tempo preparo_descarte'
    const texto4='Tempo descarte_preparo'
    useEffect(()=>{localStorage.setItem("dados", JSON.stringify(dados))},[dados])
    useEffect(()=>{localStorage.setItem("cont", JSON.stringify(cont))},[cont])
    const contexto={texto1,texto2,texto3,texto4,
        pag,setPag,dados,setDados,cont,setCont}
    return(
    pag===false?
    <Editar contexto={contexto}/>
    :pag===0?
    <Home contexto={contexto}/>
        :
    <Pagina>
        <Outras>
            <Outra selec={false} wid={true} onClick={()=>setPag(0)}><p>Voltar</p></Outra>
            <Outra selec={pag==1} onClick={()=>setPag(1)}><p>{texto1}</p></Outra>
            <Outra selec={pag==2} onClick={()=>setPag(2)}><p>{texto2}</p></Outra>
            <Outra selec={pag==3} onClick={()=>setPag(3)}><p>{texto3}</p></Outra>
            <Outra selec={pag==4} onClick={()=>setPag(4)}><p>{texto4}</p></Outra>
        </Outras>
        <Grafico cont={cont} dados={dados} tipo={pag} nome={
            pag==1?texto1:
            pag==2?texto2:
            pag==3?texto3:
            pag==4?texto4:'' }>
        </Grafico>
    </Pagina>
    )
}

const Voltar=styled.div`
height:calc(50% - 0px);width:40px;
background:white;border-radius:20px;
cursor:pointer;padding-bottom:5px;
justify-content:center;align-items:center;
font-size:35px;text-align:center;
`
const Outra=styled.div`
height:calc(50% - 0px);width:${p=>p.wid?'90px':'calc(25% - 60px)'};
background:white;border-radius:20px;
opacity:${p=>p.selec?'30%':'100%'};
cursor:pointer;
justify-content:center;align-items:center;
p{font-size:16px;text-align:center;line-height:19px;}
`

const Pagina=styled.div`
height:100vh;width:100vw;background:purple;
flex-direction:column;
align-items:center;
`


const Outras=styled.div`
height:80px;width:100%;
justify-content:space-evenly;
align-items:center;
`