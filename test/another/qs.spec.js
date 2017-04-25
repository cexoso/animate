import { expect } from 'chai';
import { describe, it } from "mocha";
import {urlToQuery} from "../../src/qs"
import qs from "querystring"
import {split,last,get} from "lodash"
describe('qs', function () {
    it('urlToQuery make url query to Object', function () {
        const url = "https://www.baidu.com/s?q&f=0&ie=utf-8&f=8&rsv_sug4=7392#qqw"
        const queryStr = get(url.match(/(\?)(.*?)(?=#|$)/),2);
        const expectQuery = qs.parse(queryStr)
        const myQuery = urlToQuery(url)
        expect(myQuery).to.be.eql(expectQuery)
    });
});
