/**
 * Created by anastasiya on 7.11.16.
 */
module.exports = function(req,res,next){
    res.sendAuthError = function(error){
        console.log(error.message);
        res.json(error);
    };
    next();
};