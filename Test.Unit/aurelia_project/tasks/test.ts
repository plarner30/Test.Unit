import {Server as Karma} from 'karma';
import { parseConfig, Config } from 'karma/lib/config';
import { CLIOptions } from 'aurelia-cli';
import * as path from 'path';

let karma = done => {
  (parseConfig(
    path.join(__dirname, '/../../test/karma.conf.js'), 
    { singleRun: !CLIOptions.hasFlag('watch'), autoWatch: CLIOptions.hasFlag('watch')  }, 
    {promiseConfig: true, throwErrors: true}
  ) as Promise<Config>).then(
    (karmaConfig) => {
      new Karma(
        karmaConfig,
        function(exitCode) {
          console.log('Karma has exited with ' + exitCode)
          process.exit(exitCode)
        }
      ).start();
    }
  );
};

export { karma as default };
