const express = require('express')
const app = express()
const port = 3000

function getEnvString() {
  return Object.entries(process.env).map(entry => entry.join(': ')).join(" <br> ");
}

app.get('/', (req, res) => {
  res.send(`route ${req.originalUrl} : Environment: <br> ${getEnvString()}`)
});

app.get('*', function(req, res){
  res.status(404).send(`route ${req.originalUrl} : Environment: <br> ${getEnvString()}`)
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

var last_log_line = null
setInterval(() => server.getConnections(
  (err, connections) => {
    let new_log_line = `${connections} connections currently open`;
    if (last_log_line != new_log_line) {
      console.log(new_log_line)
      last_log_line = new_log_line;
    } 
  }
), 1000);

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

let connections = [];

server.on('connection', connection => {
  connections.push(connection);
  connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
  });

  setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
  }, 10000);
}
