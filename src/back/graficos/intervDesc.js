import { calcularDiferenca, nomeDiaInicio, proximoDia } from "../utils";

export function intervaloDescartes(dados,cont,minimoSono){
    const listaDesc = [];
    for (let l of dados) {if (l[1] !== '0000') listaDesc.push(l[1]);}
    
    let anterior = false;
    const resp = [];
    const diaInicio=nomeDiaInicio(cont)
    const dias=[diaInicio]
    let diaColocado=diaInicio
    let horaPraVirar=listaDesc[0]
    for (let h of listaDesc) {
        if(h==''){
            if(resp[resp.length-1]!==99)resp.push(99)
            continue
        }
        if (anterior!==false) {
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