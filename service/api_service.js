const http = require("http");
const express = require("express");
const router = express.Router();
const cors = require("cors");
const { fetch } = require("../fetcher/covid-data-fetcher");

const PROVIDER_PORT = 3201;

process.on("uncaughtException", function(err) {
    // handle the error safely
    console.log(`Uncaught error: ${err}`);
});

process.on("unhandledRejection", (reason, p) => {
    console.log(`Unhandled Rejection at: Promise ${p}, reason: ${reason}`);
    console.log(`${reason.stack}`);
});

const api = async (req, res) => {
    const data = await fetch(req.query.countries);
    res.status(200).json(data);
};

router.get("/api", api);

const app = express();
app.use(cors());

app.use("/", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    const status = err.status || 500;
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === "development" ? err : {};

    // render the error page
    res.status(status);
    res.json({
        message: `${err}`
    });
});

const server = http.createServer(app);
server.listen(PROVIDER_PORT);