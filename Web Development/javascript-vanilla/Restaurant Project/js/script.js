//Ripples
$(document).ready(function () {
    $(".info, #header").ripples({
        dropRadius: 20,
        perturbance: 0.003
    });
});

// Magnific popup
$('.parent-container').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {
        enabled:true
    }
});

// Navbar toggler
let toggler = $('.navbar-toggler');

toggler.click(function () {
    toggler.toggleClass('change')
});

// sticky navbar
$(window).scroll(function() {
    let navBar = $('.navbar');
    let position = $(this).scrollTop();
    if(position >= 900) {
        navBar.addClass('navbar-background');
        navBar.addClass('fixed-top');
    }
    else {
        navBar.removeClass('navbar-background');
        navBar.removeClass('fixed-top');
    }
});

// smooth scroll

$('.nav-item a, .header-link, #back-to-top').click(function(link) {
    link.preventDefault();
    let target = $(this).attr('href');
   
    $('html').stop().animate({
        scrollTop: $(target).offset().top - 25
    }, 1000);
});

// back to top
$(window).scroll(function() {
    let navBar = $('#back-to-top');
    let position = $(this).scrollTop();
    if(position >= 900) {
        navBar.addClass('scrollTop');
    }
    else {
        navBar.removeClass('scrollTop');
    }
});