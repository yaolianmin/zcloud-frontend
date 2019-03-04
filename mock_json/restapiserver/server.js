const path = require('path');
const config = require('./config/config');
const jsonServer = require('json-server');
const rules = require('./routes/routes');
const dbfile = require(config.DB_FILE);

//const provider = require('./data/dataProvider.js');
//const path = require('path');

const ip = config.SERVER;
const port = config.PORT;
const db_file = config.DB_FILE;

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, db_file));
const middlewares = jsonServer.defaults();
router.db._.id = "mac_addr";

var page = 0;
var limit = 10;

server.use(jsonServer.bodyParser);
server.use(middlewares);

// server.use((req, res, next) => {
//     page = req.query._page ? req.query._page : 1;
//     limit = req.query._limit ? req.query._limit : 10;
//     req.query._page = 0;
//     req.query._limit = 0;
//     next();
// });

router.render = (req, res) => {
    // if (res.locals.data.length !== undefined)
    //     res.jsonp({
    //         body: res.locals.data.slice(limit*(page-1), limit*page),
    //         count: res.locals.data.length
    //     });
    // else
    //     res.jsonp({
    //         body: res.locals.data,
    //         count: 1
    //     });
    res.jsonp({
        body: res.locals.data,
        count: JSON.stringify(res._headers['x-total-count'])
    });
};

server.use('/api/v1.0', router);
//server.use(jsonServer.rewriter(rules));
server.use(router);

server.listen({
    host: ip,
    port: port
}, function() {
    console.log(JSON.stringify(jsonServer));
    console.log(`Json Server js running in http://${ip}:${port}`);
});