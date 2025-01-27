import styled from "styled-components"
import { Grafico } from "./Grafico"
import { useNavigate } from "react-router-dom"

export default function EscGrafico({contexto}){
    const {texto1,texto2,texto3,texto4,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const navigate=useNavigate()
    function ir(num){
        setPag(num)
        navigate('/graphic')
    }
    return(
    <Opcoes>
        <Botao onClick={()=>ir(1)}><p>{texto1}</p></Botao>
        <Botao onClick={()=>ir(2)}><p>{texto2}</p></Botao>
        <Botao onClick={()=>ir(3)}><p>{texto3}</p></Botao>
        <Botao onClick={()=>ir(4)}><p>{texto4}</p></Botao>
    </Opcoes>
    )
}

const Botao=styled.div`
height:80px;width:90%;
background:white;border-radius:20px;
cursor:pointer;margin-bottom:20px;
justify-content:center;align-items:center;
p{font-size:18px;text-align:center;}
`
const Opcoes=styled.div`
flex-direction:column;
height:100vh;width:200px;
padding-top:50px;align-items:center;
`