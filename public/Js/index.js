console.log('Index success!!!');
window.addEventListener('load', () => {

    new Glider(document.querySelector('.glider'), {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        },
        responsive: [
            {
                // screens greater than >= 775px
                breakpoint: 768,
                settings: {
                    // Set to `auto` and provide item width to adjust to viewport
                    slidesToShow: 4,
                    slidesToScroll: 4,

                }
            }, {
                // screens greater than >= 1024px
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,

                }
            }
        ]
    });
    AOS.init({
        duration: 1000
    });

})
