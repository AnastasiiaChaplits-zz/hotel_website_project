//function for images slide show on the main page
function imagesGalleryHomePage() {
    var images = ["Images/main page/main_1.jpg", "Images/main page/main_2.jpg", "Images/main page/main_3.jpg", "Images/main page/main_4.jpg"];
    var i = 0;

    return function() {
        var imgMain = document.querySelector('.img_main');

        if (!imgMain) {
            return;
        }

        imgMain.src = images[i];
        i++;

        if (i === images.length) {
            i = 0;
        }
        setTimeout(viewImages, 2000);
    }
}
var viewImages = imagesGalleryHomePage();
viewImages();
