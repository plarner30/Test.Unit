import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/test-component/test-component'),
  ]);
}
