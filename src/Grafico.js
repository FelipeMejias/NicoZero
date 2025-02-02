import { useEffect, useState } from "react"
import styled from "styled-components"
import { intervaloPreparos } from "./back/graficos/intervPrep"
import { intervaloDescartes } from "./back/graficos/intervDesc"
import { tempoPrepDesc } from "./back/graficos/tPrepDesc"
import { tempoDescPrep } from "./back/graficos/tDescPrep"
import { Smile, Home, LucideSettings, LucideSettings2, Pointer, LucideSave, LucideCheck, LucideCheckCircle, LucideCheckCircle2, LucideMonitorCheck, LucideMaximize2 } from "lucide-react";
export function Grafico({orientado,setOrientado,dados,cont,cravado,id,mini,tipo,nome}){
    
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
    useEffect(construirLista,[tipo,zoom,sono,dados])
    function corBarra(tam,i=-1){
      
        const len=lista.length
        if(i==len-1){
            let c=len-2
            const bases=[]
            while(c>0 && bases.length<3){
               
                if(lista[c].tam<sono)bases.push(lista[c].tam)
                c--
            }
            let points=3
           
            for(let valor of bases){
                //console.log(valor)
                if(tam > valor)points++
                if(tam == valor)points+=0.5
                if(tam < valor)points--
            }
            
            if(points<2){
                return '#ed3b28' //vermelho
            }else if(points>=2 && points<3){
                return '#f9741b' //laranja
            }else if(points==3){
                return '#edd81a' //amarelo
            }else if(points>3 && points<=4){
                return '#a6d63e' //amarelo-verde
            }else if(points>4){
                return '#1fb71f' //verde
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
        if(!tam){
            return `${0.1*zoom*fator}px`
        }
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
                {lista.map((bar,i)=><Holder wi={'25px'}>
                    <Barrinha roxa={bar.tam==99} cor={corBarra(bar.tam,i)} tam={tamanhoBarra(bar.tam,4)}>
                        <div>{bar.tex}</div>
                    </Barrinha>
                    {bar.tam>sono?<></>:<p>{bar.num.h}<small>{bar.num.m}</small></p>}
                    
                </Holder>)}
            </Quadrinho>:
        <Tela orientado={orientado}>
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
            <LucideMaximize2 onClick={()=>setOrientado(!orientado)} style={{cursor:'pointer'}} size={24} color="#9b9b9b" />
                <h1>{nome}</h1>
                <LucideSettings2 onClick={()=>setAlterando(true)} style={{cursor:'pointer'}} size={24} color="#9b9b9b" />
            </Cab>
}
            
            <Quadro id={id}>
                {lista.map((bar,i)=><Holder wi={bar.tam==99?'60px':'25px'}>
                    <Barrinha roxa={bar.tam==99} cor={corBarra(bar.tam,cravado?i:false)} tam={tamanhoBarra(bar.tam)}>
                        <div>{bar.tex}</div>
                        <aside>{bar.texto}</aside>
                    </Barrinha>
                    {bar.tam>sono?<></>:<p>{bar.num.h}<small>{bar.num.m}</small></p>}
                    
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
width:calc(100% - 40px);height:40px;align-items:center;
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
 width:100%;
height:100%; 
flex-direction:column;
height:100%;width:;
background:white;
justify-content:space-evenly;align-items:center;
h1{margin:0;font-size:20px;font-weight:600;text-align:center;}
border-radius:20px;
`
const Quadro=styled.div`
height:calc(100% - 70px);width:calc(100% - 20px);
border:1px solid black;padding-left:10px;
overflow:auto;border-radius:7px;
`
const Barrinha=styled.div`position:relative;cursor:pointer;
height:${p=>p.tam};width:100%;max-height:100%;
background:${p=>p.cor};
border-top-right-radius:5px;
border-top-left-radius:5px;
display:flex;flex-direction:column;
justify-content:${p=>p.roxa?'center':'flex-end'};align-items:center;
color:${p=>p.roxa?'black':'white'};
font-size:${p=>p.roxa?15:10}px;
font-weight:${p=>p.roxa?300:500};
aside{display:none;
color:black;font-size:14px;font-weight:400;
position:absolute;top:10px;background:purple;padding:4px;
white-space: nowrap;z-index:30;
position: absolute;top:20px;
  background: #c4c4c4;
  padding: 10px 15px;
  border-radius: 8px;
  max-width: 200px;
  text-align: center;
  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #c4c4c4;
  }
};
&:hover {
aside{display:flex;}
}
`

const Holder=styled.div`
min-width:${p=>p.wi};
height:100%;flex-direction:column-reverse;
justify-content:flex-start;align-items:center;
margin-right:8px;

p{
margin:0;
font-weight:600;font-size:17px;
width:100%;text-align:center;
margin-left:3px;
small{font-weight:300;font-size:12px;}
}
`
