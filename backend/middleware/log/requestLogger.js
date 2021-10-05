import chalk from "chalk";
import moment from "moment";

const requestLogger = (req, res, next) => {
  const currentDate = moment(moment.now()).format("YYYY-MM-DD hh:mm:ss");
  const requestDate = chalk.blue(currentDate);
  const requestUrl = chalk.cyanBright(req.url);
  const requestMethod = chalk.magenta(req.method);
  console.log(`[${requestDate}] ${requestMethod}:${requestUrl}`);
  next();
};

export default requestLogger;
