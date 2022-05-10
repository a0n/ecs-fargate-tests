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

