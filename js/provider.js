const showMsg = (id ,errorMsg ,status ) =>{
    let place = document.getElementById(`${id}`);
    let msgField = place.querySelector(`#msg`);
    place != null ? place.classList.toggle(`${status}`) : '' ;
    msgField != null ? msgField.innerHTML = errorMsg : '' ;
    setTimeout(() => {
        msgField != null ?  msgField.innerHTML = '': '' ;
        place.classList.toggle(`${status}`) ;
    } ,2000);
}
const showNotification = (title = '',msg = '',errorType = '' ) =>{
  
    let place = document.getElementById(`notification`);
    let msgTitleField = place.querySelector(`#error-title`);
    let notInfo = place.querySelector(`#not-info`);
    msgTitleField.innerHTML =  title;
    notInfo.innerHTML = msg;
    place.classList.add(`${errorType}-msg`);
    setTimeout(() => {
        msgTitleField != null ?  msgTitleField.innerHTML = '': '' ;
        notInfo != null ?  notInfo.innerHTML = '': '' ;
        place.classList.remove(`${errorType}-msg`);
    } ,4000);
}
const hideElement = (id) =>{
    let place = document.getElementById(`${id}`);
    place.classList.add('hidden');
}
const showElement = (id) =>{
    let place = document.getElementById(`${id}`);
    place.classList.remove('hidden'); 
}
const showFullForm = () => {
    showElement('full-name-input');
    showElement('username-input');
    showElement('password-input');    
}
const hideFullForm = () => {
    hideElement('full-name-input');
    hideElement('username-input');
    hideElement('password-input');    
}
const hidePassword = () => {
    hideElement('password-input');    
}
const showPassword = () => {
    showElement('password-input'); 
}
const pushInError  = (errorState , value) => {
    let errorsStateClone = [...errorState];
    let index = errorsStateClone.indexOf(value);
    if(index === -1 ){
        errorsStateClone.push(value);
    }
    return errorsStateClone ;
}
const validateFullName = () => {
    let fullName = document.getElementById(`Fullname`).value.trim();    
    let errorStatus = {
        msg:'',
        pass: false,
        errors:[]
    }
    document.getElementById(`Fullname`).addEventListener('keyup',() => {
        let fullName = document.getElementById(`Fullname`).value.trim();     
        if(fullName == ''){
            showMsg('full-name-input' ,'Please fill this field','error');
        }
        else if(/\d/.test(fullName)){
            showMsg('full-name-input' ,'Full name should not contain numbers','error');
        }
        else if(fullName.split(' ').length < 2){
            showMsg('full-name-input' ,'Please you have to provide two or more of your name','error');
        }
        else{
            showMsg('full-name-input' ,'Success','success');
        }
    });
    if(fullName == ''){
        showMsg('full-name-input' ,'Please fill this field','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please fill this field');
    }
    else if(/\d/.test(fullName)){
        showMsg('full-name-input' ,'Full name should not contain numbers','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Full name should not contain numbers');
    }
    else if(fullName.split(' ').length < 2){
        showMsg('full-name-input' ,'Please you have to provide two of your name','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please you have to provide two of your name');
    }
    else{
        showMsg('full-name-input' ,'Success','success');
        errorStatus.errors = [];
        errorStatus.pass = true;
    }
    return errorStatus;
}
const validateEmail = () => {
    let email = document.getElementById(`Email`).value.trim();
    
    var isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    let errorStatus = {
        msg:'',
        pass: false,
        errors:[]
    }
    document.getElementById(`Email`).addEventListener('keyup',() => {
        let email = document.getElementById(`Email`).value.trim();
        
        isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      
        if(email == ''){
            showMsg('email-input' ,'Please fill this field','error');
        }
        else if(!(email.includes('@'))){
            showMsg('email-input' ,'Please email shoud have @','error');
        }  
        else if(!isValid){
            showMsg('email-input' ,'Please email is not valid','error');
        }
        else{
            showMsg('email-input' ,'Success','success');
        }
    });
   
    if(email == ''){
        showMsg('email-input' ,'Please fill this field','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please fill this field');
    }
    else if(!(email.includes('@'))){
        showMsg('email-input' ,'Please email shoud have @','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please email shoud have @');
    } 
    else if(!isValid){
        showMsg('email-input' ,'Please email is not valid','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please email is not valid');
    }
    else{
        showMsg('email-input' ,'Success','success');
        errorStatus.errors = [];
        errorStatus.pass = true;
    }
    return errorStatus;
}
const validatUsername = () => {
    let username = document.getElementById(`username`).value.trim();
    let indexOfAt = username.indexOf('@');
    var errorStatus = {
        msg:'',
        pass: false,
        errors:[]
    }
    document.getElementById(`username`).addEventListener('keyup',() => {
        let username = document.getElementById(`username`).value.trim();
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
    if(username == ''){
        showMsg('username-input' ,'Please fill this field','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please fill this field');
    }    
    else if((username.trim().includes(' '))){
        showMsg('username-input' ,'Please username should not contain spaces','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please username should not contain spaces');
    } 
    else if((username.trim().length < 5)){
        showMsg('username-input' ,'Please username should be atleast 5 charactors','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please username should be atleast 5 charactors');
    } 
    else{
        showMsg('username-input' ,'Success','success');
        errorStatus.errors = [];
        errorStatus.pass = true;
    }
    return errorStatus;
}
const validatPassword = () => {
    let password = document.getElementById(`password`).value.trim();
    let errorStatus = {
        msg:'',
        pass: false,
        errors:[]
    }
    document.getElementById(`password`).addEventListener('keyup',() => {
        let password = document.getElementById(`password`).value.trim();
       
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
  
    if(password == ''){
        showMsg('password-input' ,'Please fill this field','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please fill this field');
    }   
    else if((password.trim().length < 8)){
        showMsg('password-input' ,'Please password should be atleast 8 charactors','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please password should be atleast 8 charactors');
    } 
    else{
        showMsg('password-input' ,'Success','success');
        errorStatus.errors = [];
        errorStatus.pass = true;
    }
    return errorStatus;
}
const showNo = () => {
    
} 
/* =============  validating contact email ====================== */ 
const validateContactEmail = (elementId) => {
    let email = document.getElementById(`${elementId}`).value.trim();
    
    var isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    let errorStatus = {
        msg:'',
        pass: false,
        errors:[]
    }   
    if(email == ''){
        showNotification('Email' ,'Please fill this field','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please fill this field');
    }
    else if(!(email.includes('@'))){
        showNotification('Email' ,'Please email shoud have @','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please email shoud have @');
    } 
    else if(!isValid){
        showNotification('Email' ,'Please email is not valid','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please email is not valid');
    }
    else{
        // showNotification('Email' ,'Success','success');
        errorStatus.errors = [];
        errorStatus.pass = true;
    }
    return errorStatus;
}
/* ============= end validating email ====================== */ 
/* =============== validating subject and comment ====================== */
const isEmpty = (elementId , comment) => {
    let email = document.getElementById(`${elementId}`).value.trim();    
    let errorStatus = {
        msg:'',
        pass: false,
        errors:[]
    }   
    if(email == ''){
        showNotification(`${comment}`,'Please fill this field','error');
        errorStatus.errors = pushInError(errorStatus.errors,'Please fill this field');
    }   
    else{
        // showNotification(`${comment}` ,'Success','success');
        errorStatus.errors = [];
        errorStatus.pass = true;
    }
    return errorStatus;
} 
/* =============== end:: validating subject and comment====================== */
