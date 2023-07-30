const socket = io.connect('http://localhost:3000');

const sender = document.getElementById('sender'); //ad
const message = document.getElementById('message'); //message
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');


// emit() yöntemi, sunucuya belirli bir olay ve veri göndermemizi sağlar

submitBtn.addEventListener('click' , () =>{
    socket.emit('chat' , {
       message: message.value,
       sender : sender.value
    });
});

socket.on('chat' , data => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.sender + ' : </strong>' + data.message + '</p>'
    message.value = '';
})

message.addEventListener('keypress' , () => {
    socket.emit('typing', sender.value);
});

socket.on('typing' , data => {
    feedback.innerHTML = '<p>' + data + ' yaziyor... </p>'
})