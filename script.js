var arr = []
const barsElement = document.getElementById('bars');
const sliderElement = document.getElementById('slider');
const toggleElement = document.getElementById('toggle');

const ANIMATION_SPEED = 10;
const ARRAY_SIZE = 80;

let interval;

sliderElement.addEventListener('input', (e) => {
    console.log(e.target.value);
    renderFrame(animationFrames[e.target.value])
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
    sliderElement.setAttribute('value', position);
}
var sortedArray;
/**
 * Generate random data
 */
function genArray() {
    animationFrames = [];
    arr = [];
    let min = 1;
    let max = 15;

    // arr = [13, 14, 9, 9, 13, 10, 12, 11, 5, 10, 1, 4, 6, 10, 14, 2, 2, 9, 15, 2, 11, 9, 14, 7, 10, 4, 5, 6, 5, 6, 13, 9, 2, 9, 14, 3, 7, 6, 6, 2, 2, 5, 12, 3, 3, 10, 7, 7, 7, 13, 13, 5, 10, 14, 6, 15, 10, 13, 2, 11, 7, 1, 7, 11, 2, 13, 6, 6, 9, 9, 11, 6, 14, 2, 12, 7, 12, 11, 7, 14]
    for (let i = 0; i < ARRAY_SIZE; i++) {
        arr.push((Math.random() * (max - min) + min));
    }

    sortedArray = arr.slice(0);
    sortedArray.sort((a, b) => a - b)
    renderFrame({ arr });
    sort();
    sliderElement.setAttribute('max', animationFrames.length)
}

/**
 * Render bars
 * @param {*} param
 */
function renderFrame({ arr, compare = [], orderedIndex, start, mid, end }) {
    barsElement.innerHTML = arr.map((item, j) => `
    <div class="bar ${compare.includes(j) ? 'comparing' : ''} ${orderedIndex == j ? 'ordered' : ''} ${start == j ? 'start' : ''} ${end == j ? 'end' : ''} ${mid == j ? 'mid' : ''} ${item == sortedArray[j] ? 'sorted' : ''}" style="height: ${item * 50}px">${Math.round(item)}</div>
`).join("");
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

    let i = sliderElement.getAttribute('value');;
    interval = setInterval(() => {
        renderFrame(animationFrames[i])
        setSlider(i++);

        if (i >= animationFrames.length) {
            togglePlay();
        }
    }, ANIMATION_SPEED)
}

/**
 * Pauses the animation
 */
function pauseAnimation() {
    clearInterval(interval)
}

var animationFrames = [];

/**
 * Sort the array and store each frame
 */
function sort() {
    function addFrame({ compare = [], orderedIndex }) {
        // console.log(arguments);
        // debugger
        let parentArgs = addFrame.caller.arguments;
        animationFrames.push({
            arr: arr.slice(0),
            compare,
            orderedIndex,
            start: parentArgs[1],
            mid: parentArgs[2],
            end: parentArgs[3],
        })
        // return await delay();
    }

    function mergeSort(arr, start, end) {
        // debugger
        if (start < end) {

            let mid = parseInt((start + end) / 2);
            mergeSort(arr, start, mid)
            mergeSort(arr, mid + 1, end)

            merge(arr, start, mid, end)
        }
    }

    function merge(arr, start, mid, end) {

        // console.log(arguments);

        let arr2 = arr.slice(0);
        let i = start, j = mid + 1;
        let k = start;
        // arr.splice(start - 1, 0, 0)
        while (i <= mid && j <= end) {
            addFrame({ compare: [i, j] })
            if (arr2[i] <= arr2[j]) {
                addFrame({ compare: [i, j], orderedIndex: i })
                arr[k++] = arr2[i++]
                // renderBarsSlowly([i, j])
            }
            else {
                addFrame({ compare: [i, j], orderedIndex: j })
                // arr[k++] = arr2[j++]

                arr.splice(j, 1)
                arr.splice(k++, 0, arr2[j++])

                addFrame({ compare: [i, j - 1], orderedIndex: i })
            }

        }

        while (i <= mid) {
            addFrame({ compare: [i, j] })
            arr[k++] = arr2[i++]
            // renderBarsSlowly([i, j])
        }

        while (j <= end) {
            addFrame({ compare: [i, j] })
            // arr[k++] = arr2[j++]
            arr.splice(j, 1)
            arr.splice(k++, 0, arr2[j++])
            // renderBarsSlowly([i, j])
        }
    }


    console.log(arr);
    addFrame({})
    mergeSort(arr, 0, arr.length - 1)
    addFrame({})
    console.log(arr);

    // runAnimation();
}


var isPlaying = false;
function togglePlay() {
    if (isPlaying) {
        pauseAnimation();
        isPlaying = false;
        toggleElement.children[0].className = 'mdi mdi-play';
    } else {
        runAnimation();
        isPlaying = true;
        toggleElement.children[0].className = 'mdi mdi-pause';
    }
}

genArray();