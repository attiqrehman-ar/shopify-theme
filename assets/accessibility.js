$(document).ready(function() {
    $('h2, h3, h4, h5, h6').each(function() {
        if ($(this).text().trim() === '') {
            $(this).remove();  
        }
    });
});

$(document).ready(function() {
    $('br').attr('aria-hidden', 'true');
    $('span.sf__blog-cardDate time').prepend('<span class="visually-hidden">Article Published date </span>');

   

    // Show or hide the Back to Top button based on scroll position
    

    // Hide the Back to Top button initially
//     $('#back-to-top').hide();

//     backToTopButton.on('click', function(e) {
//         e.preventDefault();
//         jQuery('html, body').animate({ scrollTop: 0 }, 'slow');

    
// });

// $(document).ready(function() {
//     var backToTopButton = $('#back-to-top');
    
//     $(window).scroll(function() {
//         if ($(this).scrollTop() > 300) {
//             backToTopButton.show();
//         } else {
//             backToTopButton.hide();
//         }
//     });
    
//     backToTopButton.on('click', function(e) {
//         e.preventDefault();
//         $('html, body').animate({ scrollTop: 0 }, 'slow');
        
//         // Set focus to the top of the page or the button itself after scrolling
//         setTimeout(function() {
//             $('#skiptocontent').focus(); // If focusing the top element
//              backToTopButton.focus(); // If focusing the button itself
//         }, 100); // Adjust the timeout duration to match the scroll duration
//     });
// });