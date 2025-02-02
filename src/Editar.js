import { useEffect, useState } from "react"
import styled from "styled-components"
import { queHorasSao, transfLinha } from "./back/utils_convert"
import Mostrador from "./Mostrador"
import { useNavigate } from "react-router-dom"
import { LucideArrowLeft, LucideCheck, LucideCopy, LucideCopyCheck, LucideEraser, LucideHardDriveDownload, LucideSave, LucideUpload } from "lucide-react"

export default function Home({contexto}){
    const {texto1,texto2,texto3,texto4,
        dadosProv,setDadosProv,contProv,setContProv,
        pag,setPag,dados,setDados,cont,setCont}=contexto
    const navigate=useNavigate()
    

    
    const [texto,setTexto]=useState('')
    function add(){
        const novaLista=[...dadosProv]
        const ultimo=dadosProv[dadosProv.length-1]
        if(ultimo.length==1){
            novaLista.pop()
            novaLista.push([ultimo[0],transfLinha(texto)])
        }else{
            novaLista.push([transfLinha(texto)])
        }
        setDadosProv(novaLista)
        setTexto('')
    }
    function editarInput(e){
        const nova=e.target.value
        if(nova.length==5)return
        if(!isNaN(parseInt(nova)) || nova=='')setTexto(nova)
    }
    const handleColar = async () => {
    try {
        const textoColado = await navigator.clipboard.readText();
        const linhas=textoColado.split('\n')
        const final=[]
        setContProv(linhas[0].replace('\r',''))
        for(let linhaCrua of linhas.slice(1)){
            const linha=linhaCrua.replace('\r','')
            if(!linha)continue
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
    
    function salvar(){
        setDados(dadosProv)
        setCont(contProv)
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
    useEffect(()=>{setDadosProv(dados)},[])
    return(
        <Inicial>
            <Cab>
                {/*<Mudar cor={'#e07421'} onClick={voltar}><LucideArrowLeft  style={{cursor:'pointer'}} size={25} color={'white'}/><p>Back</p></Mudar>*/}
                <Novo>
                    <input
                        value={texto}
                        onChange={(e)=>editarInput(e)}
                        placeholder={'0000'}
                    />
                    <Mudar onClick={add}>
                        <LucideCheck  style={{cursor:'pointer'}} size={25} color={'black'}/>
                        <p>Add</p>
                    </Mudar>
                    <Mudar onClick={remover}>
                        <LucideEraser  style={{cursor:'pointer'}} size={25} color={'black'}/>
                        <p>Erase</p>
                    </Mudar>
                </Novo>
                <Mudar onClick={handleColar}>
                    <LucideHardDriveDownload  style={{cursor:'pointer'}} size={25} color={'black'}/>
                    <p>Paste</p>
                </Mudar>
                <Mudar cor={'#3a6ac9'} onClick={salvar}>
                    <LucideSave  style={{cursor:'pointer'}} size={25} color={'white'}/>
                    <p>Save</p>
                </Mudar>
            </Cab>
            <Mostrador wi={'calc(100% - 120px)'} hei={'calc(100% - 80px)'} cont={contProv} dados={dadosProv}/>
    </Inicial>
    )
}
const Novo=styled.div`
flex-direction:column;
height:170px;
align-items:center;
justify-content:space-between;
`
const Inicial=styled.div`
height:100%;width:100%;
padding-top:30px;
align-items:flex-start;justify-content:space-evenly;
input{
width:50px;height:30px;font-size:18px;
background:green;color:white;padding-left:8px;
border:0;border-radius:5px;
}
input::placeholder {
  color: rgb(255,255,255,0.6); 
}
`
const Sep=styled.div`
flex-direction:column;width:100%;align-items:center;
justify-content:space-between;height:130px;
`
const Cab=styled.div`
flex-direction:column;
width:58px;height:calc(100% - 80px);align-items:center;
justify-content:space-between;
`
const Mudar=styled.div`
flex-direction:column;
height:58px;width:58px;
background:${p=>p.cor||'yellow'};
border-radius:200px;
cursor:pointer;
justify-content:center;align-items:center;
p{margin:0;font-size:12px;text-align:center;color:${p=>p.cor?'white':'black'}}
`
