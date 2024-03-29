
$(document).ready(function(){
    //slik initialize
    $('.carousel__wrapper').slick({
        infinite: true,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
    //tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    //catalog slide
    const toggleSlide = (item) => {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__subcontent').eq(i).toggleClass('catalog-item__subcontent_active');
            })
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modals
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_small').each(function(i) {
       $(this).on('click', function() {
           $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
           $('.overlay, #order').fadeIn('slow');
       }) 
    });

    // form validate
    const validateForms = (form) => {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста введите своё имя",
                phone: "Пожалуйста введите свой номер телефона",
                email: {
                  required: "Пожалуйста введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consult-form');
    validateForms('#consultation form');
    validateForms('#order form');

    //masks
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //form submit
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    //smooth scroll and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});
