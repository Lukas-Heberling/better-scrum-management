/**
 * @typedef clientMessages
 * @property {String[]} [infos] - messages for the client
 * @property {String[]} [warnings] - warnings for the client
 * @property {String[]} [errors] - errors for the client
 */

/**
 * @typedef clientResponse
 * @property {clientMessages} messages
 * @property {any} values
 * @property {('success'|'error')} type
 */

/**
 * Creates an object that can be sent to the client.
 * Using this function, responses to the client always look
 * very much the same and can be handled more easily.
 * @param  {Object} options
 * @param {String[]} [options.infos] - Infos for the client
 * @param {String[]} [options.errors] - Erros for the client
 * @param {String[]} [options.warnings] - Warnings for the client
 * @param {any} [options.values] - Data for the client
 * @param {('success'|'error')} [options.type=success] - It worked or it did not work
 * @returns {clientResponse}
 */
const createClientResponse = (options) => {
  const {
    infos,
    warnings,
    errors,
    values,
    type = 'success',
  } = options;
  return {
    messages: {
      infos,
      warnings,
      errors,
    },
    values,
    type,
  }
}

export default createClientResponse;