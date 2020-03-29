
export function mergeSort(barsData) {
    var animationFrames = [];
    function addFrame({ compare = [], orderedIndex, parentArgs = [] }) {
        // console.log(arguments);
        // debugger
        // let parentArgs = addFrame.caller.arguments;
        animationFrames.push({
            arr: barsData.slice(0),
            compare,
            orderedIndex,
            start: parentArgs[0],
            mid: parentArgs[1],
            end: parentArgs[2],
        })
        // return await delay();
    }

    function mergeSort(arr, start, end) {
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
            addFrame({ compare: [k, j], parentArgs: [start, mid, end] })
            if (arr2[i] <= arr2[j]) {
                addFrame({ compare: [k, j], orderedIndex: k, parentArgs: [start, mid, end] })
                arr[k++] = arr2[i++]
                // renderBarsSlowly([i, j])
            }
            else {
                addFrame({ compare: [k, j], orderedIndex: j, parentArgs: [start, mid, end] })
                // arr[k++] = arr2[j++]

                arr.splice(j, 1)
                arr.splice(k++, 0, arr2[j++])

                // addFrame({ compare: [i, j - 1], orderedIndex: i })
            }

        }

        while (i <= mid) {
            addFrame({ compare: [k, j], parentArgs: [start, mid, end] })
            arr[k++] = arr2[i++]
            // renderBarsSlowly([i, j])
        }

        while (j <= end) {
            addFrame({ compare: [k, j], parentArgs: [start, mid, end] })
            // arr[k++] = arr2[j++]
            arr.splice(j, 1)
            arr.splice(k++, 0, arr2[j++])
            // renderBarsSlowly([i, j])
        }
    }

    addFrame({})
    mergeSort(barsData, 0, barsData.length - 1)
    addFrame({ parentArgs: [0, (barsData.length - 1) / 2, barsData.length - 1] })

    return {
        animationFrames,
        renderBars: (frameIndex) => {
            let frame = animationFrames[frameIndex];
            return frame.arr.map((bar, index) => {
                let { arr, compare = [], orderedIndex, start, mid, end } = frame
                return `
            <div class="bar ${compare.includes(index) ? 'comparing' : ''} ${orderedIndex == index ? 'ordered' : ''} ${start == index ? 'start' : ''} ${end == index ? 'end' : ''} ${mid == index ? 'mid' : ''} " style="height: ${bar}px; "></div>
        `}).join("")
        }
    };
}


export function quickSort(barsData) {
    var animationFrames = [];
    function addFrame({ compare = [], orderedIndex, parentArgs = [] }) {
        // console.log(arguments);
        // debugger
        // let parentArgs = addFrame.caller.arguments;
        animationFrames.push({
            arr: barsData.slice(0),
            compare,
            orderedIndex,
            start: parentArgs[0],
            mid: parentArgs[1],
            end: parentArgs[2],
        })
        // return await delay();
    }

    return {
        animationFrames,
        renderBars: (frameIndex) => {
            let frame = animationFrames[frameIndex];
            return frame.arr.map((bar, index) => {
                let { arr, compare = [], orderedIndex, start, mid, end } = frame
                return `
            <div class="bar ${compare.includes(index) ? 'comparing' : ''} ${orderedIndex == index ? 'ordered' : ''} ${start == index ? 'start' : ''} ${end == index ? 'end' : ''} ${mid == index ? 'mid' : ''} " style="height: ${bar}px; "></div>
        `}).join("")
        }
    };

}
