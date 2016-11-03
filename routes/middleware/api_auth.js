/* api_encrypt */
var ApiUtil = require("../../util/apiUtil");
var apiUtil = new ApiUtil();
var api_auth = function(req, res, next) {
    apiUtil.auth(req);
    next();
};
module.exports = api_auth;