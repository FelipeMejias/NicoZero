import { calcularDiferenca, nomeDiaInicio, proximoDia } from "./utils";

export function mostrar(dados,cont){
    console.log(dados)
    let diaAseguir=nomeDiaInicio(cont)
    const resp=[]
    let last=Infinity
    for(let lis of dados){
        console.log(lis)
        if(typeof lis == 'string'){
            resp.push(lis)
        }else{
            const [i,f]=lis
            if(i<last){
                resp.push(diaAseguir)
                diaAseguir=proximoDia(diaAseguir)
            }
            const verde=i?`${i.slice(0,2)}:${i.slice(2,4)}`:''
            const vermelho=f?`${f.slice(0,2)}:${f.slice(2,4)}`:''
            resp.push([verde,vermelho])
            if(i>f){
                resp.push(diaAseguir)
                diaAseguir=proximoDia(diaAseguir)
            }
            if(f && f.length>0){
                last=f
            }else{
                last=i
            }
           
        }
    }
    return resp
}