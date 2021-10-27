const requestLogger = (req, _, next) => {
    console.log('====================================');
    console.log(`Method: ${req.method}`);
    console.log(`Path: ${req.path}`);
    console.log(`Body: ${req.body}`);
    next();
}

module.exports = requestLogger;