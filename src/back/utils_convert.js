export function transfLinha(raw){
    const str=raw.replace(/\s/g, "")
    const tam=str.length
    if(str.includes(':')){
        const l=str.split(':')
        return `${String(l[0]).padStart(2, '0')}${String(l[1]).padStart(2, '0')}`;
    }else if(tam==4){
        return str
    }else if(tam==3){
        return `0${str}`
    }else if(tam==2){
        return `${str}00`
    }else if(tam==1){
        return `0${str}00`
    }
}