import {replace,reduce,padStart,size} from "lodash"
export function dateFormat(pattern,date) {
    const fullYear = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const map = {
        "y+": fullYear,
        "M+": month,
        "d+": day,
        "h+": hours,
        "m+": minutes,
        "s+": seconds
    }
    return reduce(map,(acc,value,key)=>replace(acc,new RegExp(key,"g"),(p)=>padStart(value,size(p),0)),pattern);
}