import { calcularDiferenca, nomeDiaInicio, proximoDia } from "./utils";

export function mostrar(dados,cont){
    const lista=dados.map(lis=>{
        const [i,f]=lis
        const verde=i?`${i.slice(0,2)}:${i.slice(2,4)}`:''
        const vermelho=f?`${f.slice(0,2)}:${f.slice(2,4)}`:''
        return [verde,vermelho]
    })
    const diaComeco=nomeDiaInicio(cont)
    const resp=[diaComeco]

    let anterior=false
    let diaColocado=diaComeco
    for(let lis of lista){
        const [i,f]=lis
        if(!i && f){
            if(resp[resp.length-1]=='SEM DADOS' && resp[resp.length-2][0]>f ){
                diaColocado=proximoDia(diaColocado)
                resp.push(diaColocado)
            }
            resp.push(lis)


        }else if(resp[resp.length-1]=='SEM DADOS' && resp[resp.length-2][0]>f ){
            diaColocado=proximoDia(diaColocado)
            resp.push(diaColocado)
        }else if(!i && !f){
            resp.push('SEM DADOS')
        }else if(i && anterior && anterior>i ){

            diaColocado=proximoDia(diaColocado)
            resp.push(diaColocado)

            resp.push(lis)
        }else if(f && (!i ||f<i)){
            resp.push([i,''])

            diaColocado=proximoDia(diaColocado)
            resp.push(diaColocado)

            resp.push(['',f])
        }else{
            resp.push(lis)
        }
        
        if(f)anterior=f
    }
    return resp
}