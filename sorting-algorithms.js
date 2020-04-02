
export function mergeSort(barsData) {
    var animationFrames = [];
    var sorted = [];
    function addFrame({ compare = [], orderedIndex, start, mid, end }) {
        animationFrames.push({
            arr: barsData.slice(0),
            compare,
            orderedIndex,
            start,
            mid,
            end,
            // sorted: start == 0 && end == barsData.length ? sorted.slice() : []
        })
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
            addFrame({ compare: [k, j], start, mid, end })
            if (arr2[i] <= arr2[j]) {
                addFrame({ compare: [k, j], orderedIndex: k, start, mid, end })
                arr[k++] = arr2[i++]
                // renderBarsSlowly([i, j])
            }
            else {
                addFrame({ compare: [k, j], orderedIndex: j, start, mid, end })
                // arr[k++] = arr2[j++]

                arr.splice(j, 1)
                arr.splice(k++, 0, arr2[j++])

                // addFrame({ compare: [i, j - 1], orderedIndex: i })
            }

        }

        while (i <= mid) {
            addFrame({ compare: [k, j], start, mid, end })
            arr[k++] = arr2[i++]
            // renderBarsSlowly([i, j])
        }

        while (j <= end) {
            addFrame({ compare: [k, j], start, mid, end })
            // arr[k++] = arr2[j++]
            arr.splice(j, 1)
            arr.splice(k++, 0, arr2[j++])
            // renderBarsSlowly([i, j])
        }
    }

    addFrame({})
    mergeSort(barsData, 0, barsData.length - 1)
    addFrame({ start: 0, mid: (barsData.length - 1) / 2, end: barsData.length - 1 })

    return {
        animationFrames,
        renderBars: (frameIndex) => {
            let frame = animationFrames[frameIndex];
            return frame.arr.map((bar, index) => {
                let { arr, compare = [], orderedIndex, start, mid, end } = frame
                return `
            <div class="bar ${compare.includes(index) ? 'comparing' : ''} ${(start == 0 && end == arr.length - 1) && (compare[0] == undefined || index < compare[0]) ? 'sorted' : ''} ${orderedIndex == index ? 'ordered' : ''} ${start == index ? 'start' : ''} ${end == index ? 'end' : ''} ${mid == index ? 'mid' : ''} " style="height: ${bar}px; "></div>
        `}).join("")
        }
    };
}


export function quickSort(barsData) {
    var animationFrames = [];
    function addFrame({ compare = [], pivot, low, high, swap }) {
        // console.log(arguments);
        // debugger
        // let parentArgs = addFrame.caller.arguments;
        animationFrames.push({
            arr: barsData.slice(),
            compare,
            pivot,
            low,
            high,
            sorted: sorted.slice(),
            swap
        })
        // return await delay();
    }

    function swap(i, j) {
        let temp = barsData[i];
        barsData[i] = barsData[j];
        barsData[j] = temp;
    }
    function partition(low, high) {
        let pivot = barsData[high];
        let i = (low - 1);

        addFrame({ low, high, pivot: high })
        let j;
        for (j = low; j < high; j++) {
            // addFrame({ low, high, pivot: high, compare: [i, j] })

            if (barsData[j] <= pivot) {
                addFrame({ low, high, pivot: high, compare: [i, j], swap: [j] })
                i++;
                addFrame({ low, high, pivot: high, compare: [i, j], swap: [i, j] })
                swap(i, j)
                addFrame({ low, high, pivot: high, compare: [i, j] })
            }
            else
                addFrame({ low, high, pivot: high, compare: [i, j] })
        }
        addFrame({ low, high, pivot: high, compare: [i, j], swap: [i + 1, high] })
        swap(i + 1, high)
        addFrame({ low, high, pivot: i + 1, compare: [i, j] })
        return (i + 1);
    }

    var sorted = [];
    function quickSort(low, high) {
        if (low < high) {
            let pi = partition(low, high);
            sorted.push(pi);
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        } else {
            sorted.push(low, high)
        }
    }

    addFrame({})
    quickSort(0, barsData.length - 1);
    addFrame({})

    return {
        animationFrames,
        renderBars: (frameIndex) => {
            let frame = animationFrames[frameIndex];
            return frame.arr.map((bar, index) => {
                let { compare = [], pivot, low, high, swap = [], sorted } = frame
                return `
            <div class="bar ${compare.includes(index) ? 'comparing' : ''} ${sorted.includes(index) ? 'sorted' : ''} ${pivot == index ? 'pivot' : ''} ${swap.includes(index) ? 'swap' : ''} ${low == index ? 'start' : ''} ${high == index ? 'end' : ''}" style="height: ${bar}px;"></div>
        `}).join("")
        }
    };

}
