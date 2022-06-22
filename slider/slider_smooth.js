let off = 0;
const sliderLine = document.querySelector('.slider-line')
function next() {
    off += 250
    off > 1000 ? off = 0 : off
    sliderLine.style.left = -off + 'px'
}

document.querySelector('.next').addEventListener('click', () => {
    next()
})

document.querySelector('.back').addEventListener('click', () => {
    off -= 250
    off < 0 ? off = 1000 : off
    sliderLine.style.left = -off + 'px'
})

let timer = setInterval(() => {
    next()

}, 5000)