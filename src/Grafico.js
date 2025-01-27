import { useEffect, useState } from "react"
import styled from "styled-components"
import { intervaloPreparos } from "./back/graficos/intervPrep"
import { intervaloDescartes } from "./back/graficos/intervDesc"
import { tempoPrepDesc } from "./back/graficos/tPrepDesc"
import { tempoDescPrep } from "./back/graficos/tDescPrep"

export function Grafico({id,mini,tipo,nome,dados,cont}){
    const [lista,setLista]=useState([])
    const [tags,setTags]=useState([])

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
        const {resp,dias}=funcCerta(dados,cont,sono)
        setLista(resp)
        setTags(dias)
        setTimeout(scrollToEnd,1);
    }
    useEffect(()=>{localStorage.setItem("sono", JSON.stringify(sono))},[sono])
    useEffect(()=>{localStorage.setItem("zoom", JSON.stringify(zoom))},[zoom])
    useEffect(construirLista,[tipo,zoom,sono])
    return(mini?
        <Quadrinho id={id}>
                {lista.map((tam,index)=><Holder>
                    <Barrinha  cor={tam===99?'#5ed2d6':tam==88?'#2828c9':'#1fb71f'} tam={tam*zoom*4}>
                        <Tag>{tags[index]?.slice(0,3)||''}</Tag>
                    </Barrinha>
                    {tam==88||tam==99?<></>:<p>{tam}</p>}
                    
                </Holder>)}
            </Quadrinho>:
        <Tela>
            <Cab>
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
            <h1>{nome}</h1>
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
            <Quadro id={id}>
                {lista.map((tam,index)=><Holder>
                    <Barrinha  cor={tam===99?'#5ed2d6':tam==88?'#2828c9':'#1fb71f'} tam={tam*zoom*10}>
                        <Tag>{tags[index]?.slice(0,3)||''}</Tag>
                    </Barrinha>
                    {tam==88||tam==99?<></>:<p>{tam}</p>}
                    
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
width:100%;height:50px;align-items:center;
justify-content:space-evenly
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
h1{margin:0;font-size:20px;font-weight:600;}
`
const Quadro=styled.div`
height:calc(100% - 110px);width:calc(100% - 40px);
border:1px solid black;padding-left:10px;
overflow:auto;border-radius:7px;
`
const Barrinha=styled.div`
height:${p=>p.tam}px;width:100%;max-height:100%;
background:${p=>p.cor};
border-top-right-radius:5px;
border-top-left-radius:5px;
display:flex;flex-direction:column;
justify-content:flex-end;align-items:center;
`
const Holder=styled.div`
min-width:25px;
height:100%;flex-direction:column-reverse;
justify-content:flex-start;align-items:center;
margin-right:10px;

p{font-weight:600;
font-size:17px;width:100%;text-align:center;
margin:0;margin-right:1px;
}
`
const Tag=styled.div`
font-size:11px;font-weight:500;color:white;
`