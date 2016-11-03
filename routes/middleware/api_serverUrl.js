/* api_encrypt */
var ApiUtil = require("../../util/apiUtil");
var apiUtil = new ApiUtil();
var api_serverUrl = function(req, res, next) {
    apiUtil.serverUrl(req);
    next();
};
module.exports = api_serverUrl;