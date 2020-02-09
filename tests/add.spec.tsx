import chai from 'chai';
import { add } from '../src/test';

const expect = chai.expect;

describe('utils', () => {

    it('add', () => {
        expect(add(1, 2)).to.eq(3);
    });
});
