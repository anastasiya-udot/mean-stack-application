/**
 * Created by anastasiya on 30.10.16.
 */
module.exports = function(req,res,next){
    res.sendHttpError = function(error){
        res.status(error.status);
        res.json(error);
    };
    next();
};