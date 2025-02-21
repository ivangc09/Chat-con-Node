var socket = io.connect('https://chat-con-node-production.up.railway.app/');

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


btn.addEventListener('click',function(){
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    });

    message.value = "";
});

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value);
});

socket.on('chat',function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + '</strong> <br>' + data.message + '</p>';
});

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message... </em></p>';
});