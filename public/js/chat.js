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

  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err){
      if(err) {
        alert(err);
        window.location.href = '/';
      }
      else{
        console.log('No error');
      }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server.');
});

socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user){
    ol.append(jQuery('<li></li>').text(user));
  });
jQuery('#users').html(ol);
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

    locationButton.attr('disabled', 'disabled').text('Lokacija se šalje...');

    navigator.geolocation.getCurrentPosition(function(position) {
      locationButton.removeAttr('disabled').text("Pošaljite lokaciju");

      socket.emit('createLocation', {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
      });
    }, function () {
      locationButton.removeAttr('disabled').text("Pošaljite lokaciju");
      alert('Unable to fetch location.');
    });
});
