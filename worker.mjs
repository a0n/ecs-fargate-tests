import process from 'node:process';

function log(message) {
  console.log(`${Date.now()}: ${message}`);
}


function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('finished work');
    }, 2000);
  });
}


async function run() {
  log('starting work');
  const result = await resolveAfter2Seconds();
  log(result);
  await run();
  // expected output: "resolved"
}

run();

function handleExit(signal) {
  log(`Received ${signal}. Shutting Down NOW!`)
  process.exit(0);
}
process.on('SIGINT', handleExit);
process.on('SIGQUIT', handleExit);
process.on('SIGTERM', handleExit);