login.addEventListener('submit',(e)=>{
    e.preventDefault();
    showPassword();
    logout();
    let email = document.getElementById('Email').value; 
    let password = document.getElementById('password').value;
    if(isLoginInputValid.emailIsValid && isLoginInputValid.passwordIsValid){
        auth.signInWithEmailAndPassword(email,password)
        .then(Credentials => {
            console.log( 'user return',Credentials);
            
            var userInfo = {
                userEmail : email,
                userName:'',
                fullName:'',
                profile: Credentials.user.photoURL
            };
            userTable.once("value", snap => {
                let userRecord = snap.val();
                console.log('returned record' , userRecord);
                /* keeping user info in localstorage */ 
                userInfo.Username;
                userInfo.FullName;
            })
            localStorage.setItem("userInfo",JSON.stringify(userInfo));
            login.reset();
            location.href  = './browse.html';
        })
        .catch(error => {
            showMsg('password-input',error.code.split('/')[1],'error')           
        })     
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
