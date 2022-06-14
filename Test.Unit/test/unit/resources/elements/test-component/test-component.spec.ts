
import { testComponent } from "../../../utils/utils";
import { TestComponentFixture } from "./test-component-fixture";

class ViewModel{
  selectedItems = [];
  nullable = false;
}

describe('Test that pass', () => {

  beforeEach(() => {}); // ok

  it('test 1', done => {
    expect(true).toBe(true);      
  });
});

describe('Test that fail', () => {

  beforeEach(async () => {}); // fails

  it('test 2', done => {
    expect(true).toBe(true);      
  });
});

describe('Test that also fail', () => {

  testComponent(new TestComponentFixture(`<test-component></test-component>`, 
                                      () => new ViewModel()),
  fixture => {
    // Breaks due to similar beforeEach in \Test.Unit\Test.Unit\test\unit\utils\utils.ts
    it('test 3', done => {
      expect(true).toBe(true);
    });
  });
});


