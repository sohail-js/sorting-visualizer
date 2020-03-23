var arr = [5, 6, 2, 3, 5, 4]

const barsElement = document.getElementById('bars');
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
    renderBars()

    let arr2 = arr.slice(0);
    let i = start, j = mid + 1;
    let k = start;
    while (i <= mid && j <= end) {
        if (arr2[i] <= arr2[j]) {
            arr[k++] = arr2[i++]
        }
        else
            arr[k++] = arr2[j++]
    }

    while (i <= mid)
        arr[k++] = arr2[i++]

    while (j <= end)
        arr[k++] = arr2[j++]
}


console.log(arr);
mergeSort(arr, 0, arr.length - 1)
// console.log(arr);

async function renderBars() {
    console.log("Wait start");
    await delay();
    console.log("Wait end, no drawing ...");
    barsElement.innerHTML = arr.map(item => `
        <div class="bar" style="height: ${item * 50}px"></div>
    `).join("");

}

renderBars()


function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
}


async function hmm() {
    console.log("a");
    await delay();
    console.log("b");
}

hmm()