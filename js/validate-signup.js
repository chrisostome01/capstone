const showMsg = (id ,errorMsg ,status ) =>{
    let place = document.getElementById(`${id}`);
    let msgField = place.querySelector(`#msg`);
    place != null ? place.classList.toggle(`${status}`) : '' ;
    msgField != null ? msgField.innerHTML = errorMsg : '' ;
    console.log(place);
    setTimeout(() => {
        msgField != null ?  msgField.innerHTML = '': '' ;
        place.classList.toggle(`${status}`) ;
    } ,2000);
}
const validateFullName = () => {
    let fullName = document.getElementById(`Fullname`).value.trim();
    document.getElementById(`Fullname`).addEventListener('keyup',() => {
        let fullName = document.getElementById(`Fullname`).value.trim();
        let errorStatus = {
            msg:'',
            pass: false
        }       
        if(fullName == ''){
            showMsg('full-name-input' ,'Please fill this field','error');
        }
        else if(/\d/.test(fullName)){
            showMsg('full-name-input' ,'Full name should not contain numbers','error');
        }
        else if(fullName.split(' ').length < 2){
            showMsg('full-name-input' ,'Please you have to provide two of your name','error');
        }
        else{
            showMsg('full-name-input' ,'Success','success');
        }
    });
    let errorStatus = {
        msg:'',
        pass: false
    }
    if(fullName == ''){
        showMsg('full-name-input' ,'Please fill this field','error');
    }
    else if(/\d/.test(fullName)){
        showMsg('full-name-input' ,'Full name should not contain numbers','error');
    }
    else if(fullName.split(' ').length < 2){
        showMsg('full-name-input' ,'Please you have to provide two of your name','error');
    }
    else{
        showMsg('full-name-input' ,'Success','success');
    }
}
const validateEmail = () => {
    let email = document.getElementById(`Email`).value.trim();
    let indexOfAt = email.indexOf('@');
    document.getElementById(`Email`).addEventListener('keyup',() => {
        let email = document.getElementById(`Email`).value.trim();
        let indexOfAt = email.indexOf('@');
       
        let errorStatus = {
            msg:'',
            pass: false
        }
        if(email == ''){
            showMsg('email-input' ,'Please fill this field','error');
        }
        else if(!(email.includes('@'))){
            showMsg('email-input' ,'Please email shoud have @','error');
            console.log('Please email shoud have @');
        }    
        else if(indexOfAt < 2){
            showMsg('email-input' ,'Please email has to be valid','error');
        }
        else{
            showMsg('email-input' ,'Success','success');
        }
    });
    let errorStatus = {
        msg:'',
        pass: false
    }
    if(email == ''){
        showMsg('email-input' ,'Please fill this field','error');
    }
    else if(!(email.includes('@'))){
        showMsg('email-input' ,'Please email shoud have @','error');
    }     
    else if(indexOfAt < 2){
        showMsg('email-input' ,'Please email has to be valid','error');
    }
    else{
        showMsg('email-input' ,'Success','success');
    }
}
const validatUsername = () => {
    let username = document.getElementById(`username`).value.trim();
    let indexOfAt = username.indexOf('@');
    document.getElementById(`username`).addEventListener('keyup',() => {
        let username = document.getElementById(`username`).value.trim();
       
        let errorStatus = {
            msg:'',
            pass: false
        }
        if(username == ''){
            showMsg('username-input' ,'Please fill this field','error');
        }   
        else if((username.trim().includes(' '))){
            showMsg('username-input' ,'Please username should not contain spaces','error');
        } 
        else if((username.trim().length < 5)){
            showMsg('username-input' ,'Please username should be atleast 5 charactors','error');
        }      
        else{
            showMsg('username-input' ,'Success','success');
        }
    });
    let errorStatus = {
        msg:'',
        pass: false
    }
    if(username == ''){
        showMsg('username-input' ,'Please fill this field','error');
    }    
    else if((username.trim().includes(' '))){
        showMsg('username-input' ,'Please username should not contain spaces','error');
    } 
    else if((username.trim().length < 5)){
        showMsg('username-input' ,'Please username should be atleast 5 charactors','error');
    } 
    else{
        showMsg('username-input' ,'Success','success');
    }
}
const validatPassword = () => {
    let password = document.getElementById(`password`).value.trim();
    document.getElementById(`password`).addEventListener('keyup',() => {
        let password = document.getElementById(`password`).value.trim();
       
        let errorStatus = {
            msg:'',
            pass: false
        }
        if(password == ''){
            showMsg('password-input' ,'Please fill this field','error');
        }   
        else if((password.trim().length < 8)){
            showMsg('password-input' ,'Please password should be atleast 8 charactors','error');
        }      
        else{
            showMsg('password-input' ,'Success','success');
        }
    });
    let errorStatus = {
        msg:'',
        pass: false
    }
    if(password == ''){
        showMsg('password-input' ,'Please fill this field','error');
    }   
    else if((password.trim().length < 8)){
        showMsg('password-input' ,'Please password should be atleast 8 charactors','error');
    } 
    else{
        showMsg('password-input' ,'Success','success');
    }
}
let createAccount = document.getElementById('sign-up-form');
createAccount.addEventListener('submit',sub =>{
    sub.preventDefault();
    validateFullName();
    validateEmail();   
    validatUsername();
    validatPassword();
})