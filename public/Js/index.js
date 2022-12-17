console.log('Index success!!!');
window.addEventListener('load',() => {

    new Glider(document.querySelector('.glider'), {
        slidesToShow: 6,
        slidesToScroll: 6,
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        }
    });
    AOS.init({
        duration: 1000
    });
    
})
