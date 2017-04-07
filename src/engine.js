import {isError,attempt} from "lodash"
import {Subject} from "rx"
var subject = new Subject();
var subscription = subject.subscribe(
    x => console.log('onNext: ' + x),
    e => console.log('onError: ' + e.message),
    () => console.log('onCompleted'));

subject.onNext(1);
// => onNext: 1

subject.onNext(2);
// => onNext: 2

subject.onCompleted();
// => onCompleted

class platform {
    constructor() {

    }
    start() {
        const {description} = this;
        const ret = attempt(description);
        if (!isError(ret)) {
            // todo
        }        
    }
    run() {

    }
    descript(description) {
        this.description = description;
    }
    pause() {

    }
}
export function create() {
    return new platform()
}