import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/pt-br'
import { diasSemana } from './info'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('pt-br')
export function queHorasSao(){
    return dayjs().tz('America/Sao_Paulo').format('HHmm') 
}
export function queDiaEh(){
    return dayjs().tz('America/Sao_Paulo').format('YYYY-MM-DD') 
}
export function nomeDiaInicio(cont) {
    const dia = dayjs(cont).tz('America/Sao_Paulo').format('dddd').replace('-feira','')
    return dia[0].toUpperCase()+dia.slice(1)
}
export function proximoDia(diaAtual) {
    const indexAtual = diasSemana.findIndex((dia) => dia === diaAtual)
    if (indexAtual === -1) {throw new Error('Dia inválido! ')}
    const indexProximo = (indexAtual + 1) % diasSemana.length
    return diasSemana[indexProximo]
}

export function calcularDiferenca(a,h){

    let time1 = dayjs(`2025-01-01 ${a}`, 'YYYY-MM-DD HHmm')
    let time2 = dayjs(`2025-01-01 ${h}`, 'YYYY-MM-DD HHmm')
    if (time2.isBefore(time1)) {
        time2 = time2.add(1, 'day')
    }
    const dif = time2.diff(time1, 'hour', true)
    const num=transformarEmTempo(dif)
    return {tam:dif,num,texto:`${a?.slice(0,2)}:${a?.slice(2,4)} até ${h?.slice(0,2)}:${h?.slice(2,4)}`}
}
export function diferencaDeTempo(horaString) {
    try{
        const agora = dayjs().tz('America/Sao_Paulo'); // Hora atual com fuso horário
        let horaFornecida = dayjs().tz('America/Sao_Paulo').set('hour', parseInt(horaString.slice(0, 2))).set('minute', parseInt(horaString.slice(2)));
        if (horaFornecida.isAfter(agora)) {
        horaFornecida = horaFornecida.subtract(1, 'day');
        }
        const diferencaMinutos = agora.diff(horaFornecida, 'minute');
        const horas = Math.floor(diferencaMinutos / 60);
        const minutos = diferencaMinutos % 60;
        return `${String(horas).padStart(1)}:${String(minutos).padStart(2, '0')}`;
    }catch(e){
        console.log(e)
        return undefined
    }
    
}
export function transformarEmTempo(numero){
    const horas=Math.floor(numero / 1)
    const fracao=numero % 1
    const minutos=(fracao*60).toFixed(0)
    const m=minutos.length==1?`0${minutos}`:minutos
    return {h:horas,m}
}

