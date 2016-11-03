/* api_dataContert */
var ApiUtil = require("../../util/apiUtil");
var apiUtil = new ApiUtil();
var api_dataContent = function(req, res, next) {
    apiUtil.dataContent(req);
    next();
};
module.exports = api_dataContent;