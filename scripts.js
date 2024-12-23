// const scrollContainer = document.querySelector('.hero__heading');
// const scrollContent = document.querySelector('.hero__heading__scroll');
// let reverseScrollValue = 0;

// function debounce(method, delay) {
//     clearTimeout(method._tId);
//     method.tId = setTimeout(function() {
//         method();
//     }, delay);
// }

// function reverseScroll () {
//     reverseScrollValue = scrollContainer.scrollTop * 0.1;
//     scrollContent.style.transform = `translateY(${reverseScrollValue}%)`;
// }

// scrollContainer.addEventListener('wheel', function(event) {
//     debounce(reverseScroll, 300);
// });

let player;
const modal = document.querySelector('.modal');
const closeButtons = document.querySelectorAll('.modal__close');

function updateSeparatorHeightVar() {
    const separator = document.querySelector('.separator');
    const separatorHeight = separator.offsetHeight;
    document.documentElement.style.setProperty('--separator-height', `${separatorHeight}px`);
}

window.addEventListener('load', updateSeparatorHeightVar);
window.addEventListener('resize', updateSeparatorHeightVar);

// Load YouTube Player API and create the player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('postcards', {
        videoId: 'X61BVv6pLtw',
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    player = event.target;
    console.log('Player ready');
}

// Close modal and start video playback
closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        modal.classList.remove('modal--open');
        document.body.classList.remove('body-lock');
        if (player) {
            try {
                player.playVideo();
            } catch (error) {
                console.error('Error playing video:', error);
            }
        }
    });
});