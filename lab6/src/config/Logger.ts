import winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    return process.env.NODE_ENV === "production" ? "warn" : "debug";
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "blue",
    debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}
    ${level() === "debug" && info.stack ? info.stack : ""}
    `
    )
);

const transports = [
    new winston.transports.Console(),
];

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});

export default Logger;