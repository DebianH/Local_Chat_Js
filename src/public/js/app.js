
$(function (){
    socket = io();

    //Obeteniendo elementos de DOM
    const $messageForm = $('#message-form')
    const $messageBox = $('#message')
    const $chat = $('#chat')

    //Obeteniendo elementos de UserName
    const $userForm = $('#userForm');
    const $errorUser = $('#errorUser');
    const $inputUser = $('#inputUser');

    const $userNames = $('#userNames');


    $userForm.submit(e => {
        e.preventDefault();
        socket.emit('nuevo usuario', $inputUser.val(), data => {
            if (data){
                $('#nickName').hide();
                $('#contentWrap').show();
            } else {
                $errorUser.html(`<div class="alert alert-warning">
                Usuario ya existe!!</div>`)
            }
            $inputUser.val('');
        });
    })

    //Eventos
    $messageForm.submit( e => {
        e.preventDefault();
        socket.emit('enviando data', $messageBox.val())
        $messageBox.val('')
    });

    socket.on('nuevo mensaje', function (data){
        $chat.append('<b>' + data.nick +": "+ '</b>' + data.msg + '<br/>');
    })

    socket.on('nombres de usuarios', data => {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            html += `<p><i class='bx bx-user-voice'></i> ${data[i]}</p>`
        }
        $userNames.html(html);
    })
});