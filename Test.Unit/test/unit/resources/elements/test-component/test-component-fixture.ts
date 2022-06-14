import { Button } from '../../../utils/button';
import { FixtureBase } from "../../../utils/utils";
import { PLATFORM } from "aurelia-pal";
import { Checkbox } from "../../../utils/checkbox";

export class TestComponentFixture extends FixtureBase{
  constructor(template : string, viewModel : () => any){
    super('DayEditor',
          PLATFORM.moduleName('resources/elements/test-component/test-component'),
          template,
          viewModel);
  }

  onInitialized(){
  }

  async expand(){
    await this.wait();
  }

  get displayValue(){
    return null;
  }
}
