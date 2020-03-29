import * as sorting from './sorting-algorithms.js';

console.log(sorting);

function getElements(elements) {
    let obj = {};
    elements.forEach(element => {
        obj[element] = document.getElementById(element)
    });

    return obj;
}


var barsData = []

const { barsElement, sliderElement, toggleAnimationBtn, stopAnimationBtn, generateArrayBtn, arraySizeSliderElement, animationSpeedSliderElement, sortingAlgorithms } = getElements(['barsElement', 'sliderElement', 'toggleAnimationBtn', 'stopAnimationBtn', 'generateArrayBtn', 'arraySizeSliderElement', 'animationSpeedSliderElement', 'sortingAlgorithms']);

var ANIMATION_SPEED = 1;
var ARRAY_SIZE = 4;
// var WIDTH = window.visualViewport.width;

let interval;

sliderElement.addEventListener('input', (e) => {
    console.log(e.target.value);
    renderFrame(e.target.value)
})

arraySizeSliderElement.addEventListener('input', (e) => {
    ARRAY_SIZE = e.target.value;
    genArray();
})

animationSpeedSliderElement.addEventListener('input', (e) => {
    ANIMATION_SPEED = e.target.value;
    if (isPlaying !== null) {
        pauseAnimation();
        runAnimation();
    }
})

// /**
//  * Draw bards
//  * @param {*} data 
//  * @param {*} compare 
//  */
// function renderBars(data, compare = []) {

//     barsElement.innerHTML = data.map((item, i) => `
//             <div class="bar ${compare.includes(i) ? 'comparing' : ''}" style="height: ${item * 50}px">${item}</div>
//         `).join("");
// }

/**
 * Set slider position
 */
function setSlider(position) {

    if (position >= animationFrames.length) {
        togglePlay();
        return;
    }

    sliderElement.value = position;
    renderFrame(position)
}
/**
 * Generate random data
 */
function genArray() {
    animationFrames = [];
    barsData = [];
    let min = 1;
    let max = window.visualViewport.height - 250;

    for (let i = 0; i < ARRAY_SIZE; i++) {
        barsData.push((Math.random() * (max - min) + min));
    }

    sort();
    // renderFrame({ arr: barsData });
    setSlider(0);
}

/**
 * Sort the array and generate animated frames based on selected sorting algorithm
 */
function sort() {
    let result = sorting[sortingAlgorithms.value](barsData);
    animationFrames = result.animationFrames;
    renderBars = result.renderBars;
    sliderElement.setAttribute('max', animationFrames.length - 1)
}


/**
 * Render bars
 * @param {*} param
 */
function renderFrame(index) {
    barsElement.innerHTML = renderBars(index);
    // barsElement.innerHTML = frame.arr.map((bar, index) => renderBars(bar, index, frame)).join("");
}

/**
 * Play Animation
 */
function runAnimation() {
    // animationFrames.forEach((frame, i) => {
    //     setTimeout(() => {
    //         // renderFrame(frame);
    //         setSlider(i)
    //     }, ANIMATION_SPEED * (i + 1))
    // })

    isPlaying = true;
    toggleAnimationBtn.children[0].className = 'mdi mdi-pause';

    let i = sliderElement.value;
    interval = setInterval(() => {
        // renderFrame(animationFrames[i])
        setSlider(i++);

    }, ANIMATION_SPEED)
}

function stopAnimation() {
    pauseAnimation();
    setSlider(0)
}

/**
 * Pauses the animation
 */
function pauseAnimation() {
    clearInterval(interval);

    isPlaying = false;
    toggleAnimationBtn.children[0].className = 'mdi mdi-play';
}


var animationFrames = [];
var renderBars;


var isPlaying = null;
function togglePlay() {
    if (isPlaying) {
        pauseAnimation();
    } else {
        runAnimation();
    }
}

genArray();

toggleAnimationBtn.onclick = togglePlay;
stopAnimationBtn.onclick = stopAnimation;
generateArrayBtn.onclick = genArray;

sortingAlgorithms.onchange = sort;