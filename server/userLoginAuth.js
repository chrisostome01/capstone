logout();
login.addEventListener('submit',(e)=>{
   
    e.preventDefault();
    showPassword();  
    let email = document.getElementById('Email').value; 
    let password = document.getElementById('password').value;    
    if(isLoginInputValid.emailIsValid && isLoginInputValid.passwordIsValid){
        const removeNotification = showNotification(`!`,'Fetching your account information','success','noEnd');
        var userInfo = {};
       
        auth.signInWithEmailAndPassword(email,password)
        .then(Credentials => {
            userTable.once("value", snap => {
                removeNotification();
                let userRecord = snap.val();
                // console.log('returned record' , userRecord);
                /* keeping user info in localstorage */ 
                for(var i in userRecord){
                    console.log(userRecord[i]);
                    if(userRecord[i].Email == email ){
                        localStorage.setItem("userInfo",JSON.stringify(userRecord[i]));
                        location.href  = './browse.html';
                    }
                }
            })
            
            login.reset();
            
        })
        .catch(error => {
            removeNotification();
            showNotification(`!`,error.code.split('/')[1].replace('-',' '),'error');       
            login.reset();   
        })     
    }
    else{
        showNotification(`!`,'Please make sure all field are not empty','error');     
        login.reset();
    }
  
})

const logInGoogle = document.getElementById('with-g');
logInGoogle.addEventListener('click',()=>{
    hidePassword();
    // auth.signInWithPopup(googleProvider)
    // .then((result) => {
    //     if (result.credential) {                    
    //         var credential = result.credential;
    //         var token = credential.accessToken;
    //     }
    //         var user = result.user;
    //         console.log(result);
    // })
    // .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(errorCode , errorMessage);
    //     var email = error.email;
    //     var credential = error.credential;
    // });
});
