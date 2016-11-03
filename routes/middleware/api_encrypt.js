/* api_encrypt */
var ApiUtil = require("../../util/apiUtil");
var apiUtil = new ApiUtil();
var api_encrypt = function(req, res, next) {
    apiUtil.encrypt(req);
    next();
};
module.exports = api_encrypt;