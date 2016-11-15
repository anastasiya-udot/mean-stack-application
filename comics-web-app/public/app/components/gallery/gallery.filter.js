/**
 * Created by anastasiya on 15.11.16.
 */
comicsApp
    .filter('startFrom', function(){
        return function(data, start){
            if (!data || !data.length) { return; }
            start = +start;
            return data.slice(start);
        }
});