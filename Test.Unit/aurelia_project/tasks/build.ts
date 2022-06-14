import { NPM, CLIOptions } from 'aurelia-cli';

export default function() {
  console.log('`au build` is an alias of the `npm run build:dev`, you may use either of those; see README for more details.');
  const args = process.argv.slice(3);
  return (new NPM()).run('run', ['build:dev', '--', ... cleanArgs(args)]).then(exitCode =>  {
    // loosely based on https://github.com/aurelia/cli/issues/903
    if (!CLIOptions.hasFlag('watch') && exitCode !== 0) {
      process.exit(exitCode);
    }
  });
}

// Cleanup --env prod to --env production
// for backwards compatibility
function cleanArgs(args) {
  const cleaned = [];
  for (let i = 0, ii = args.length; i < ii; i++) {
    if (args[i] === '--env' && i < ii - 1) {
      const env = args[++i].toLowerCase();
      if (env.startsWith('prod')) {
        cleaned.push('--env production');
      }
    } else {
      cleaned.push(args[i]);
    }
  }
  return cleaned;
}
