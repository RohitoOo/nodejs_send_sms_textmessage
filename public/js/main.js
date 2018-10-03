const numberInput = document.getElementById('number'),
    textMessage = document.getElementById('textMessage'),
    button = document.getElementById('button'),
    response = document.querySelector('.response')


    button.addEventListener('click' , send, false );

    function send (){
        const number = numberInput.value.replace(/\D/, "");
        const text = textMessage.value

        console.log(number, text)


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

console.log('Worked')