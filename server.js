var app = require('express')();

app.get('/api/person', function (request, response) {
    response.send({
        name:"Alex",
        city:"London",
        age:25
    });
});

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});

module.exports.server = app;