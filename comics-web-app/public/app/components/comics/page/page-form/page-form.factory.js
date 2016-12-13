/**
 * Created by anastasiya on 12.12.16.
 */
comicsApp
    .factory('PageFormFactory', pageFormFactory);

    pageFormFactory.$inject = ['ImageService', '$location'];

    function pageFormFactory(ImageService, $location){

        let arrayParts = [];
        let templatesScopes = [];

        function Part(text, image){
            this.text = text;
            this.image = image;
        }

        function getComicsId(){
            let url = $location.absUrl();
            return url.split('/').splice(-2,1);
        }


        return {

            start: function($scope){
                templatesScopes.push($scope);
            },

            addParts : function (templateIndex){
                console.log(templatesScopes[templateIndex-1]);
                for(let counter = 1; counter <= 3; counter++){
                    arrayParts[counter] =  new Part(
                                    templatesScopes[templateIndex-1][`pageText${counter}`],
                                    templatesScopes[templateIndex-1][`previewFile${counter}`]);
                }
                console.log(arrayParts);
            },

            sendPage: function(callback){

                let data = {
                    "comicsId" : getComicsId(),
                    "image" : arrayParts[0].image,
                    "text" : arrayParts[0].text,
                    "number": 1
                };

                let url = '/comics-page/create',
                    comicsId = getComicsId(),
                    responses = '';

                ImageService.uploadImage(data, url, function(response){

                    if(response.error){
                        responses += `${response.error} `
                    } else {
                        responses += `${response.message} `;

                        let data = {
                            "comicsId" :  comicsId,
                            "image" : arrayParts[1].image,
                            "text" : arrayParts[1].text,
                            "number": 2
                        };

                        ImageService.uploadImage(data, url, function(response) {

                            if(response.error){
                                responses += `${response.error} `
                            } else {
                                responses += `${response.message} `;

                                let data = {
                                    "comicsId" :  comicsId,
                                    "image" : arrayParts[2].image,
                                    "text" : arrayParts[2].text,
                                    "number": 3
                                };

                                ImageService.uploadImage(data, url, function(response){
                                    if(response.error){
                                        responses += `${response.error} `
                                    } else {
                                        responses += `${response.message} `;
                                    }

                                    callback(responses);
                                });
                            }
                        })
                    }
                })

            },

            getParts: function(){
                return arrayParts;
            },

            clearArray: function(){
                arrayParts = [];
            }

        }

    }