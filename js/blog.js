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
blogId == null ? location.href = './browse.html' : '' ;

/* ===================== Start:: Folding blog function ============================ */
const folder = document.getElementById('folder');
folder.addEventListener('click',() =>{
    const blogSide = document.getElementById('blog-side');
    const blogReadingSide = document.getElementById('blog-reading-side');
    blogSide.classList.toggle('folded');
    blogReadingSide.classList.toggle('unfolded');
})
/* ===================== End:: Folding blog function ============================= */
/* == Start::removing useful elemnt if user is not logged in */
elementLeader();
/* == End:: removing useful elemnt if user is not logged in */
// usefull valiable
var limitInterval = 2 ;
/* =====Start Getting Db ref ======= */
const Blogs = database.ref('Blogs');
/* =====End Getting Db ref ======= */

/*  ====================== Start:: Getting selected blog information =======================*/
const gettingSelectBogData = (blogIdSent) => {
    const query = Blogs.orderByChild('id').limitToFirst(1).equalTo(blogIdSent);
    var blogReadingSide = document.getElementById('blog-reading-side');
    var htmlInfo = '';
    query.on("value", function(snapshot) {
        var data = snapshot.val();
        console.log(data);
        for(var i in data){
            console.log(data[i].Title);
            htmlInfo += `
            <div class="top-banner">
                <img src="${data[i].postBanner}" alt="" srcset="">
            </div>
            <div class="blog-text">
                <div class="blog-read-header">
                    <h3 class="leon">${data[i].Title}</h3>
                </div>
                <div class="blog-read-body">
                    <span class="sub-title">
                        <p>
                        ${data[i].Subtitle}
                        </p>
                    </span>
                    <div class="discription" >
                    ${data[i].info}
                    </div>
                </div>
            </div>`;
        if(userInfo != null ) 
            htmlInfo += `<div class="voting">
                            <div class="icons">
                                <div class="up-vote">
                                    <div class="up-vote-icon">
                                        <img src="../assets/svgs/up-vote.svg" alt="" srcset="">                                                      
                                    </div>
                                    <div class="up-vote-counter">
                                        <span>
                                            12
                                        </span>
                                    </div>
                                </div>
                                <div class="divider">
                                    <svg width="2" height="36" viewBox="0 0 2 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 0V36" stroke="black" stroke-opacity="0.33" stroke-width="2"/>
                                    </svg>                                                    
                                </div>
                                <div class="down-vote">
                                    <div class="down-vote-icon">
                                        <img src="../assets/svgs/down-vote.svg" alt="">                                                                                                        
                                    </div>
                                    <div class="down-vote-counter">
                                        <span>
                                            12
                                        </span>
                                    </div>
                                </div>
                                <div class="divider">
                                    <svg width="2" height="36" viewBox="0 0 2 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 0V36" stroke="black" stroke-opacity="0.33" stroke-width="2"/>
                                    </svg>                                                    
                                </div>
                                <div class="comment">
                                    <div class="comment-icon">
                                    <img src="../assets/svgs/comment.svg" alt="" srcset="">                                                                                                             
                                    </div>
                                    <div class="comment-counter">
                                        <span>
                                            05
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>`;

            }
        blogReadingSide.innerHTML = htmlInfo;
    })  
}
gettingSelectBogData(blogId);
/*  ====================== End:: Getting selected blog information =======================*/

/* =======================Start::  Getting summary Blog info =========================== */
const gettingSummaryBlog = (limitiParam = null) => {
    var limitValues = limitiParam != null ? limitInterval : limitInterval + 1 ;
    var query = Blogs.limitToLast(limitValues);
    var blogSide = document.getElementById('blog-side');
    query.on('value' , (snapshot) => {
        var htmlInfo = '' ;
        if(snapshot.exists()){
            var data = snapshot.val();
            for(var i in data){
                htmlInfo += `
                <div class="blog-card" onclick="revealNewBlog('${data[i].id}')" >
                    <div class="blog-summary-content">
                        <div class="blog-image-banner">
                        <img src="${data[i].postBanner}" alt="" />
                        </div>
                        <div class="blog-content-s">
                            <h3 class="leon">${data[i].Title}</h3>
                            <span class="sub-title">
                                <p>
                                    ${data[i].Subtitle}
                                </p>
                            </span>
                            <div class="blog-info">
                                <p>
                                    ${data[i].info}
                                </p>                                       
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
            htmlInfo += `
            <div class="next-card">
                <div class="icon-next">
                    <img src="../assets/svgs/next-icon.svg" alt="" srcset="">     
                </div>
            </div>      
            <div class="next-card-w">
                <div class="icon-next-w">
                    <img src="../assets/svgs/next-icon-w.svg" alt="" srcset="">     
                </div>
            </div> 
            `;
            blogSide.innerHTML = htmlInfo;

        }
    })
}
gettingSummaryBlog();
/* =======================End::  Getting summary Blog info =========================== */
/* =======================Start::  Select Blog =========================== */
const revealNewBlog = (newBlogId) => {
  
    gettingSelectBogData(newBlogId);
}
/* =======================Start::  Select Blog =========================== */
//Implimanting search