const siteUrl = '//socialm.mithu.my.id:8000/';
const styleUrl = siteUrl + 'static/css/bookmarklet.css';
const minWidth = 250;
const minHeight = 250;

// 1. Load CSS
var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = styleUrl + '?r=' + Math.floor(Math.random()*9999999999999999);
head.appendChild(link);

// 2. Load HTML Structure
var body = document.getElementsByTagName('body')[0];
var boxHtml = `
  <div id="bookmarklet">
    <a href="#" id="close">&times;</a>
    <h1>Select an image to bookmark:</h1>
    <div class="images"></div>
  </div>`;
body.innerHTML += boxHtml;

// 3. Main Functionality
function bookmarkletLaunch() {
    var bookmarklet = document.getElementById('bookmarklet');
    var imagesFound = bookmarklet.querySelector('.images');
    imagesFound.innerHTML = ''; // Clear previous
    bookmarklet.style.display = 'block';

    // Close Button logic
    bookmarklet.querySelector('#close').addEventListener('click', function(){
        bookmarklet.style.display = 'none';
    });

    // Find images in the host website
    var images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
    images.forEach(image => {
        if(image.naturalWidth >= minWidth && image.naturalHeight >= minHeight) {
            var imageFound = document.createElement('img');
            imageFound.src = image.src;
            imagesFound.append(imageFound);
        }
    });

    // Handle Image Selection
    imagesFound.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', function(event){
            var imageSelected = event.target;
            bookmarklet.style.display = 'none';
            window.open(siteUrl + 'images/create/?url='
                + encodeURIComponent(imageSelected.src)
                + '&title='
                + encodeURIComponent(document.title),
                '_blank');
        });
    });
}

// Launch automatically on first load
bookmarkletLaunch();