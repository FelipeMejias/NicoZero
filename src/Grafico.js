import { useEffect, useState } from "react"
import styled from "styled-components"
import { intervaloPreparos } from "./back/graficos/intervPrep"
import { intervaloDescartes } from "./back/graficos/intervDesc"
import { tempoPrepDesc } from "./back/graficos/tPrepDesc"
import { tempoDescPrep } from "./back/graficos/tDescPrep"
import { Smile, Home, LucideSettings, LucideSettings2, Pointer, LucideSave, LucideCheck, LucideCheckCircle, LucideCheckCircle2, LucideMonitorCheck } from "lucide-react";
export function Grafico({id,mini,tipo,nome,dados,cont}){
    const [lista,setLista]=useState([])
    const [alterando,setAlterando]=useState(false)
    const [sono,setSono]=useState(JSON.parse(localStorage.getItem("sono"))||7)
    const [zoom,setZoom]=useState(JSON.parse(localStorage.getItem("zoom"))||5)
    function scrollToEnd() {
        const element = document.getElementById(id);
        if (element) {
          element.scrollTo({
            left: element.scrollWidth, // Altura máxima do conteúdo
            behavior: "smooth", // Scroll suave
          });
        }
      }
    function construirLista(){
        const funcs=[intervaloPreparos,intervaloDescartes,tempoPrepDesc,tempoDescPrep]
        const funcCerta=funcs[tipo-1]
        const resp=funcCerta(dados,cont,sono)
        setLista(resp)
        setTimeout(scrollToEnd,1);
    }
    useEffect(()=>{localStorage.setItem("sono", JSON.stringify(sono))},[sono])
    useEffect(()=>{localStorage.setItem("zoom", JSON.stringify(zoom))},[zoom])
    useEffect(construirLista,[tipo,zoom,sono])
    function corBarra(tam,i=-1){
        if(i==lista.length-1){
            const tamAnt=lista[lista.length-2].tam||lista[lista.length-2].tam
            if(tam>tamAnt){
                return '#1fb71f' //verde
            }else if(tam<tamAnt){
                return '#ed3b28' //vermelho
            }else{
                return '#f4b618' //amarelo
            }
            
        }else if(tam==99){
            return '#f2a9ee' //sem dados
        }else if(tam>sono){
            return '#35588c' //sono
        }else{
            return '#79a5ea' //normal 
        }
    }
    function tamanhoBarra(tam,fator=10){
        if(tam==99){
            return '50%'
        }else if(tam>sono){
            return '100%' 
        }else{
            return `${tam*zoom*fator}px`
        }
    }
    return(mini?
        <Quadrinho id={id}>
                {lista.map((bar,i)=><Holder>
                    <Barrinha roxa={bar.tam==99} cor={corBarra(bar.tam,i)} tam={tamanhoBarra(bar.tam,4)}>
                        <div>{bar.tex}</div>
                    </Barrinha>
                    {bar.tam>sono?<></>:<p>{bar.num}</p>}
                    
                </Holder>)}
            </Quadrinho>:
        <Tela>
            {alterando?
            <Cab style={{maxWidth:'300px'}}>
                <Conf>
                    <h5>SONO</h5>
                    <Control>
                        <Action onClick={()=>{if(sono>0)setSono(sono-1)}}>
                            -
                        </Action>
                        <p>{sono}</p>
                        <Action onClick={()=>{if(sono<12)setSono(sono+1)}}>
                            +
                        </Action>
                    </Control>
                </Conf>
                <LucideMonitorCheck onClick={()=>setAlterando(false)} style={{cursor:'pointer'}} size={24} color="green" />
                <Conf>
                    <h5>ZOOM</h5>
                    <Control>
                        <Action onClick={()=>{if(zoom>1)setZoom(zoom-1)}}>
                            -
                        </Action>
                        <p>{zoom}</p>
                        <Action onClick={()=>{if(zoom<10)setZoom(zoom+1)}}>
                            +
                        </Action>
                    </Control>
                </Conf>
            </Cab>
        :
            <Cab>
                <h1>{nome}</h1>
                <LucideSettings2 onClick={()=>setAlterando(true)} style={{cursor:'pointer'}} size={24} color="#9b9b9b" />
            </Cab>
}
            
            <Quadro id={id}>
                {lista.map((bar,index)=><Holder wi={bar.tam==99?'60px':'25px'}>
                    <Barrinha roxa={bar.tam==99} cor={corBarra(bar.tam)} tam={tamanhoBarra(bar.tam)}>
                        <div>{bar.tex}</div>
                    </Barrinha>
                    {bar.tam>sono?<></>:<p>{bar.num}</p>}
                    
                </Holder>)}
            </Quadro>
            
        </Tela>
    )
}
const Quadrinho=styled.div`
height:calc(100% - 20px);width:100%;
background:white;
border:1px solid black;padding-left:10px;
overflow:auto;border-radius:7px;
`
const Cab=styled.div`
width:calc(100% - 40px);height:50px;align-items:center;
justify-content:space-between;padding
`
const Conf=styled.div`
flex-direction:column;background:;
height:100%;width:85px;
h5{margin:0;width:100%;text-align:center;color:#848484}
`
const Control=styled.div`
width:100%;height:40px;
align-items:center;justify-content:space-between;
p{font-size:22px;color:#848484;
}
`
const Action=styled.div`
cursor:pointer;
width:25px;height:25px;
border-radius:50%;padding:0 0 3px 1px;
justify-content:center;align-items:center;
font-size:22px;color:#848484;
background:#e0e0e0;
`
const Tela=styled.div`
flex-direction:column;
height:100%;width:100%;
background:white;border-radius:20px;
justify-content:space-evenly;align-items:center;
h1{margin:0;font-size:20px;font-weight:600;text-align:center;}
`
const Quadro=styled.div`
height:calc(100% - 110px);width:calc(100% - 40px);
border:1px solid black;padding-left:10px;
overflow:auto;border-radius:7px;
`
const Barrinha=styled.div`
height:${p=>p.tam};width:100%;max-height:100%;
background:${p=>p.cor};
border-top-right-radius:5px;
border-top-left-radius:5px;
display:flex;flex-direction:column;
justify-content:${p=>p.roxa?'center':'flex-end'};align-items:center;
color:${p=>p.roxa?'black':'white'};
font-size:${p=>p.roxa?15:10}px;
font-weight:${p=>p.roxa?300:500};
`
const Holder=styled.div`
min-width:${p=>p.wi};
height:100%;flex-direction:column-reverse;
justify-content:flex-start;align-items:center;
margin-right:10px;

p{font-weight:600;
font-size:17px;width:100%;text-align:center;
margin:0;margin-right:1px;
}
`
