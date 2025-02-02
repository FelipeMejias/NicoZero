import { calcularDiferenca, nomeDiaInicio, proximoDia } from "../utils_time";

export function intervaloDescartes(dados,cont,minimoSono){
    let last 
    const resp = []
    let diaAseguir=nomeDiaInicio(cont)
    for(let linha of dados){
        if(isNaN(parseInt(linha[0]))){
            resp.push({tam:99,tex:linha})
        }else{
            const [i,f]=linha
            if(f){
                if(last){
                    let dia
                    if(i<last || resp.length==0|| f<i){
                        dia=diaAseguir
                        diaAseguir=proximoDia(diaAseguir)
                    }
                    const obj=calcularDiferenca(last,f)
                    resp.push({...obj,tex:dia?.toUpperCase()?.slice(0,3)})
                }
                last=f
            }
        }
    }
    return resp
}