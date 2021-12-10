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
    let password = document.getElementById(`password`).value;
    document.getElementById(`password`).addEventListener('keyup',() => {
        let password = document.getElementById(`password`).value;
       
        let errorStatus = {
            msg:'',
            pass: false
        }
        if(password.trim() == ''){
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
    if(password.trim() == ''){
        showMsg('password-input' ,'Please fill this field','error');
    }   
    else if((password.trim().length < 8)){
        showMsg('password-input' ,'Please password should be atleast 8 charactors','error');
    } 
    else{
        showMsg('password-input' ,'Success','success');
    }
}
let createAccount = document.getElementById('login-form');
createAccount.addEventListener('submit',sub =>{
    sub.preventDefault();
    validatUsername();
    validatPassword();
})