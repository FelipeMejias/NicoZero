import { calcularDiferenca, nomeDiaInicio, proximoDia } from "../utils";

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
