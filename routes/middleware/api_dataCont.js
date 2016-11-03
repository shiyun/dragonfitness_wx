var ApiUtil = require("../../util/apiUtil");
var apiUtil = new ApiUtil();
var api_dataCont = function(req, res, next) {
    apiUtil.dataCont(req);
    next();
};
module.exports = api_dataCont;