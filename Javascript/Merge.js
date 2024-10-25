async function merge(ele, low, mid, high) {
    const merged = new Array(high - low + 1); // Temporary array for merged values
    let x = low; // Pointer for the left subarray
    let y = mid + 1; // Pointer for the right subarray
    let k = 0; // Index for merged array

    // Copying elements to merged array
    while (x <= mid && y <= high) {
        await waitforme(delay);
        if (parseInt(ele[x].style.height) <= parseInt(ele[y].style.height)) {
            console.log(ele[x].style.height)
            merged[k] = ele[x].style.height;
            ele[x].style.background = 'orange'; // Highlight left elements
            x++;
        } else {
            merged[k] = ele[y].style.height;
            ele[y].style.background = 'yellow'; // Highlight right elements
            y++;
        }
        k++;
    }

    // Copying remaining elements of the left subarray, if any
    while (x <= mid) {
        await waitforme(delay);
        merged[k] = ele[x].style.height;
        ele[x].style.background = 'orange'; // Highlight remaining left elements
        x++;
        k++;
    }

    // Copying remaining elements of the right subarray, if any
    while (y <= high) {
        await waitforme(delay);
        merged[k] = ele[y].style.height;
        ele[y].style.background = 'yellow'; // Highlight remaining right elements
        y++;
        k++;
    }

    // Copying merged elements back to original array
    for (let i = 0, j = low; i < merged.length; i++, j++) {
        await waitforme(delay);
        ele[j].style.height = merged[i]; // Update original elements
        ele[j].innerHTML = parseInt(merged[i])/2;
        ele[j].style.background = (high - low + 1 === ele.length) ? 'green' : 'lightgreen'; // Final coloring
    }
}

async function mergeSort(ele, l, r){
    console.log('In mergeSort()');
    if(l >= r){
        console.log(`return cause just 1 elemment l=${l}, r=${r}`);
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    console.log(`left=${l} mid=${m} right=${r}`, typeof(m));
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);
}

const mergeSortbtn = document.querySelector(".mergeSort");
mergeSortbtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = parseInt(ele.length) - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await mergeSort(ele, l, r);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});

