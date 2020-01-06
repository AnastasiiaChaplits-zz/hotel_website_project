//function for images slide show on the main page
function imagesGalleryHomePage() {
    let images = [];
    let i = 0;

    images[0] = "Images/main page/main_1.jpg";
    images[1] = "Images/main page/main_2.jpg";
    images[2] = "Images/main page/main_3.jpg";
    images[3] = "Images/main page/main_4.jpg";

    return function() {
        let imgMain = document.querySelector('.img_main');

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
let viewImages = imagesGalleryHomePage();
viewImages();
