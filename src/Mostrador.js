import { useEffect, useState } from "react"
import styled from "styled-components"
import { queHorasSao } from "./back/utils"
import { mostrar } from "./back/mostrar"
import { diasSemana } from "./back/info"

export default function Mostrador({wi,hei,dados,cont}){
    const [lista,setLista]=useState([])
    function scrollToEnd() {
        const element = document.getElementById("mostrador");
        if (element) {
          element.scrollTo({
            top: element.scrollHeight, // Altura máxima do conteúdo
            behavior: "smooth", // Scroll suave
          });
        }
      }
      
    function construirLista(d,cont){
        const nova=mostrar(d,cont)
        setLista(nova)
        setTimeout(scrollToEnd,1);
    }
    useEffect(()=>construirLista(dados,cont),[dados,cont])
    return(
        <Quadro wi={wi} hei={hei} id="mostrador">
            {lista.map(lis=>{
                if(typeof lis=='string'){
                    if(diasSemana.includes(lis)){
                        return <h6 style={{background:'#d8d8d8',padding:'7px 0 7px 0'}}>{lis}</h6>
                    }else{
                        return  <h6 style={{background:'#f2a9ee',marginBottom:'5px'}}>{lis}</h6>
                    }
                }else{
                    const [inicio,final]=lis
                    return <p><strong>{inicio}</strong><small>{final}</small></p>
                }
                
            })}
        </Quadro> 
    )
}

const Quadro=styled.div`
height:${p=>p.hei};width:${p=>p.wi};
max-width:300px;
flex-direction:column;align-items:center;
overflow:auto;
border-radius:10px;
background:white;
p{
font-variant-numeric: tabular-nums;
margin:0;display:flex;
width:110px;min-height:30px;
justify-content:space-between;
strong{
    width:50%;color:green;
    font-size:18px;font-weight:500}
small{
    width:50%;color:red;
    font-size:18px;font-weight:500}
}
h6{width:100%;
font-size:18px;font-weight:400;
margin:0;
display:flex;align-items:center;justify-content:center;
min-height:30px;
color:black;
}
`
