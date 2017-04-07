import { expect } from 'chai';
import { describe, it } from "mocha";
import { spy } from "sinon";
import {
    create
} from "../src/engine.js"
describe('engine', function () {
    it('create is a function to create a animate platform', function () {
        expect(create).to.be.a("function");
        const platform = create();
        expect(platform).to.has.property("run").to.be.a("function");
        expect(platform).to.has.property("descript").to.be.a("function");
        expect(platform).to.has.property("pause").to.be.a("function");
        expect(platform).to.has.property("start").to.be.a("function");
    });

    it('descript function accept a function which to execute once by once until stop.', function () {
        describe('descript has beed call after start.', function () {
            const platform = create();
            function descript() {
                console.log(1)
            }
            const descriptSpy = spy(descript);
            platform.descript(descript);
            platform.start();
            it("descriptSpy should be called", function () {
                expect(descriptSpy.called).to.be.true;
            })
        })
    })

});
