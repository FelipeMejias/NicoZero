import styled from "styled-components"
import { Grafico } from "./Grafico"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { diferencaDeTempo, englobar, queHorasSao } from "./back/utils"
import Mostrador from "./Mostrador"

export default function Home({contexto}){
    const {texto1,texto2,texto3,texto4,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const aoLixo=dados[dados.length-1].length==1
    const navigate=useNavigate()
    const [h1,setH1]=useState('00:00')
    const [h2,setH2]=useState('00:00')
    const [infosComAgora,setInfosComAgora]=useState(englobar(dados))
   
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
        const penAnt=dados[dados.length-3]
        if(ultimo.length==1){
            setH1(diferencaDeTempo(ultimo[0]))
            setH2(diferencaDeTempo(ant.length==1?penAnt[1]:ant[1]))
        }else{
            setH1(diferencaDeTempo(ultimo[1]))
            setH2(diferencaDeTempo(ultimo[0]))
        }
        setInfosComAgora(englobar(dados))
    }
    

    const [intervalo,setIntervalo]=useState(null)
    useEffect(() => {
        if (intervalo) {
            clearInterval(intervalo); // Limpa o intervalo anterior
        }
        const minutos=1
        const novoIntervalo = setInterval(seCravasse, minutos * 60 * 1000); // Cria um novo intervalo
        setIntervalo(novoIntervalo); // Atualiza o estado com o novo intervalo
        seCravasse()
        return () => clearInterval(novoIntervalo); // Limpa o intervalo ao desmontar ou atualizar
    }, [dados]);
    return(
    <Inicial>
        
        <Mostrador wi={'calc(100% - 40px)'} hei={'165px'} cont={cont} dados={dados} />
        <Cab>
            <Mudar onClick={cravar}><p>{aoLixo?'Clique ao jogar no lixo':'Clique ao bolar'}</p></Mudar>
        </Cab>
        <Relogio>
            <Pers onClick={()=>{setPag(aoLixo?3:4);navigate('/graphic')}}>
                <h3>{aoLixo?texto3:texto4}</h3> 
                <h3><strong>{h1}</strong></h3>
            <Grafico id='grafico1'  mini={true} cont={cont} dados={infosComAgora} tipo={aoLixo?3:4} >
            </Grafico>
            </Pers>
            <Pers onClick={()=>{setPag(aoLixo?2:1);navigate('/graphic')}}>
                <h3>{aoLixo?texto2:texto1}</h3> 
                <h3><strong>{h2}</strong></h3>
            <Grafico id='grafico2' mini={true}  cont={cont} dados={infosComAgora} tipo={aoLixo?2:1} >
            </Grafico>
            </Pers>
    </Relogio>
    </Inicial>
    )
}
const Pers=styled.div`
cursor:pointer;
height:100%;width:calc(50% - 10px);
flex-direction:column;align-items:center;
main{max-width:220px;width:100%;
display:flex;align-items:center;
justify-content:space-between;}
h3{
font-size:16px;margin:0px 0 6px 0;
font-weight:400;line-height:17px;
strong{font-weight:600; font-size:20px;}
}
`
const Relogio=styled.div`
max-height:190px;
width:90%;height:calc(100% - 300px);background:;
justify-content:space-between;

`
const Inicial=styled.div`
height:calc(100% - 50px);width:100%;padding-top:30px;
flex-direction:column;align-items:center;
`

const Cab=styled.div`
margin:10px 0 10px 0;
width:100%;height:60px;align-items:center;
justify-content:space-evenly;
`
const Mudar=styled.div`
height:50px;width:225px;
background:#388738;border-radius:40px;
cursor:pointer;margin:0 10px 0 10px;
justify-content:center;align-items:center;
p{font-size:18px;text-align:center;font-weight:600;color:white;}
`
