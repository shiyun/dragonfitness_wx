/* api_appendSign */
var ApiUtil = require("../../util/apiUtil");
var apiUtil = new ApiUtil();
var api_appendSign = function(req, res, next) {
    apiUtil.appendSign(req);
    next();
};
module.exports = api_appendSign;