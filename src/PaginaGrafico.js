import styled from "styled-components"
import { Grafico } from "./Grafico"
import { useNavigate } from "react-router-dom"

export default function PaginaGrafico({contexto}){
    const {texto1,texto2,texto3,texto4,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const navigate=useNavigate()
    return(
    <Inicial>
        <Outras>
            <Outra selec={pag==1} onClick={()=>setPag(1)}><p>{texto1}</p></Outra>
            <Outra selec={pag==2} onClick={()=>setPag(2)}><p>{texto2}</p></Outra>
            <Outra selec={pag==3} onClick={()=>setPag(3)}><p>{texto3}</p></Outra>
            <Outra selec={pag==4} onClick={()=>setPag(4)}><p>{texto4}</p></Outra>
        </Outras>
        <Holder>
            <Grafico id='unico' cont={cont} dados={dados} tipo={pag} nome={
                pag==1?texto1:
                pag==2?texto2:
                pag==3?texto3:
                pag==4?texto4:'' }>
            </Grafico>
        </Holder>
    </Inicial>
    
    )
}
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
height:80px;width:100%;
justify-content:space-evenly;
align-items:center;
`

const Inicial=styled.div`
height:calc(100% - 50px);width:100%;
flex-direction:column;align-items:center;
`

const Holder=styled.div`
width:calc(100% - 40px);height:calc(100% - 150px)
`
