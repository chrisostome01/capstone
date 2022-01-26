/* Database configuration */
const firebaseConfig = {
    apiKey: "AIzaSyDyhJPX5hGXmkVCjWiDYDgxW8Ongh0YZqU",
    authDomain: "capstone-d17ab.firebaseapp.com",
    projectId: "capstone-d17ab",
    storageBucket: "capstone-d17ab.appspot.com",
    messagingSenderId: "658315154433",
    appId: "1:658315154433:web:ee6855874b6ed722da1c00",
    databaseURL:"https://capstone-d17ab-default-rtdb.europe-west1.firebasedatabase.app"
};
/* Initialize Database  */
const app = firebase.initializeApp(firebaseConfig);
const database = app.database();


// send user back to browse if he or she did not provide blog
const blogId = localStorage.getItem('blogId');
if(blogId == null){
    location.href = './browse.html';
}

// Element Auth
elementLeader();



// initializing tinmyce

tinymce.init({
    selector: '#blog-info',
    plugins: 'a11ychecker advcode casechange export formatpainter linkchecker autolink lists checklist pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker',
    toolbar: 'a11ycheck addcomment showcomments casechange checklist code export formatpainter  permanentpen table',
    toolbar_mode: 'floating',
    tinycomments_mode: 'embedded',
    mode : "specific_textareas",
  });

//   Updatig 

var blogForm = document.getElementById('new-blog-form');
blogForm.addEventListener('submit' , (e) => {
    e.preventDefault(); 
    var BlogTable = database.ref('Blogs');
    const imagefield = document.getElementById("image");
    var uniqueid = blogId;
    if(imagefield.value.trim() == ''){
        showNotification(`image!`,'You have to select image','error');
    }
    else if( blogForm.querySelector('#title').value.trim() == '' ){
        showNotification(`title!`,'Title field should not be empty','error');
    }
    else if( blogForm.querySelector('#Subtitle').value.trim() == ''){
        showNotification(`Sub-title!`,'Sub-title field should not be empty','error');
    }
    else if( blogForm.querySelector('#blog-info').value.trim() == '' || blogForm.querySelector('#blog-info').value.trim().length < 200){
        showNotification(`Comment!`,'Comment field should not be empty and it should be over 200 charactors','error');
    }
    else{
        // gettinng information from input
       var image = document.getElementById("image").files[0];
       var imageName = image.name;
       var storageRef = firebase.storage().ref("images/"+uniqueid+"/"+ imageName);
       var uploadTask = storageRef.put(image);
       let title = blogForm.querySelector('#title').value;
       let Subtitle = blogForm.querySelector('#Subtitle').value;
       let Information = tinymce.activeEditor.getContent();
       uploadTask.on(
           "state_changed",
           function (snapshot) {
             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             console.log("upload is " + progress + " done");
           },
           function (error) {
               console.log(error.message);
             },
             function () {
               uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                   
                    //Creating a blog 
                    blogForm.reset(); 
                    var query = database.ref('Blogs').orderByChild('id').limitToFirst(1).equalTo(blogId);
                    query.once("value", function(snapshot) { 
                        snapshot.forEach(function(child) {
                            console.log(child);
                            child.ref.update({    
                                    "Title" : title,
                                    "Subtitle" : Subtitle, 
                                    "info" : Information, 
                                    "postBanner" : downloadURL
                              }) .then(() => {
                                  console.log('done');
                              })  
                              .catch(error => {
                                  console.log(error);
                              })
                        });
                        readThisBlog(blogId);
                    })  
                    
               });
            } 
         );
   }
})


/*  ====================== Start:: Getting selected blog information =======================*/

var content = '';
const gettingSelectBogData = (blogIdSent) => {
    var BlogTable = database.ref('Blogs');
    const query = BlogTable.orderByChild('id').limitToFirst(1).equalTo(blogIdSent);
    var title = document.getElementById('title');
    var Subtitle = document.getElementById('Subtitle'); 
    var textArea = document.getElementById('blog-info');    
    const blogTitle = document.getElementById("blogTitle");

    query.once("value", function(snapshot) {
        var data = snapshot.val();       
        for(var i in data){
            // var textArea = blogForm.querySelector('#blog-info');
            blogTitle.innerHTML = data[i].Title;
            title.value = data[i].Title;
            Subtitle.value = data[i].Subtitle;  
            content = data[i].info ;
            
        }
    }) ;
   
}
gettingSelectBogData(blogId);
window.addEventListener('load',() => {
 
    tinymce.get('blog-info').setContent(content); 
})
/*  ====================== End:: Getting selected blog information =======================*/ 