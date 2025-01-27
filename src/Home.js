import { useEffect, useState } from "react"
import styled from "styled-components"
import { diferencaDeTempo, queHorasSao } from "./back/utils"
import Mostrador from "./Mostrador"

export default function Home({contexto}){
    const {texto1,texto2,texto3,texto4,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const [h1,setH1]=useState('00:00')
    const [h2,setH2]=useState('00:00')
    function cravar(){
        const novaLista=[...dados]
        const ultimo=dados[dados.length-1]
        const codigo= queHorasSao()
        if(ultimo.length==1){
            novaLista.pop()
            novaLista.push([ultimo[0],codigo])
        }else{
            novaLista.push([codigo])
        }
        setDados(novaLista)

    }
    function seCravasse(){
        const ultimo=dados[dados.length-1]
        const ant=dados[dados.length-2]
        if(ultimo.length==1){
            setH1(diferencaDeTempo(ultimo[0]))
            setH2(diferencaDeTempo(ant[1]))
        }else{
            setH1(diferencaDeTempo(ultimo[1]))
            setH2(diferencaDeTempo(ultimo[0]))
        }
    }
    useEffect(seCravasse,[])
    return(
        <Inicial>
        <Tela>
            <Cab>
                <Mudar onClick={()=>setPag(false)}>Editar na mao</Mudar>
                <Mudar onClick={cravar}>Adicionar</Mudar>
                
            </Cab>
            <Mostrador cont={cont} dados={dados}/>
        </Tela>
        <Menu>
            <Botao onClick={()=>setPag(1)}><p>{texto1}</p></Botao>
            <Botao onClick={()=>setPag(2)}><p>{texto2}</p></Botao>
            <Botao onClick={()=>setPag(3)}><p>{texto3}</p></Botao>
            <Botao onClick={()=>setPag(4)}><p>{texto4}</p></Botao>
            <Relogio>
                <p><small>tempo</small></p>
                <p>{h1}</p>
                <p><small>intervalo</small></p>
                <p>{h2}</p>
            </Relogio>
        </Menu>
    </Inicial>
    )
}
const Relogio=styled.div`
width:90%;
flex-direction:column;
p{
margin:0;font-size:22px;text-align:center;color:#19ea19;
font-weight:700;
small{color:white;font-size:20px;font-weight:400;}
}
`
const Inicial=styled.div`
height:100vh;width:100vw;background:purple;
`
const Botao=styled.div`
height:80px;width:90%;
background:white;border-radius:20px;
cursor:pointer;margin-bottom:20px;
justify-content:center;align-items:center;
p{font-size:18px;text-align:center;}
`
const Menu=styled.div`
flex-direction:column;
height:100vh;width:200px;
padding-top:50px;
`
const Cab=styled.div`
width:400px;height:60px;align-items:center;
justify-content:space-evenly;
`
const Mudar=styled.div`
height:50px;width:90%;
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