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

    new Glider(document.querySelector('.glider2'), {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: {
            prev: '.prev2',
            next: '.next2'
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
                    slidesToScroll: 4,

                }
            }
        ]
    });

    new Glider(document.querySelector('.glider3'), {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: {
            prev: '.prev3',
            next: '.next3'
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
                    slidesToScroll: 4,

                }
            }
        ]
    });

    new Glider(document.querySelector('.glider4'), {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: {
            prev: '.prev4',
            next: '.next4'
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
                    slidesToScroll: 4,

                }
            }
        ]
    });

    new Glider(document.querySelector('.glider5'), {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: {
            prev: '.prev5',
            next: '.next5'
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
                    slidesToScroll: 4,

                }
            }
        ]
    });

    new Glider(document.querySelector('.glider6'), {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: {
            prev: '.prev6',
            next: '.next6'
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
                    slidesToScroll: 4,

                }
            }
        ]
    });

    
    AOS.init({
        duration: 1000
    });

})
