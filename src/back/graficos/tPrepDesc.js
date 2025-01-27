import { calcularDiferenca, nomeDiaInicio, proximoDia } from "../utils";

export function tempoPrepDesc(dados,cont,minimoSono){
    const resp = [];
    const diaInicio=nomeDiaInicio(cont)
    const dias=[diaInicio]
    let diaColocado=diaInicio
    let horaPraVirar=dados[0][0]

    let c = 0;
    let final=false
    for (let l of dados) {
        if(l[0]==''&&l[1]==''){
            if(resp[resp.length-1]!==99){
                resp.push(99)
                dias.push('')
            }
            continue
        }
        if (c) {
            if(final){
                const dormiu=calcularDiferenca(final,l[0])
                if(dormiu && dormiu>minimoSono){
                    resp.push(88)
                    dias.push('')
                }
            }

            const barra=calcularDiferenca(l[0],l[1])
            if(!barra){
                
            }else if(barra>minimoSono){
                resp.push(88)
            }else{
                resp.push(barra)
            }

            if(l[1]<horaPraVirar){
                diaColocado=proximoDia(diaColocado)
                dias.push(diaColocado)

            }else{
                dias.push('')
            }
            horaPraVirar=l[1]

        }
        c += 1
        final=l[1]
    }
    return {resp,dias}
    
}