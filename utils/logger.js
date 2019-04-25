/**
 * Winston configuration for colorized and prettified
 * To-do: error doesn't show
 */
var winston = require('winston');
let date = new Date().toISOString();
const logFormat = winston.format.printf((info) => {
    return `${date}-${info.level}:\n${JSON.stringify(info.message, null, 4)}\n`;
});


module.exports = () => {
    return new winston.createLogger({
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(winston.format.colorize(), logFormat)
            })
        ]
    })
};