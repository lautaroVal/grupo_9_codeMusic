console.log('Index success');
window.addEventListener('load', () => {
    new Glider(document.querySelector('.carrousel__lista',  {
        slidesToShow: 1,
        dots: '.carrousel__indicadores',
        draggable: true,
        arrows: {
          prev: '.carrousel__anterior',
          next: '.carrousel__siguiente'
        }
    }
        ))


        new Glider(document.querySelector('.index_section_products'), {
            slidesToShow: 2,
            slidesToScroll: 2,
            draggable: true,
            /* dots: '.slider__indicadores', */
            arrows: {
              prev: '.slider__anterior',
              next: '.slider__siguiente'
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
                },{
                  // screens greater than >= 1024px
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                  }
                }
              ]
          });


})