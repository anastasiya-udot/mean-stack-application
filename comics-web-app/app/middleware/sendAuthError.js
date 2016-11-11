/**
 * Created by anastasiya on 7.11.16.
 */
module.exports = function(req,res,next){
    res.sendAuthError = function(error){
        res.json({"error" : error.message});
    };
    next();
};