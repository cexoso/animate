import { defer, isError, attempt, merge, now } from "lodash"
import { Subject } from "rx"
import { singletonDriverCreate } from "./driver"
const singleton = singletonDriverCreate()
function stop() {

}
class platform {
    constructor() {
        this.subject = new Subject();
    }
    start() {
        const { description } = this;
        const startTime = now();
        singleton.start(this).subscribe(() => {
            const nowTime = now();
            const during = nowTime - startTime;
            const ret = attempt(description, merge({ time: { startTime, nowTime, during } }, { handle: this }));
            if (!isError(ret)) {
                this.subject.onNext(ret);
            }
        })
        return this.subject;
    }
    run() {

    }
    descript(description) {
        this.description = description;
        return this;
    }
    pause() {

    }
    stop() {
        defer(() => {
            attempt(() => singleton.stop(this));
            attempt(() => this.subject.dispose());
        })
    }
}
export function create() {
    return new platform()
}