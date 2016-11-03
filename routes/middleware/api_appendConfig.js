/* api_appendConfig */
var ApiUtil = require("../../util/apiUtil");
var apiUtil = new ApiUtil();
var api_appendConfig = function(req, res, next) {
    apiUtil.appendConfig(req);
    next();
};
module.exports = api_appendConfig;