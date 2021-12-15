createAccount.addEventListener('submit',(e) =>{
    showFullForm();
    e.preventDefault();
    if(isSignupInputValid.emailIsValid && isSignupInputValid.passwordIsValid && isSignupInputValid.userNameIsValid && isSignupInputValid.fullNameIsValid){
        let email = document.getElementById('Email').value;
        let password = document.getElementById('password').value;
        let fullname = document.getElementById('Fullname').value;
        let username = document.getElementById('username').value;
        auth.createUserWithEmailAndPassword(email ,password)
        .then((userCredential) => {
            const user = userCredential.user;  
            const isNewEmail = userCredential.additionalUserInfo.isNewUser; 
            const id = userTable.push().key;
            if(isNewEmail){
                userTable.child(id).set({
                    'id' :  user.uid ,
                    'Fullname' : fullname,
                    'Email' : email,
                    'Username' : username,
                    'Password' : password,
                    'emailIsVerified' : false,
                    'profile' : null
                });
                createAccount.reset();
                location.href  = './browse.html';
            }
        }) 
        .catch((error) => {
            console.log(error);
        });
    }   
     
})
const signUpGoogle = document.getElementById('with-g');
signUpGoogle.addEventListener('click',()=>{
    hideFullForm();
    // logout();
});