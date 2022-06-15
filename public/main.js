let button = document.getElementById('updateButton')
button.addEventListener('click', updateEntry)



async function updateEntry(){
    try{

        const response = await fetch('updateEntry', {
            method: 'put',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                firstname: document.getElementsByName('firstname')[0].value, 
                lastname : document.getElementsByName('lastname')[0].value,
                email: document.getElementsByName('email')[0].value,
                phoneNumber : document.getElementsByName('phoneNumber')[0].value,
                date : document.getElementsByName('date')[0].value
    
            })
            
        })
    
        const data =  await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.log(error)
    }
   

}