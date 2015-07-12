'use strict';

module.exports = function(config, app, db) {
    var auth = require('./auth').init(config, db);

    var controllers = {
        users: require('./controllers/users').init(db),
        locations: require('./controllers/locations').init(db)
    };

    app.get('/api/ping', function(req, res) {
        return res.status(200).send('OK');
    });

    //Auth
    app.post('/api/users/register', controllers.users.register);
    app.post('/api/token', auth.getToken);
    app.all('/api/*', auth.tokenRequired);

    app.get('/api/users/:id', controllers.users.get);

    app.get('/api/locations/:id', controllers.locations.get);
    app.post('/api/locations/:id', controllers.locations.add);
    app.put('/api/locations/:id', controllers.locations.update);

    app.get('*', function (req, res) {
        res.render('index');
    });

};