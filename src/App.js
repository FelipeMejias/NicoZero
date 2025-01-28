import { useEffect, useState } from "react"
import styled from "styled-components"
import { Grafico } from "./Grafico"
import { info, inicioContagem } from "./back/info"
import Editar from "./Editar"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaGrafico from "./PaginaGrafico"
import Historico from "./Historico"
import Home from "./Home"
import Menu from "./Menu"
import EscGrafico from "./EscGrafico"
import NomeLogo from "./portal/NomeLogo"
import Sphere from "./portal/Sphere"
import Odissey from "./portal/Odissey"
import Nexus from "./portal/Nexus"
import Portal from "./portal/Portal"
export function App(){

    const chaveDados='dados2'
    const chaveCont='cont1'

    const [pag,setPag]=useState(1)
    const [dados,setDados]=useState(JSON.parse(localStorage.getItem(chaveDados))||info)
    const [cont,setCont]=useState(JSON.parse(localStorage.getItem(chaveCont))||inicioContagem)

    const texto1='Intervalo Boladas'
    const texto2='Intervalo Lixos'
    const texto3='Duração cigarro'
    const texto4='Duração abstinência'

    const [dadosProv,setDadosProv]=useState(null)
    const [contProv,setContProv]=useState(null)

    useEffect(()=>{
        localStorage.setItem(chaveDados, JSON.stringify(dados))
        setDadosProv(dados)
    },[dados])
    useEffect(()=>{
        localStorage.setItem(chaveCont, JSON.stringify(cont))
        setContProv(cont)
    },[cont])
    const contexto={texto1,texto2,texto3,texto4,
        dadosProv,setDadosProv,contProv,setContProv,
        pag,setPag,dados,setDados,cont,setCont}
    return(
        <BrowserRouter>
        <Pagina>
            <Menu />
            <Routes>
                <Route path='/' element={<Home contexto={contexto}/>}/>
                <Route path='/edit' element={<Editar contexto={contexto}/>}/>
                <Route path='/history' element={<Historico contexto={contexto}/>}/>
                <Route path='/graphics' element={<EscGrafico contexto={contexto}/>}/>
                <Route path='/graphic' element={<PaginaGrafico contexto={contexto}/>}/>
                <Route path='/ideias' element={<NomeLogo />}/>
                <Route path='/ideias/portalcode' element={<Sphere/>}/>
                <Route path='/ideias/codenexus' element={<Nexus/>}/>
                <Route path='/ideias/codeodissey' element={<Odissey/>}/>
                <Route path='/ideias/codesphere' element={<Portal/>}/>
            </Routes>
        </Pagina>
        </BrowserRouter>
    )
}

const Pagina=styled.div`
height:100vh;width:100vw;
background:#67bf67;
flex-direction:column;
align-items:center;
justify-content:flex;start
`


