const express = require('express');
const secure = require('express-force-https');
const app = express();

app.use(express.static(__dirname + '/dist/cars-angular-client-ca2'));

app.use(secure);

app.get('/*', function(_req, res) {
  res.sendFile(__dirname + '/dist/cars-angular-client-ca2/index.html');
});

app.listen(process.env.PORT || 8081, function() {
  console.log('server js running on port ' + process.env.PORT);
});
