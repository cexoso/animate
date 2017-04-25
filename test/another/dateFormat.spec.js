import { expect } from 'chai';
import { describe, it } from "mocha";
import {dateFormat} from "../../src/dateFormat"
import {split,last,get} from "lodash"
describe('dateFormat', function () {
    it('dateFormat', function () {
        const date = new Date(2017,3,2,16,30,20) // 2017-04-02 16:30:20
        expect(dateFormat("yyyy-MM-dd hh:mm:ss",date)).to.be.eq("2017-04-02 16:30:20")
        expect(dateFormat("yyyyyyyxMMMM  dd hh:mm:ss",date)).to.be.eq("0002017x0004  02 16:30:20")
    });
});
