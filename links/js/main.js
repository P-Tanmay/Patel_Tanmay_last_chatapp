(()=> {
    const socket = io();
    let messagePeople = document.querySelector('ul'),
        chatArea = document.querySelector('form'),
        usernameInput = document.querySelector('.username'),
        chatMessage = chatArea.querySelector('.message'),
        typing = document.querySelector('.alertText');
        userName = null;


        function addusername() {
          // debugger;
          userName = this.value;
        }

        function SendMessage(e){
            e.preventDefault();// prevent default event(refresh page)
            //ternary  -> check to see if the var exists, or if it dose not. true is to the left colon, false is to the right
            userName = (userName && userName.length > 0) ? userName : 'user';
            //grab the text from the input field at the bottom of the page
            msg = `${userName} says ${chatMessage.value}`;
            // emit a chat event so we can pass it thought to the sever (and every one else)
            socket.emit('chat message', msg);
            chatMessage.value = '';
            return false;
        }

    function INMessage(msg) {
        // debugger;
        let newMsg = `<li>${msg.message}</li>`;
        messagePeople.innerHTML += newMsg;
    }

    chatMessage.addEventListener('keypress', function(){
       // debugger;
       // e.preventDefault();// block default event(refresh page)
       userName = (userName && userName.length > 0) ? userName : 'user';

      socket.emit('typing', `${userName}` );
   });

   socket.on('typing', function(data){
      typing.innerHTML =   data + '\n is typing the message....' ;
   });






    // $(".message").keyup(function (e)  {
    //   if (e.keyCode == 13)  {
    //     socket.emit('send', {username: $('.username').val() , msg: $(".message").val()});
    //     $('.message').val('');  }
    //     else{
    //       socket.emit('is typing',  {username: $('.username').val()});
    //     }
    //   });




    function OUTMessage(msg){
        // debugger;
        let newMsg = `<li>${msg}</li>`;
        messagePeople.innerHTML += newMsg;
    }


    usernameInput.addEventListener('change', addusername, false);
    chatArea.addEventListener('submit', SendMessage, false);
    socket.addEventListener('chat Message', INMessage, false);
    socket.addEventListener('disconnect message', OUTMessage, false);

})();
