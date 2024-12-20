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

function updateSeparatorHeightVar() {
    const separator = document.querySelector('.separator');
    const separatorHeight = separator.offsetHeight;
    document.documentElement.style.setProperty('--separator-height', `${separatorHeight}px`);
}

window.addEventListener('load', updateSeparatorHeightVar);
window.addEventListener('resize', updateSeparatorHeightVar);