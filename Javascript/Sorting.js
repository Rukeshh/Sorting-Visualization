// swap function util for sorting algorithms takes input of 2 DOM elements with .style.height feature
function swap(el1, el2) {
    console.log('In swap()');
    
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;

    let temp1=el1.innerHTML;
    el1.innerHTML=el2.innerHTML;
    el2.innerHTML=temp1;   
}

// Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSortingBtn(){
    document.querySelector(".bubbleSort").disabled = true;
    document.querySelector(".insertionSort").disabled = true;
    document.querySelector(".mergeSort").disabled = true;
    document.querySelector(".quickSort").disabled = true;
    document.querySelector(".selectionSort").disabled = true;
}

// Enables sorting buttons used in conjunction with disable
function enableSortingBtn(){
    document.querySelector(".bubbleSort").disabled = false;
    document.querySelector(".insertionSort").disabled = false;
    document.querySelector(".mergeSort").disabled = false;
    document.querySelector(".quickSort").disabled = false;
    document.querySelector(".selectionSort").disabled = false;
}

// Disables size slider used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSizeSlider(){
    document.querySelector("#arr_sz").disabled = true;
}

// Enables size slider used in conjunction with disable
function enableSizeSlider(){
    document.querySelector("#arr_sz").disabled = false;
}

// Disables newArray buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableNewArrayBtn(){
    document.querySelector(".newArray").disabled = true;
}

// Enables newArray buttons used in conjunction with disable
function enableNewArrayBtn(){
    document.querySelector(".newArray").disabled = false;
}

// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

// Selecting size slider from DOM
let arraySize = document.querySelector('#arr_sz');

// Event listener to update the bars on the UI
arraySize.addEventListener('input', function(){
    console.log(arraySize.value, typeof(arraySize.value));
    createNewArray(parseInt(arraySize.value));
});

// Default input for waitforme function (260ms)
let delay = 500;

// Selecting speed slider from DOM
let delayElement = document.querySelector('#speed_input');

// Event listener to update delay time 
delayElement.addEventListener('input', function(){
    console.log(delayElement.value, typeof(delayElement.value));
    delay = 500 - parseInt(delayElement.value);
});

// Creating array to store randomly generated numbers
let array = [];

// Call to display bars right when you visit the site
createNewArray();

// To create new array input size of array
function createNewArray(noOfBars=30) {
    // calling helper function to delete old bars from dom
    deleteChild();

    // creating an array of random numbers 
    array = [];
    for (let i = 0; i < noOfBars; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    console.log(array);

    // select the div #bars element
    const bars = document.querySelector("#bars");

    // create multiple element div using loop and adding class 'bar col'
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.innerHTML=`${array[i]}`;
        bar.style.height = `${array[i]*2}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        bars.appendChild(bar);
    }
}

// Helper function to delete all the previous bars so that new can be added
function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';
}

// Selecting newarray button from DOM and adding eventlistener
const newArray = document.querySelector(".newArray");
newArray.addEventListener("click", function(){
    console.log("From newArray " + arraySize.value);
    console.log("From newArray " + delay);
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(arraySize.value);
});

// Algorithm data
const algorithms = {
    bubbleSort: {
        description: "Bubble Sort is a simple, comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted. Due to its simplicity, Bubble Sort is inefficient for large datasets and is mainly used for educational purposes.",
        code: `function bubbleSort(arr) {
    // Blue->to compare two elements  
    // Outer loop for each pass through the array
    for (let i = 0; i < arr.length - 1; i++) {
        // Inner loop to compare adjacent elements : Blue color
        for (let j = 0; j < arr.length - i - 1; j++) {
            // Swap if the current element is greater than the next element
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
    },
    selectionSort: {
        description: "Selection Sort divides the list into a sorted and an unsorted part. Initially, the sorted part is empty. The algorithm repeatedly finds the minimum element from the unsorted part and moves it to the sorted part by swapping it with the first unsorted element. This process continues until the entire list is sorted. It has a simple structure but is inefficient for large lists.",
        code: `function selectionSort(arr) {
    // Red->Minimum element, Green->Sorted portion, Blue->1st element in unsorted array     
    // Outer loop for each position in the sorted portion
    for (let i = 0; i < arr.length - 1; i++) {
        // Set the current element as the minimum
        let minIndex = i;
        // Inner loop to find the minimum element in the unsorted portion 
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;  // Update minIndex if a new minimum is found
            }
        }
        // Swap the minimum element with the first unsorted element
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}`
    },
    insertionSort: {
        description: "Insertion Sort builds a sorted array one element at a time by repeatedly taking the next unsorted element and inserting it into the correct position in the sorted portion of the array. This algorithm is efficient for small datasets or arrays that are already partially sorted, as it sorts in-place and has low overhead.",
        code: `function insertionSort(arr) {
    //Green->Sorted portion, Blue->checks the lesser elements and swaps
    //Start from the second element (first element is assumed to be sorted) ->Sorted elements Green color
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];  // Element to be inserted
        let j = i - 1;
        // Shift elements in the sorted portion to make room for the key 
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;  // Insert key at the correct position
    }
}`
    },
    quickSort: {
        description: "Quick Sort is a divide-and-conquer algorithm that sorts by selecting a pivot element and partitioning the array into two halves: elements less                                                                              than the pivot and elements greater than the pivot. It then recursively applies this process to the subarrays. Quick Sort is highly efficient, especially for large datasets, with an average time complexity of O(n log n).",
        code: `function quickSort(arr, low = 0, high = arr.length - 1) {
    //Red->Pivot element, Green->Sorted portion, Yellow->Highlights the current element
    //Orange->Marks elements that are less than the pivot
    //Pink->Marks elements greater than the pivot.
    // Base case: stop if the subarray has 1 or 0 elements
    if (low < high) {
        // Partition the array and get the pivot's index
        let pivotIndex = partition(arr, low, high);
        // Recursively sort the elements before and after the pivot
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

function partition(arr, low, high) {
    let pivot = arr[high];  // Choose the last element as the pivot
    let i = low - 1;  // Index of smaller element
    // Loop to place elements smaller than pivot on the left
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap elements
        }
    }
    // Place the pivot element at its correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;  // Return the pivot index
}
`
    },
    mergeSort: {
        description: "Merge Sort is another divide-and-conquer algorithm that splits the array into halves, recursively sorts each half, and then merges the sorted halves back together. This algorithm is stable and has a consistent time complexity of O(n log n), making it suitable for large datasets. Merge Sort is often used in situations where stability is required or in external sorting applications where data cannot fit into memory.",
        code: `function mergeSort(arr) {
    //Green->Sorted Portion, Left elements->Orange, Right elements->Yellow
    //Base case: return if the array has 1 or 0 elements
    if (arr.length < 2) return arr;
    // Divide the array into two halves
    //Highlight left elements-> Orange
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    // Recursively sort each half and merge the sorted halves
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const sortedArray = [];  // Array to store merged elements
    //Merge the two arrays while both have elements
    while (left.length && right.length) {
        // Compare the front elements of each half and add the smaller one
        if (left[0] < right[0]) {
            sortedArray.push(left.shift());
        } else {
            sortedArray.push(right.shift());
        }
    }
    // Concatenate remaining elements from either left or right
    return [...sortedArray, ...left, ...right];
}`
    }
};


// Function to display algorithm information
function showAlgorithmInfo(algorithm) {
    const infoElement = document.getElementById("algorithm-description");
    const codeElement = document.getElementById("algorithm-code");
    const infoContainer = document.getElementById("info");

    // Set the content for the selected algorithm
    infoElement.textContent = algorithms[algorithm].description;
    codeElement.textContent = algorithms[algorithm].code;

    // Show the info section
    infoContainer.style.display = "block";
}

// Attach event listeners to buttons
document.querySelector(".bubbleSort").addEventListener("click", () => showAlgorithmInfo("bubbleSort"));
document.querySelector(".selectionSort").addEventListener("click", () => showAlgorithmInfo("selectionSort"));
document.querySelector(".insertionSort").addEventListener("click", () => showAlgorithmInfo("insertionSort"));
document.querySelector(".quickSort").addEventListener("click", () => showAlgorithmInfo("quickSort"));
document.querySelector(".mergeSort").addEventListener("click", () => showAlgorithmInfo("mergeSort"));
