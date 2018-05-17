var socket = io();

function scrollToBottom () {
    // selectors
      var messages = jQuery('#poruke');
      var newMessage = messages.children('li:last-child');

    //heights
     var clientHeight = messages.prop('clientHeight');
     var scrollTop = messages.prop('scrollTop');
     var scrollHeight = messages.prop('scrollHeight');
     var newMessageHeight = newMessage.innerHeight();
     var lastMessageHeight = newMessage.prev().innerHeight();

     if(clientHeight+ scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
       messages.scrollTop(scrollHeight);
     }
}

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server.');
});


socket.on('newMessage', function(message) {
  var formattedTime = moment(message.created).format('HH:mm');
  var template = jQuery('#message-template').html();

  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    created: formattedTime
  });

  jQuery('#poruke').append(html);
  scrollToBottom();

});

socket.on('newMessageLocation', function(message) {
    var formattedTime = moment(message.created).format('HH:mm');
  var template = jQuery('#location-message-template').html();

  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    created: formattedTime
  });

  jQuery('#poruke').append(html);
    scrollToBottom();

});


jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User: ',
    text: jQuery('[name=message]').val()
  }, function () {
    jQuery('[name=message]').val('')
  })
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text("Send location");

      socket.emit('createLocation', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      });
    }, function () {
      locationButton.removeAttr('disabled').text("Send location");
      alert('Unable to fetch location.');
    });
});