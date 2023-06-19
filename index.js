const { server } = require('./server');
const port = process.env.PORT || 3000;

const app = server();

app.listen(port)
console.log('running on port '+port)