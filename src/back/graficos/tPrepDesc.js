import { calcularDiferenca, nomeDiaInicio, proximoDia } from "../utils_time";

export function tempoPrepDesc(dados,cont,minimoSono){
    console.log(dados)
    let last 
    const resp = []
    let diaAseguir=nomeDiaInicio(cont)
    for(let linha of dados){
        if(isNaN(parseInt(linha[0]))){
            resp.push({tam:99,tex:linha})
        }else{
            const [i,f]=linha
            if(f){
                let dia
                if(i<last || resp.length==0 || f<i){
                    dia=diaAseguir
                    diaAseguir=proximoDia(diaAseguir)
                }
                const {tam,num}=calcularDiferenca(i,f)
                if(calcularDiferenca(last,i).tam>minimoSono){
                    resp.push({tam:88})
                }
                resp.push({tam,num,tex:dia?.toUpperCase()?.slice(0,3)})
            }
            last=f||i
        }
    }
    return resp
}