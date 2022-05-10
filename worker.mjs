import process from 'node:process';

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('finished work');
    }, 2000);
  });
}


async function run() {
  console.log('starting work');
  const result = await resolveAfter2Seconds();
  console.log(result);
  await run();
  // expected output: "resolved"
}

run();

function handleExit(signal) {
  console.log(`Received ${signal}. Shutting Down NOW!`)
  process.exit(0);
}
process.on('SIGINT', handleExit);
process.on('SIGQUIT', handleExit);
process.on('SIGTERM', handleExit);