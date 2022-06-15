const logger = require('node-color-log');

/**
 * Logger class for custom logger
 * @example <caption>Importing custom logger</caption>
 * const {log} = require('path/to/CustomLogger.js') // named import
 *
 * @example <caption>Using the log object</caption>
 * // Logging success
 * log.success('The task was successful')
 * // logging errors
 * log.error('The task failed')
 *
 */
class CustomLogger {
  /**
   * Success Log method
   * @param {String} [msg = ''] - Success message to be logged
   */
  success(msg) {
    return logger
      .color('black')
      .bgColor('green')
      .log('SUCCESS ')
      .joint()
      .color('green')
      .log(` >  ${msg || ''}`);
  }

  /**
   * Error Log method
   * @param {String} [msg = ''] - Error message to be logged
   */
  error(msg) {
    return logger
      .color('black')
      .bgColor('red')
      .log('ERROR ')
      .joint()
      .color('red')
      .log(` > ${msg || ''}`);
  }

  /**
   * Info Log method
   * @param {String} [msg = ''] - Info message to be logged
   */
  info(msg) {
    return logger
      .color('black')
      .bgColor('cyan')
      .log('INFO ')
      .joint()
      .color('cyan')
      .log(` > ${msg || ''}`);
  }

  /**
   * Warn Log method
   * @param {String} [msg = ''] - Warn message to be logged
   */
  warn(msg) {
    return logger
      .color('black')
      .bgColor('yellow')
      .log('WARN ')
      .joint()
      .color('yellow')
      .log(` > ${msg || ''}`);
  }

  /**
   * Data Log method
   * @param {String} [msg = ''] - Data message to be logged
   */
  data(msg) {
    return logger
      .color('black')
      .bgColor('magenta')
      .log('DATA ')
      .joint()
      .color('magenta')
      .log(` > ${msg || ''}`);
  }
}

const log = new CustomLogger();
module.exports = { log };
