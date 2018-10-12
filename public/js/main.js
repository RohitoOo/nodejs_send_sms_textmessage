let numberInput = document.getElementById('number'),
    textMessage = document.getElementById('textMessage'),
    button = document.getElementById('button'),
    response = document.querySelector('.response')


    button.addEventListener('click' , send, false );

    const socket = io();

    socket.on('smsStatus', (data) => {

        response.innerHTML = `<h3>NEXMO TRAIL ALERT!</h3> </br>
        <h5>This is a Trail Version! Receiver Must be Whitelisted To Receive Messages.</h5></br>
        <h6>Receiver : ${data.number}.</h6></br>
        <h6>Message : ${data.message}.</h6> `

        setTimeout( ()=>{
            response.innerHTML = `<h3>Contact Rohito To Get On The List <a href="http://www.rohito.com">Now!</a></h3>`
        },10000)
        document.getElementById('number').value = "";
        document.getElementById('textMessage').value = ""

    })
    
    function send (){
        const number = numberInput.value.replace(/\D/, "");
        const text = textMessage.value

        // Post Request to Nexmo API 

        fetch('/' , {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                number: number,
                text: text
            })
        })
        .then(res => {
            console.log("Server Responded with : ", res)
        })
        .catch(err => {
            console.log(err)
        })
    }