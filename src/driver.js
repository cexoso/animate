import { Subject, Observable } from "rx";
import { partial,eq,map, property, memoize,remove,flowRight } from "lodash"
function intervalTickCreate(callback) {
    const handle = setInterval(callback, 5);
    return {
        stop() {
            clearInterval(handle);
        }
    }
}
class SingletonDriver {
    constructor() {
        this.instances = []
    }
    init() {
        const perTick = () => {
            map(this.instances, ({ subject }) => {
                subject.onNext();
            })
        }
        if (!this.isInit) {
            this.isInit = true;
            this.tickHandle = intervalTickCreate(perTick);
        }
    }
    start(id) {
        this.init()
        const subject = new Subject();
        this.instances.push({
            subject,
            id
        })        
        return subject;
    }

    stop(id) {
        const isCurrentId = partial(eq,id);
        remove(this.instances,flowRight(isCurrentId,property("id")))
    }
}

let singletonDriver = null;
export function singletonDriverCreate() {
    if (singletonDriver) {
        return singletonDriver
    }
    singletonDriver = new SingletonDriver();
    return singletonDriver;
}