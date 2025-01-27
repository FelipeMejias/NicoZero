import { useState } from "react"
import styled from "styled-components"
import { queHorasSao } from "./back/utils"
import Mostrador from "./Mostrador"

export default function Home({contexto}){
    const {texto1,texto2,texto3,texto4,
        pag,setPag,dados,setDados,cont,setCont}=contexto
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
        setPag(0)
    }
    function voltar(){
        setPag(0)
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
        <Tela>
            <Cab>
                <Mudar onClick={voltar}>Voltar</Mudar>
                <Mudar onClick={copiarTexto}>{copiado?'Copiado!':'Copiar'}</Mudar>
                <Mudar onClick={handleColar}>Colar</Mudar>
                <Mudar onClick={remover}>Remover</Mudar>
                <Mudar onClick={salvar}>Salvar</Mudar>
            </Cab>
            <Mostrador cont={contProv} dados={dadosProv}/>
        </Tela>
        <Menu>
        </Menu>
    </Inicial>
    )
}
const Inicial=styled.div`
height:100vh;width:100vw;background:purple;
`
const Botao=styled.div`
height:80px;width:90%;
background:white;border-radius:20px;
cursor:pointer;margin-bottom:20px;
justify-content:center;align-items:center;
p{font-size:18px;text-align:center;}
`
const Menu=styled.div`
flex-direction:column;
height:100vh;width:200px;
padding-top:50px;
`
const Cab=styled.div`
width:400px;height:60px;align-items:center;
justify-content:space-evenly;
`
const Mudar=styled.div`
height:50px;width:90%;
background:yellow;border-radius:20px;
cursor:pointer;margin:0 10px 0 10px;
justify-content:center;align-items:center;
p{font-size:18px;text-align:center;}
`
const Tela=styled.div`
flex-direction:column;
max-width:500px;
height:100%;width:calc(100% - 200px);
justify-content:space-evenly;align-items:center;
h1{margin:0;font-size:20px;}
`