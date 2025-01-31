import styled from "styled-components"
import { Grafico } from "./Grafico"
import { useNavigate } from "react-router-dom"
import { queHorasSao } from "./back/utils_time"
import { useEffect } from "react"
import  GraficoH from "./GraficoH"

export default function PaginaGrafico({contexto}){
    const {texto1,texto2,texto3,texto4,orientado,setOrientado,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const aoLixo=dados[dados.length-1].length==1
    const temProximo=aoLixo?[2,3]:[1,4]
    const cravado=temProximo.includes(pag)
    function infosComAgora(){
        const novaLista=[...dados]
        const ultimo=dados[dados.length-1]
        const codigo= queHorasSao()
        if(ultimo.length==1){
            novaLista.pop()
            novaLista.push([ultimo[0],codigo])
        }else{
            novaLista.push([codigo])
        }
        return novaLista
    }
    function gerarDados(){
        if(cravado){
            return infosComAgora()
        }else{
            return dados
        }
    }
    useEffect(()=>{setInterval(() => {
        console.log('PaginaGrafico!')
        }, 1* 60 * 1000)},[])
    return(orientado?<Wraper>
        <GraficoH id='unico' 
            dados={gerarDados()}
            cont={cont}
            contexto={contexto}
            orientado={orientado}
            setOrientado={setOrientado}
            cravado={cravado}
            tipo={pag} nome={
                pag==1?texto1:
                pag==2?texto2:
                pag==3?texto3:
                pag==4?texto4:'' }>
            </GraficoH>
    </Wraper>:
    <Inicial>
        <Outras>
            <Outra selec={pag==1} onClick={()=>setPag(1)}><p>{texto1}</p></Outra>
            <Outra selec={pag==2} onClick={()=>setPag(2)}><p>{texto2}</p></Outra>
            <Outra selec={pag==3} onClick={()=>setPag(3)}><p>{texto3}</p></Outra>
            <Outra selec={pag==4} onClick={()=>setPag(4)}><p>{texto4}</p></Outra>
        </Outras>
        <Holder>
            <Grafico id='unico' 
            dados={gerarDados()}
            cont={cont}
            orientado={orientado}
            setOrientado={setOrientado}
            cravado={cravado}
            tipo={pag} nome={
                pag==1?texto1:
                pag==2?texto2:
                pag==3?texto3:
                pag==4?texto4:'' }>
            </Grafico>
        </Holder>
    </Inicial>
    
    )
}
const Wraper=styled.div`
min-height:100vw;min-width:100vh;
max-height:100vw;max-width:100vh;
position:absolute;top:0;
flex-direction:column;align-items:center;
overflow-x:auto;
transform:rotate(90deg);
transform-origin:center center;
`
const Outra=styled.div`
height:55%;
min-width:calc(25% - 15px);
max-width:calc(25% - 15px);
background:white;border-radius:10px;
opacity:${p=>p.selec?'30%':'100%'};
cursor:pointer;
justify-content:center;align-items:center;
p{font-size:16px;text-align:center;line-height:16px;
 word-wrap: break-word; 
  overflow-wrap: break-word; 
  white-space: normal; 
}
`
const Outras=styled.div`
height:80px;width:calc(100% - 40px);
justify-content:space-between;
align-items:center;
`

const Inicial=styled.div`
height:100%;width:100vw;
flex-direction:column;align-items:center;
`

const Holder=styled.div`
width:calc(100% - 40px);height:calc(100% - 150px)
`
