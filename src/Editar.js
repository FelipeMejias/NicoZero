import { useState } from "react"
import styled from "styled-components"
import { queHorasSao, transfLinha } from "./back/utils"
import Mostrador from "./Mostrador"
import { useNavigate } from "react-router-dom"
import { LucideArrowLeft, LucideCopy, LucideCopyCheck, LucideEraser, LucideSave, LucideUpload } from "lucide-react"

export default function Home({contexto}){
    const {texto1,texto2,texto3,texto4,
        dadosProv,setDadosProv,contProv,setContProv,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const navigate=useNavigate()
    

    const [copiado,setCopiado]=useState(false)

    const handleColar = async () => {
    try {
        const textoColado = await navigator.clipboard.readText();
        const linhas=textoColado.split('\n')
        const final=[]
        setContProv(linhas[0].replace('\r',''))
        for(let linhaCrua of linhas.slice(1)){
            const linha=linhaCrua.replace('\r','')
            if(isNaN(parseInt(linha[0]))){
                final.push(linha)
            }else{
                const lis=linha.split(',')
                if(lis[1]===undefined){
                    final.push([transfLinha(lis[0])])
                }else{
                    final.push([transfLinha(lis[0]),transfLinha(lis[1])])
                }
            }
        }
        setDadosProv(final)
    } catch (err) {
        console.error('Erro ao acessar a área de transferência', err);
    }
    };
    function copiarTexto(){
        let str=``
        str+=`${cont}\n`
        for(let linha of dados){
            str+=`${linha[0]}${linha[1]?`,${linha[1]}`:''}\n`
        }
        navigator.clipboard.writeText(str).then(() => {setCopiado(true);setTimeout(() => setCopiado(false), 2000)}).catch(err => console.error('Erro ao copiar o texto: ', err));
    }
    function salvar(){
        setDados(dadosProv)
        setCont(contProv)
        navigate('/history')
    }
    function voltar(){
        navigate('/history')
    }
    function remover(){
        const nl=[...dadosProv]
        const ultimo=nl[nl.length-1]
        if(ultimo.length==1){
            nl.pop()
        }else{
            nl.pop()
            nl.push([ultimo[0]])
        }
        
        setDadosProv(nl)
    }
    return(
        <Inicial>
            <Mostrador wi={'calc(100% - 140px)'} hei={'calc(100% - 80px)'} cont={contProv} dados={dadosProv}/>
            <Cab>
                <Mudar cor={'#e07421'} onClick={voltar}>
                <LucideArrowLeft  style={{cursor:'pointer'}} size={25} color={'white'}/>
                </Mudar>
                <Sep>
                <Mudar onClick={copiarTexto}>
                    {copiado?<LucideCopyCheck  style={{cursor:'pointer'}} size={25} color={'black'}/>
                    :<LucideCopy  style={{cursor:'pointer'}} size={25} color={'black'}/>}
                    <p>{copiado?'Copiado!':'Copiar'}</p>
                    </Mudar>
                <Mudar onClick={handleColar}>
                    <LucideUpload  style={{cursor:'pointer'}} size={25} color={'black'}/>
                </Mudar>
                <Mudar onClick={remover}>
                    <LucideEraser  style={{cursor:'pointer'}} size={25} color={'black'}/>
                </Mudar>
                </Sep>
                <Mudar cor={'#3a6ac9'} onClick={salvar}>
                <LucideSave  style={{cursor:'pointer'}} size={25} color={'white'}/>
                </Mudar>
            </Cab>
            
    </Inicial>
    )
}
const Inicial=styled.div`
height:calc(100% - 50px);width:100%;padding-top:30px;
align-items:flex-start;justify-content:space-evenly;
`
const Sep=styled.div`
flex-direction:column;width:100%;align-items:center;
justify-content:space-between;height:210px;
`
const Cab=styled.div`
flex-direction:column;
width:62px;height:calc(100% - 80px);align-items:center;
justify-content:space-between;
`
const Mudar=styled.div`
flex-direction:column;
height:62px;width:62px;
background:${p=>p.cor||'yellow'};
border-radius:200px;
cursor:pointer;
justify-content:center;align-items:center;
p{margin:0;font-size:12px;text-align:center;color:${p=>p.cor?'white':'black'}}
`
