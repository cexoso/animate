import { expect } from 'chai';
import { describe, it } from "mocha";
import { spy } from "sinon";
import { toNumber,max, eq } from "lodash"
import {
    create
} from "../src/engine.js";
describe('engine', function () {
    it('create is a function to create a animate platform', function () {
        expect(create).to.be.a("function");
        const platform = create();
        expect(platform).to.has.property("run").to.be.a("function");
        expect(platform).to.has.property("descript").to.be.a("function");
        expect(platform).to.has.property("pause").to.be.a("function");
        expect(platform).to.has.property("start").to.be.a("function");
    });

    it('descript function accept a function which to execute once by once until stop.', function (done) {
        describe('descript has beed call after start.', function () {
            const platform = create();
            const descriptSpy = spy();
            platform.descript(descriptSpy);
            const runtime = platform.start();
            const subscribeSpy = spy();
            runtime.subscribe(subscribeSpy)
            setTimeout(() => {
                expect(subscribeSpy.called).to.be.true
                platform.stop();
                done();
            }, 100);
            it("descriptSpy should be called", function () {
                expect(descriptSpy.called).to.be.true;
            })
        })
    })
    it("simulation free-faller.fall from 10m hight;", function (done) {
        const platform = create();
        function descript({ handle, time: { during } }) {
            const t = during / 1000;
            const s = max([10 - 0.5 * g * t * t, 0]);
            if (eq(s, 0)) {
                handle.stop();
            }
            return {s: s.toFixed(2),t}
        }
        const g = 9.8
        const runtime = platform.descript(descript)
            .start();
        const trace = []
        runtime.subscribe(({s,t}) => {
            if (eq(toNumber(s),0)) {
                expect(t).to.closeTo(1.44,0.01)
                done();
            }
        })
    })
});
