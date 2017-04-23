import {property,map,split,size,head,get,chain,at} from "lodash"
export function urlToQuery(url) {
    const queryStr = get(url.match(/(\?)(.*?)(?=#|$)/),2)
    const mapKV = str => {
        const obj = split(str,"=");
        return {
            name: get(obj,"0"),
            value: get(obj,"1","")
        };
    }
    return chain(queryStr)
            .split("&")
            .map(mapKV)
            .groupBy(property("name"))
            .mapValues(o=>{
                const values = map(o,"value");
                return size(values) > 1 ? values : head(values)
            })
            .value()
}
