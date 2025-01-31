import { useEffect, useState } from "react"
import styled from "styled-components"
import { diferencaDeTempo, queHorasSao } from "./back/utils_time"
import Mostrador from "./Mostrador"
import { useNavigate } from "react-router-dom"
import { LucideCheck, LucideCheckCircle, LucideCheckSquare, LucideCigarette, LucideCopy, LucideCopyCheck, LucideFilePenLine, LucideListCheck } from "lucide-react"

export default function Historico({contexto}){
    const {texto1,texto2,texto3,texto4,
        setDadosProv,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const navigate=useNavigate()
    const [copiado,setCopiado]=useState(false)
    function copiarTexto(){
        let str=``
        str+=`${cont}\n`
        for(let linha of dados){
            if(typeof linha == 'string'){
                str+=`${linha}\n`
            }else{
                str+=`${linha[0]}${linha[1]?`,${linha[1]}`:''}\n`
            }
        }
        navigator.clipboard.writeText(str).then(() => {setCopiado(true);setTimeout(() => setCopiado(false), 2000)}).catch(err => console.error('Erro ao copiar o texto: ', err));
    }
    return(
        <Inicial>
            <Mostrador wi={'calc(100% - 40px)'} hei={'calc(100% - 150px)'} cont={cont} dados={dados}/>
            <Cab>
                <Mudar onClick={()=>navigate('/edit')}>
                    <LucideFilePenLine  style={{cursor:'pointer'}} size={25} color={'black'}/>
                    <p>Edit</p>
                </Mudar>
                <Mudar onClick={copiarTexto}>
                    {copiado?<LucideCopyCheck  style={{cursor:'pointer'}} size={25} color={'black'}/>
                    :<LucideCopy  style={{cursor:'pointer'}} size={25} color={'black'}/>}
                    <p>{copiado?'Copied!':'Copy'}</p>
                    </Mudar>
            </Cab>
            
        </Inicial>
    )
}

const Inicial=styled.div`
height:100%;width:100%;
padding-top:30px;
align-items:center;
flex-direction:column;

`

const Cab=styled.div`
margin-top:10px;height:60px;align-items:center;
justify-content:space-between;
width:calc(100% - 40px);max-width:150px;
`
const Mudar=styled.div`
flex-direction:column;
height:58px;width:58px;
background:${p=>p.cor||'yellow'};
border-radius:200px;
cursor:pointer;
justify-content:center;align-items:center;
p{margin:0;font-size:12px;text-align:center;color:${p=>p.cor?'white':'black'}}
`
