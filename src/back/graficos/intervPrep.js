import { calcularDiferenca, nomeDiaInicio, proximoDia, transformar } from "../utils";

export function intervaloPreparos(dados,cont,minimoSono) {
    let last 
    const resp = []
    let diaAseguir=nomeDiaInicio(cont)
    for(let linha of dados){
        if(isNaN(parseInt(linha[0]))){
            resp.push({tam:99,tex:linha})
        }else{
            const [i,f]=linha
            if(last){
                let dia
                if(i<last || resp.length==0){
                    dia=diaAseguir
                    diaAseguir=proximoDia(diaAseguir)
                }
                const {tam,num}=calcularDiferenca(last,i)
                resp.push({tam,num,tex:dia?.toUpperCase()?.slice(0,3)})
            }
            last=i
        }
    }
    return resp
}
/*
export function intervaloPreparos(dados,cont,minimoSono) {
    const listaPrep = [];
    for (let l of dados) {if (l[0] !== '0000') listaPrep.push(l[0]);}

    let anterior = false;
    const resp = [];
    const diaInicio=nomeDiaInicio(cont)
    const dias=[diaInicio]
    let diaColocado=diaInicio
    let horaPraVirar=listaPrep[0]
    for (let h of listaPrep) {
        if(h==''){
            if(resp[resp.length-1]!==99)resp.push(99)
            continue
        }
        if (anterior) {
            const barra=calcularDiferenca(anterior,h)
            if(!barra){
                
            }else if(barra>minimoSono){
                resp.push(88)
            }else{
                resp.push(barra)
            }

            if(h<horaPraVirar){
                diaColocado=proximoDia(diaColocado)
                dias.push(diaColocado)

            }else{
                dias.push('')
            }
            horaPraVirar=h

        }
        anterior = h; 
    }
    return {resp,dias}
}
    */
