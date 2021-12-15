const folder = document.getElementById('folder');
folder.addEventListener('click',() =>{
    const blogSide = document.getElementById('blog-side');
    const blogReadingSide = document.getElementById('blog-reading-side');
    blogSide.classList.toggle('folded');
    blogReadingSide.classList.toggle('unfolded');
})