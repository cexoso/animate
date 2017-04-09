import { expect } from 'chai';
import { describe, it } from "mocha";
import { spy } from "sinon";
import {
    singletonDriverCreate
} from "../src/driver.js"
describe('singletonDriverCreate', function () {
    it('singletonDriverCreate can only create singleton driver', function () {
        const driverOne = singletonDriverCreate();
        const driverTwo = singletonDriverCreate();
        expect(driverOne).to.eq(driverTwo);
    });
    
    it('singletonDriverCreate start', function (done) {
        const driver = singletonDriverCreate();
        const runner = driver.start();
        const fnSpy = spy();
        const fnSpy1 = spy();
        runner.subscribe(fnSpy)
        setTimeout(()=>{
            expect(fnSpy.called).to.be.true;
            driver.stop();
            expect(fnSpy.called).to.be.true;
            done()
        },100)
    });
    it('singletonDriverCreate stop', function (done) {
        const driver = singletonDriverCreate();
        const runner = driver.start();
        const fnSpy = spy();
        runner.subscribe(fnSpy)
        driver.stop();
        setTimeout(()=>{
            expect(fnSpy.called).to.be.false;
            done()
        },100)
    });
    
});
