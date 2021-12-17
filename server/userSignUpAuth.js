createAccount.addEventListener('submit',(e) =>{
    showFullForm();
    e.preventDefault();
    var latitudei = 000031;
    var longitudei = 000031;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posistion => {
            latitudei = posistion.coords.latitude;
            longitudei = posistion.coords.longitude;
        });
        
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
                console.log(user);
                if(isNewEmail){
                    userTable.child(user.uid).set({
                        'id' :  user.uid ,
                        'Fullname' : fullname,
                        'Email' : email,
                        'Username' : username,
                        'emailIsVerified' : false,
                        'profile' : user.photoURL,
                        'parentId' : id,
                        'userType' : 'normal',
                        'longitude':longitudei,
                        'latitude':latitudei
                    });
                    var userInfo = { };
                    userTable.once("value", snap => {
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
                    
                    createAccount.reset();
                }
            }) 
            .catch((error) => {
                console.log(error);
            });
        }   
    }    
    else{
        
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
                console.log(user);
                if(isNewEmail){
                    userTable.child(user.uid).set({
                        'id' :  user.uid ,
                        'Fullname' : fullname,
                        'Email' : email,
                        'Username' : username,
                        'emailIsVerified' : false,
                        'profile' : user.photoURL,
                        'parentId' : id,
                        'userType' : 'normal',
                        'longitude':longitudei,
                        'latitude':latitudei
                    });
                    var userInfo = { };
                    userTable.once("value", snap => {
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
                    
                    createAccount.reset();
                }
            }) 
            .catch((error) => {
                console.log(error);
            });
        }   
    }     
})
const signUpGoogle = document.getElementById('with-g');
signUpGoogle.addEventListener('click',()=>{
    hideFullForm();
    // logout();
});