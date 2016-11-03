/* api_callback */
var ApiUtil = require("../../util/apiUtil");
var apiUtil = new ApiUtil();
var api_callback = function(req, res, next) {
    var responseHandler = function(error, response, body) {
        console.log("[ RESPONSE ] : ", body);
        res.send(body);
    };
    apiUtil.request(req,responseHandler);
};
module.exports = api_callback;