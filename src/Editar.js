import { useState } from "react"
import styled from "styled-components"
import { queHorasSao } from "./back/utils"
import Mostrador from "./Mostrador"
import { useNavigate } from "react-router-dom"

export default function Home({contexto}){
    const {texto1,texto2,texto3,texto4,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const navigate=useNavigate()
    const [dadosProv,setDadosProv]=useState(dados)
    const [contProv,setContProv]=useState(cont)

    const [copiado,setCopiado]=useState(false)
    const handleColar = async () => {
    try {
        const textoColado = await navigator.clipboard.readText();
        const linhas=textoColado.split('\n')
        const lis=[]
        setContProv(linhas[0].replace('\r',''))
        for(let linha of linhas.slice(1)){
            const linhaPronta=linha.replace('\r','')
            lis.push(linhaPronta.split(','))
        }
        setDadosProv(lis)
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
            <Mostrador wi={'calc(100% - 140px)'} hei={'90%'} cont={contProv} dados={dadosProv}/>
            <Cab>
                <Mudar cor={'#e07421'} onClick={voltar}><p>Voltar</p></Mudar>
                <Sep>
                <Mudar onClick={copiarTexto}><p>{copiado?'Copiado!':'Copiar'}</p></Mudar>
                <Mudar onClick={handleColar}><p>Colar</p></Mudar>
                <Mudar onClick={remover}><p>Remover</p></Mudar>
                </Sep>
                <Mudar cor={'#3a6ac9'} onClick={salvar}><p>Salvar</p></Mudar>
            </Cab>
            
    </Inicial>
    )
}
const Inicial=styled.div`
height:calc(100% - 50px);width:100%;padding-top:30px;
align-items:center;justify-content:center;
`
const Sep=styled.div`
flex-direction:column;width:100%;align-items:center;
justify-content:space-between;height:180px;
`
const Cab=styled.div`
flex-direction:column;margin-left:20px;
width:100px;height:90%;align-items:center;
justify-content:space-between;
`
const Mudar=styled.div`
height:50px;width:90%;
background:${p=>p.cor||'yellow'};border-radius:20px;
cursor:pointer;margin:0 10px 0 10px;
justify-content:center;align-items:center;
p{font-size:18px;text-align:center;color:${p=>p.cor?'white':'black'}}
`
