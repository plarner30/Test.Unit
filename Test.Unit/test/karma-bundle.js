import 'aurelia-polyfills';
import 'aurelia-loader-webpack';
import jasmineAsyncInstall from 'jest-jasmine2/build/jasmineAsyncInstall.js';
import * as jasmineRequire from "jasmine-core/lib/jasmine-core/jasmine.js";


// const jasmineRequire = require('./jasmine-core/jasmine.js');

window.testing = jasmineRequire;

// jasmineRequire.QueueRunner.prototype.attempt = function attempt(iterativeIndex) {

//   console.log('tf?');

//   var self = this,
//     completedSynchronously = true,
//     handleError = function handleError(error) {
//       // TODO probably shouldn't next() right away here.
//       // That makes debugging async failures much more confusing.
//       onException(error);
//     },
//     cleanup = once(function cleanup() {
//       if (timeoutId !== void 0) {
//         self.clearTimeout(timeoutId);
//       }
//       self.globalErrors.popListener(handleError);
//     }),
//     next = once(
//       function next(err) {
//         cleanup();

//         if (typeof err !== 'undefined' && err !== null) {
//           if (!(err instanceof StopExecutionError) && !err.jasmineMessage) {
//             self.fail(err);
//           }
//           self.recordError_(iterativeIndex);
//         }

//         function runNext() {
//           self.run(self.nextFnIx_(iterativeIndex));
//         }

//         if (completedSynchronously) {
//           self.setTimeout(runNext);
//         } else {
//           runNext();
//         }
//       },
//       function() {
//         try {
//           if (!timedOut) {
//             self.onMultipleDone();
//           }
//         } catch (error) {
//           // Any error we catch here is probably due to a bug in Jasmine,
//           // and it's not likely to end up anywhere useful if we let it
//           // propagate. Log it so it can at least show up when debugging.
//           console.error(error);
//         }
//       }
//     ),
//     timedOut = false,
//     queueableFn = self.queueableFns[iterativeIndex],
//     timeoutId,
//     maybeThenable;

//   next.fail = function nextFail() {
//     self.fail.apply(null, arguments);
//     self.recordError_(iterativeIndex);
//     next();
//   };

//   self.globalErrors.pushListener(handleError);

//   if (queueableFn.timeout !== undefined) {
//     var timeoutInterval = queueableFn.timeout || j$.DEFAULT_TIMEOUT_INTERVAL;
//     timeoutId = self.setTimeout(function() {
//       timedOut = true;
//       var error = new Error(
//         'Timeout - Async function did not complete within ' +
//           timeoutInterval +
//           'ms ' +
//           (queueableFn.timeout
//             ? '(custom timeout)'
//             : '(set by jasmine.DEFAULT_TIMEOUT_INTERVAL)')
//       );
//       // TODO Need to decide what to do about a successful completion after a
//       //   timeout. That should probably not be a deprecation, and maybe not
//       //   an error in 4.0. (But a diagnostic of some sort might be helpful.)
//       onException(error);
//       next();
//     }, timeoutInterval);
//   }

//   try {
//     if (queueableFn.fn.length === 0) {
//       maybeThenable = queueableFn.fn.call(self.userContext);

//       if (maybeThenable && j$.isFunction_(maybeThenable.then)) {
//         maybeThenable.then(
//           wrapInPromiseResolutionHandler(next),
//           onPromiseRejection
//         );
//         completedSynchronously = false;
//         return { completedSynchronously: false };
//       }
//     } else {
//       maybeThenable = queueableFn.fn.call(self.userContext, next);
//       this.diagnoseConflictingAsync_(queueableFn.fn, maybeThenable);
//       completedSynchronously = false;
//       return { completedSynchronously: false };
//     }
//   } catch (e) {
//     onException(e);
//     self.recordError_(iterativeIndex);
//   }

//   cleanup();
//   return { completedSynchronously: true };

//   function onException(e) {
//     self.onException(e);
//     self.recordError_(iterativeIndex);
//   }

//   function onPromiseRejection(e) {
//     onException(e);
//     next();
//   }
// };



// console.log(jasmine);

// enable running Promise-returning tests:
jasmineAsyncInstall({maxConcurrency: 2}, global);

// disable stacktrace limit so we do not loose any error information
Error.stackTraceLimit = Infinity;

// load and run tests:
const testModuleContexts = loadTestModules();
runTests(testModuleContexts);

function loadTestModules() {
  const srcContext = require.context(
    // directory:
    '../src',
    // recursive:
    true,
    // tests in /src folder regex:
    /\.spec\.[tj]s$/im
  );

  const testContext = require.context(
    // directory:
    './unit',
    // recursive:
    true,
    // tests in ./unit folder regex:
    /\.spec\.[tj]s$/im
  );

  return [srcContext, testContext];
}

function runTests(contexts) {
  contexts.forEach(requireAllInContext);
}

function requireAllInContext(requireContext) {
  return requireContext.keys().map(requireContext);
}
