/* api_encrypt */
var ApiUtil = require("../../util/apiUtil");
var apiUtil = new ApiUtil();
var api_docType = function(req, res, next) {
    apiUtil.docType(req);
    next();
};
module.exports = api_docType;