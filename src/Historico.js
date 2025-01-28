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
    const aoLixo=dados[dados.length-1].length==1
    const [texto,setTexto]=useState('')
    function salvar(){
        const novaLista=[...dados]
        const ultimo=dados[dados.length-1]
        if(ultimo.length==1){
            novaLista.pop()
            novaLista.push([ultimo[0],texto])
        }else{
            novaLista.push([texto])
        }
        setDadosProv(novaLista)
        navigate('/edit')
    }
    function editarInput(e){
        const nova=e.target.value
        if(nova.length==5)return
        if(!isNaN(parseInt(nova)) || nova=='')setTexto(nova)
    }
const palavra=aoLixo?'Joguei fora':'Bolei'
    return(
        <Inicial>
            <Mostrador wi={'calc(100% - 40px)'} hei={'calc(100% - 150px)'} cont={cont} dados={dados}/>
            <Cab>
                <Mudar onClick={()=>navigate('/edit')}>
                    <LucideFilePenLine  style={{cursor:'pointer'}} size={25} color={'black'}/>
                </Mudar>
                <Novo>
                <input
                    value={texto}
                    onChange={(e)=>editarInput(e)}
                    placeholder={'0000'}
                />
                <Mudar onClick={salvar}>
                    <LucideCheck  style={{cursor:'pointer'}} size={25} color={'black'}/>
                </Mudar>
                </Novo>
            </Cab>
            
        </Inicial>
    )
}

const Inicial=styled.div`
height:calc(100% - 50px);width:100%;padding-top:30px;
align-items:center;
flex-direction:column;
input{
width:60px;height:30px;font-size:18px;
background:green;color:white;padding-left:8px;
border:0;border-radius:5px;
}
input::placeholder {
  color: rgb(255,255,255,0.6); 
}
`

const Cab=styled.div`
margin-top:10px;max-width:300px;
width:100%;height:60px;align-items:center;
justify-content:space-between;
`
const Novo=styled.div`
width:150px;
height:100%;align-items:center;
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

