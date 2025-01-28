import styled from "styled-components"
import { ideias } from "./ideias"
import { useState } from "react"
import Nexus from "./Nexus"
import Odissey from "./Odissey"
import Sphere from "./Sphere"
import { useNavigate } from "react-router-dom"


export default function NomeLogo(){
    const navigate=useNavigate()
    return <Tela>
        {ideias.map(ideia=><Ideia>
            <h1>{ideia.nome}</h1>
            <h2>{ideia.razao}</h2>
            {ideia.logo?<Botao onClick={()=>navigate(`/ideias/${ideia.path}`)}>ver logo</Botao>:<></>}
            <h3>{ideia.desc}</h3>
        </Ideia>)}
    </Tela>
}
const Tela=styled.div`
width:100%;height:100%;
overflow:auto;
`
const Ideia=styled.div`
flex-direction:column;align-items:center;
padding:10px;margin:20px 0 20px 20px;
height:90%;min-width:350px;
overflow:auto;
background:white;border-radius:20px;
h1{font-size:25px;font-weight:600;margin:0;text:align:center;}
h2{font-size:14px;font-weight:300;margin:10px 0 20px 0;text:align:center;}
h3{font-size:14px;font-weight:300;margin:20px 0 0px 0;text:align:center;}
`
const Botao=styled.div`
height:40px;width:100px;background:#7095e0;color:white;
justify-content:center;align-items:center;border-radius:60px;cursor:pointer;
`
const Holder=styled.div`
width:100%;height:100%;
`