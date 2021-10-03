import chalk from "chalk";

const getCurrentDate = () => {
  const currentDate = new Date();
  return (
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getDate() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds()
  );
};

const requestLogger = (req, res, next) => {
  const date = chalk.blue(getCurrentDate());
  const requestUrl = chalk.cyanBright(req.url);
  const requestMethod = chalk.magenta(req.method);
  console.log(`[${date}] ${requestMethod}:${requestUrl}`);
  next();
};

export default requestLogger;
