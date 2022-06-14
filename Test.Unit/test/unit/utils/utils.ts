import { StageComponent, ComponentTester } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";
import { PLATFORM } from "aurelia-pal";

export class FixtureBase{
  component : ComponentTester<any>;
  module : string;
  template : string;
  componentName : string;
  createViewModel : () => any;
  viewModel : any;
  constructor(componentName : string, module: string, template : string, createViewModel : () => any = null){
    this.module = module;
    this.template = template;
    this.componentName = componentName;
    this.createViewModel = createViewModel;
  }

  async start(){
    this.component = StageComponent.withResources(this.module)
                                   .inView(this.template);
    if(this.createViewModel){
      this.viewModel = this.createViewModel();
      this.component = this.component.boundTo(this.viewModel);
    }
      

    this.component.bootstrap(aurelia => aurelia.use.standardConfiguration().feature(PLATFORM.moduleName('resources/index')));
    await this.component.create(bootstrap);
    this.onInitialized();
  }

  onInitialized(){}

  async stop(){
    this.component.dispose();
    this.component = null;
  }

  wait() : Promise<any> {
    return wait();
  }
}

export function wait()  : Promise<any> {
  return new Promise<void>((resolve, reject) => setTimeout(() => resolve(), 0));
}

export function testComponent<T extends FixtureBase>(fixture : T, execute : (fixture : T) => void){
  describe(fixture.componentName, () => {
    beforeEach(async () => await fixture.start());

    afterEach(() => fixture.stop());
  
    execute(fixture);
  });
}
