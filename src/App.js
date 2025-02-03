import { useEffect, useState } from "react"
import styled from "styled-components"
import { Grafico } from "./Grafico"
import { chaveCont, chaveDados, chavePag, info, texto1, texto2, texto3, texto4 } from "./back/info"
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
import { queDiaEh } from "./back/utils_time"
export function App(){
    const valorDados=JSON.parse(localStorage.getItem(chaveDados))||info
    const valorCont=JSON.parse(localStorage.getItem(chaveCont))||queDiaEh()
    const valorPag=JSON.parse(localStorage.getItem(chavePag))||1

    const [dados,setDados]=useState(valorDados)
    const [cont,setCont]=useState(valorCont)
    const [pag,setPag]=useState(valorPag)

    useEffect(()=>{console.log(dados)
        localStorage.setItem(chaveDados, JSON.stringify(dados))},[dados])
    useEffect(()=>{localStorage.setItem(chaveCont, JSON.stringify(cont))},[cont])
    useEffect(()=>{localStorage.setItem(chavePag, JSON.stringify(pag))},[pag])

    
    const [dadosProv,setDadosProv]=useState(valorDados)
    const [contProv,setContProv]=useState(valorCont)
    const [orientado,setOrientado]=useState(false)
    const contexto={orientado,setOrientado,
        texto1,texto2,texto3,texto4,
        dadosProv,setDadosProv,contProv,setContProv,
        pag,setPag,dados,setDados,cont,setCont}
    return(
        <BrowserRouter>
        <Pagina>
            <Menu />
            <Cel>
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
            </Cel>
        </Pagina>
        </BrowserRouter>
    )
}

const Pagina=styled.div`
position:fixed;
height:100vh;width:100vw;
background:#67bf67;
flex-direction:column;
align-items:center;
justify-content:flex-start
`

const Cel=styled.div`
max-width:500px;
height:calc(100% - 50px);width:100%;
flex-direction:column;
align-items:center;
justify-content:space-evenly;
`


