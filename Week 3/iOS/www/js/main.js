//Brandon McGhee
//ASD 1304


var getTweets = function() {
	var tag = $('#Ttag').val();
	var apiURL;
    
    
    if ($("#tweets").html() !== '') {
        $("#tweets").empty();
    }
    
	if (tag === ' ') {
		alert("You must input a Hash Tag to search");
		return;
	}
	
    $("#pending").append("<img src='css/images/ajax-loader.gif' class='loader'>");
    
    
	for(i = 0, j = tag.length; i<j; i++) {
		if(tag.charAt(i) === ' ') {
			tag.replace(' ', '%20');
		}
	}
	
	apiURL = "http://search.twitter.com/search.json?q=" + tag + "&rpp=5&include_entities=true&result_type=mixed&callback=?";
	
	$.getJSON(apiURL,
              function(data) {
              console.log(data);
              for (i=0, j=data.results.length; i<j; i++) {
              $("#tweets")
              .append("<li class='tweets'>" +
                      "<img class='tweets' src='" + data.results[i].profile_image_url + "' />" + "<h1 class='tweets'>" + data.results[i].from_user_name + "<p>" + data.results[i].text
                      );
              }
              $("#pending").empty();
              });
    
};

var getInstagram = function() {
	$.getJSON("https://api.instagram.com/v1/tags/booze/media/recent?access_token=36600076.9ef9f59.9f461e68e9984b2b9eb99473f436f3dc&callback=?",
              function(data) {
              console.log(data);
              for (i=0, j=data.data.length; i<j; i++) {
              $("#Feed")
              .append("<li>" +
                      "<img src='" + data.data[i].images.standard_resolution.url + "' />" + "<b>" + data.data[i].user.username + "<br />" + "<br />" + "<p>" + data.data[i].caption.text
                      );
              }
              $("#Feed").listview("refresh");
              });
    
};

$('#getTweets').on('click', function() {
                   getTweets();
                   });

$('#getInstagram').on('click', function() {
                      getInstagram();
                      });



/////PAGE LISTENERS/////

//Home Page Listener
$('#home').on('pageinit', function(){
              
              
              
              });

$('#geo').on('click', function(){
             
             navigator.geolocation.getCurrentPosition(Locate, onError);
             
             function onError(error) {
             alert('code: '    + error.code    + '\n' +
                   'message: ' + error.message + '\n');
             }
             
             function Locate(position) {

                var ref = window.open(encodeURI('http://maps.google.com/?q=alcohol&?sll=' + position.coords.latitude + "," + position.coords.longitude), '_blank', 'location=yes');
                ref = window.open('next.html', '_system');
             
             }
             
});

$('#recipes').on('pageinit', function() {
                 
                 var watchID = null;
                 var recipe = [
                               "Gin & Tonic",
                               "Rum & Coke",
                               "Irish Redhead",
                               "Mind Eraser",
                               "Mountain Gentleman",
                               "Shine Bomb",
                               "Old Fashioned",
                               "Manhattan",
                               "Shirley Temple",
                               "Whiskey Devil",
                               "Blue Motorcycle"
                               ];
                 
                 document.addEventListener("deviceready", onDeviceReady, false);
                 
                 
                 function onDeviceReady() {
                    startWatch();
                 }
                 
                 
                 function startWatch() {
                 var options = { frequency: 100 };
                 
                 watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
                 }
                 
                 function stopWatch() {
                 if (watchID) {
                 navigator.accelerometer.clearWatch(watchID);
                 watchID = null;
                 }
                 }
                 
                 function onSuccess(acceleration) {
                 var normAccel = acceleration.x + acceleration.y + acceleration.z;
                 var rand = Math.floor(Math.random()*11)
                 
                 if (normAccel > 25) {
                 $("#recipe").empty();
                 alert("Your Drink is served.");
                 $("#recipe").append("<li>" + recipe[rand]);
                 }
                 }
                 
                 function onError() {
                 alert('onError!');
                 }
                 
});

$('#notify').on('click', function() {
              
                document.addEventListener("deviceready", onDeviceReady, false);
                
                // Cordova is ready
                //
                function onDeviceReady() {
                // Empty
                }
                
                // alert dialog dismissed
                function alertDismissed() {
                // do something
                }
                
                // Show a custom alertDismissed
                //
                function showAlert() {
                navigator.notification.alert(
                                             'You are running low on spirits!',  // message
                                             alertDismissed,         // callback
                                             'Hey You',            // title
                                             'Alrighty'                  // buttonName
                                             );

                }
                
                showAlert();
                
});

$('#camera').on('click', function() {
             
                var pictureSource;   // picture source
                var destinationType; // sets the format of returned value
                
                // Wait for Cordova to connect with the device
                //
                document.addEventListener("deviceready",onDeviceReady,false);
                
                // Cordova is ready to be used!
                //
                function onDeviceReady() {
                pictureSource=navigator.camera.PictureSourceType;
                destinationType=navigator.camera.DestinationType;
                }
                
                // Called when a photo is successfully retrieved
                //
                function onPhotoDataSuccess(imageData) {
                // Uncomment to view the base64 encoded image data
                // console.log(imageData);
                
                // Get image handle
                //
                var smallImage = document.getElementById('smallImage');
                
                // Unhide image elements
                //
                smallImage.style.display = 'block';
                
                // Show the captured photo
                // The inline CSS rules are used to resize the image
                //
                smallImage.src = "data:image/jpeg;base64," + imageData;
                }
                
                // Called when a photo is successfully retrieved
                //
                function onPhotoURISuccess(imageURI) {
                // Uncomment to view the image file URI
                // console.log(imageURI);
                
                // Get image handle
                //
                var largeImage = document.getElementById('largeImage');
                
                // Unhide image elements
                //
                largeImage.style.display = 'block';
                
                // Show the captured photo
                // The inline CSS rules are used to resize the image
                //
                largeImage.src = imageURI;
                }
                
                // A button will call this function
                //
                function capturePhoto() {
                // Take picture using device camera and retrieve image as base64-encoded string
                navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                                            destinationType: destinationType.DATA_URL });
                }
                
                // A button will call this function
                //
                function capturePhotoEdit() {
                // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
                navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
                                            destinationType: destinationType.DATA_URL });
                }
                
                // A button will call this function
                //
                function getPhoto(source) {
                // Retrieve image file location from specified source
                navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
                                            destinationType: destinationType.FILE_URI,
                                            sourceType: source });
                }
                
                // Called if something bad happens.
                // 
                function onFail(message) {
                alert('Failed because: ' + message);
                }
                
                capturePhoto();
                
});



