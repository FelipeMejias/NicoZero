import styled from "styled-components"
import { Grafico } from "./Grafico"
import { useNavigate } from "react-router-dom"
import { LucideCigarette, LucideFilePenLine, LucideTrash2 } from "lucide-react"

export default function EscGrafico({contexto}){
    const {texto1,texto2,texto3,texto4,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const navigate=useNavigate()
    function ir(num){
        setPag(num)
        navigate('/graphic')
    }
    const desc2='Tempo entre jogar no lixo um cigarro e jogar o próximo'
    const desc3='Tempo entre bolar um cigarro e jogá-lo no lixo'
    const desc4='Tempo entre jogar um cigarro no lixo e bolar o próximo'
    return(
        <Tela>
            <Opcoes>
        <Botao onClick={()=>ir(1)}>
            <h2>{texto1}</h2>
            <Dinamico>
                <h3>Tempo entre</h3>
                <LucideCigarette  style={{cursor:'pointer',margin:'0 7px 0 7px'}} size={25} color={'#565656'}/>
                <h3>e o próximo</h3>
                <LucideCigarette  style={{cursor:'pointer',margin:'0 7px 0 7px'}} size={25} color={'#565656'}/>
            </Dinamico>
        </Botao>
        <Botao onClick={()=>ir(2)}>
            <h2>{texto2}</h2>
            <Dinamico>
                <h3>Tempo entre</h3>
                <LucideTrash2  style={{cursor:'pointer',margin:'0 7px 0 7px'}} size={25} color={'#565656'}/>
                <h3>e o próximo</h3>
                <LucideTrash2  style={{cursor:'pointer',margin:'0 7px 0 7px'}} size={25} color={'#565656'}/>
            </Dinamico>
        </Botao>
        <Botao onClick={()=>ir(3)}>
            <h2>{texto3}</h2>
            <Dinamico>
                <h3>Tempo entre</h3>
                <LucideCigarette  style={{cursor:'pointer',margin:'0 7px 0 7px'}} size={25} color={'#565656'}/>
                <h3>e ele ir pro</h3>
                <LucideTrash2  style={{cursor:'pointer',margin:'0 7px 0 7px'}} size={25} color={'#565656'}/>
            </Dinamico>
        </Botao>
        <Botao onClick={()=>ir(4)}>
            <h2>{texto4}</h2>
            <Dinamico>
                <h3>Tempo entre o último</h3>
                <LucideTrash2  style={{cursor:'pointer',margin:'0 7px 0 7px'}} size={25} color={'#565656'}/>
                <h3>e o próximo</h3>
                <LucideCigarette  style={{cursor:'pointer',margin:'0 7px 0 7px'}} size={25} color={'#565656'}/>
            </Dinamico>
        </Botao>
    </Opcoes>

        </Tela>
    
    )
}
const Tela=styled.div`
height:100%;width:100%;padding-top:30px;
align-items:center;
flex-direction:column;

`
const Dinamico=styled.div`
align-items:center;
`
const Botao=styled.div`
flex-direction:column;
height:86px;width:90%;
background:white;border-radius:20px;
cursor:pointer;
justify-content:space-evenly;;
align-items:center;
h2{margin:0;font-size:18px;font-weight:500;text-align:center;}
h3{color:#565656;margin:0;font-size:15px;font-weight:400;text-align:center;}
`
const Opcoes=styled.div`
flex-direction:column;
height:420px;width:100%;
max-width:380px;
justify-content:space-between;
align-items:center;
`