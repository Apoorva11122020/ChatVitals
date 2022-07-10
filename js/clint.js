const socket=io('http://localhost:8000');

const form=document.getElementById('sendcontainer');
const messageinput=document.getElementById('messageinp');
const messagecontainer=document.querySelector('.container');

var audio= new Audio('Message.mp3');

const append = (message, position )=>{
    const messageElement=document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if (position=='left') {
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageinput.value=''
})

const Name = prompt('Enter your Name to join');
socket.emit('new-user-joined', Name);

socket.on('user-joined',Name=>{
    append(`${Name} joined the chat`,'right');
})

socket.on('receive',data=>{
    append(`${data.Name}: ${data.message}`,'left');
})
socket.on('leave',Name=>{
    append(`${Name}: Left the chat`,'right');
})
