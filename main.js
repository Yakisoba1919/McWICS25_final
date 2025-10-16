const api_key = "live_YsuOqtWWyNP1PayLuHe2V0oIoXpdpBvILto99KXHE4poVolScn3EnF9m9xCjM934"; // Replace with your API key
const breedsUrl = "https://api.thecatapi.com/v1/breeds";

// Variable to store the selected breed
let selectedBreedId = null;
let breedsData = []; // Store fetched breed data


window.onload = function() {
  fetchBreeds();
  setupEventListeners();
  const firstFolder = document.querySelectorAll('.folder')[0];
  firstFolder.click(); // Simulate the click for the first folder
};

// Function to fetch breed data and populate the dropdown
function fetchBreeds() {
  fetch(breedsUrl, {
    headers: {
      "x-api-key": api_key,
    },
  })
    .then(response => response.json())
    .then(data => {
      breedsData = data; // Store the breed data
      const dropdown = document.getElementById('breed-dropdown');
      data.forEach(breed => {
        const breedOption = document.createElement('a');
        breedOption.href = "#";
        breedOption.textContent = breed.name;
        breedOption.onclick = function(event) {
          event.preventDefault(); // Prevent default anchor behavior
          selectedBreedId = breed.id;
          document.querySelector('.dropdown-btn').textContent = breed.name;
        };
        dropdown.appendChild(breedOption);
      });

      // Set default value to the first breed
      if (data.length > 0) {
        selectedBreedId = data[0].id;
        document.querySelector('.dropdown-btn').textContent = data[0].name; // Set the button text
      }
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
    });
}

// Function to fetch a cat image for the selected breed
function displayCatImageByBreed() {
  if (!selectedBreedId) {
    console.error('No breed selected');
    return; // No breed selected, don't proceed
  }

  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`;

  fetch(url, {
    headers: {
      "x-api-key": api_key,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const catImage = document.getElementById('cat_image');
        catImage.src = data[0].url; // Set the src of the image to the breed's image
        catImage.alt = `A cat of the ${selectedBreedId} breed`; // Optional: Set alt text for accessibility
      } else {
        console.error('No image found for this breed');
      }
    })
    .catch(error => {
      console.error('Error fetching cat image:', error);
    });
}

// Event listener for "CLICK TO GET YOUR CAT PIC!" button
function setupEventListeners() {
  document.getElementById('newCatButton').addEventListener('click', function() {
    displayCatImageByBreed(); // Call the function when the button is clicked
  });
}

// Initialize the page by fetching the breeds and setting up event listeners
window.onload = function() {
  fetchBreeds();
  setupEventListeners();
};


document.addEventListener("DOMContentLoaded", function() {
  const folders = document.querySelectorAll(".folder");

  folders.forEach(function(folder) {
    folder.addEventListener("click", function() {
      // Remove 'active' class from all folders
      folders.forEach(function(f) {
        f.classList.remove("active");
      });

      // Add 'active' class to the clicked folder
      folder.classList.add("active");
    });
  });
});

function showImages(folderNumber) {
  const rectangleContainer = document.getElementById("rectangleContainer");
  rectangleContainer.innerHTML = ""; // Clear current content

  let imageArray;

  // Folder 1 images
  if (folderNumber === 1) {
    imageArray = [
      "Assets/Clothes/cat_ears.png",
      "Assets/Clothes/cowboy.png",
      "Assets/Clothes/Hat.png",
      "Assets/Clothes/life_vest.png", 
      "Assets/Clothes/Mcgill.png",
      "Assets/Clothes/Santa.png",
      "Assets/Clothes/Scarf.png",
      "Assets/Clothes/supreme.png", 
      "Assets/Clothes/yugiboy.png"
    ];
  } else if (folderNumber === 2) {
    imageArray = [
      "Assets/Overlays/overlay1.png",
      "Assets/Overlays/overlay2.png",
      "Assets/Overlays/overlay3.png",
      "Assets/Overlays/overlay4.png", 
      "Assets/Overlays/overlay5.png",
      "Assets/Overlays/overlay6.png",
      "Assets/Overlays/overlay7.png",
      "Assets/Overlays/overlay8.png", 
      "Assets/Overlays/overlay9.png",
      "Assets/Overlays/transparent.png"
    ];
  }

  // Loop through the images and create the image elements
  imageArray.forEach(src => {
    const imageWrapper = document.createElement("div");
    imageWrapper.style.backgroundColor = "rgb(244, 233, 211)";
    imageWrapper.style.width = "8vw";
    imageWrapper.style.height = "8vw";
    imageWrapper.style.margin = "0.5vw";
    imageWrapper.style.position = "relative";

    let img = document.createElement("img");
    img.src = src;
    img.classList.add("draggable");
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.setAttribute("draggable", "true");

    // Ensure the image is loaded before attaching event listeners
    img.onload = () => {
      if (folderNumber === 1) {
        img.addEventListener("click", (e) => {
          e.preventDefault(); // Prevent the default click behavior

          // Create a copy of the image and make it draggable
          const draggableImg = document.createElement("img");
          draggableImg.src = src;
          draggableImg.style.position = "fixed"; // Fixed position on the screen
          draggableImg.style.width = "10vw"; // Set the size of the draggable image
          draggableImg.style.height = "10vw"; 
          draggableImg.style.cursor = "move"; // Indicate it's draggable
          draggableImg.style.transition = "transform 0.1s ease"; // Transition for smooth movement

          // Position the draggable image at the cursor position
          const offsetX = e.clientX;
          const offsetY = e.clientY;
          draggableImg.style.left = `${offsetX - draggableImg.width / 2}px`; 
          draggableImg.style.top = `${offsetY - draggableImg.height / 2}px`;

          // Bring the image in front of the cat image by setting a high z-index
          draggableImg.style.zIndex = "10000";

          // Append the new image to the body so it's visible on the screen
          const centerDoll = document.querySelector(".center-doll");

          if (centerDoll) {
            centerDoll.appendChild(draggableImg);
          } else {
            console.warn('No element with class "center-doll" found');
          }

          // Mouse drag functionality for the draggable image
          draggableImg.addEventListener("mousedown", (e) => {
            e.preventDefault();

            const offsetX = e.clientX - draggableImg.offsetLeft;
            const offsetY = e.clientY - draggableImg.offsetTop;

            const onMouseMove = (moveEvent) => {
              draggableImg.style.left = `${moveEvent.clientX - offsetX}px`;
              draggableImg.style.top = `${moveEvent.clientY - offsetY}px`;
            };

            const onMouseUp = () => {
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
          });
        });
      } else if (folderNumber === 2) {
        img.addEventListener("click", () => {
          applyImageAsBackground(src); // Apply the clicked image as a background
        });
      }
    };

    // Handle error loading the image
    img.onerror = () => {
      console.error("Error loading image:", src);
    };

    // Append the image wrapper and image element to the container
    imageWrapper.appendChild(img);
    rectangleContainer.appendChild(imageWrapper);
  });
}


let currentImage = null;  // Variable to track the current image element
let currentRectangle = null;  // Variable to track the current rectangle element

// Function to apply an image as background
function applyImageAsBackground(imageSrc) {
  const catImage = document.querySelector(".cat_image");
  const centerDoll = document.querySelector(".center-doll");

  if (!centerDoll) {
    console.warn('No element with class "center-doll" found');
    return;
  }

  // Remove the previous image if it exists
  if (currentImage) {
    currentImage.remove();
  }

  // Create the new rectangle with the image as background
  const rectangle = document.createElement("div");
  rectangle.id = "backgroundRectangle";
  rectangle.style.position = "absolute";  // Use absolute positioning relative to the parent container
  rectangle.style.backgroundImage = `url(${imageSrc})`;  // Set the image as the background
  rectangle.style.backgroundSize = "cover";  // Ensure the image covers the entire rectangle
  rectangle.style.backgroundPosition = "center";  // Center the image

  // Get the computed styles of the .cat_image element
  const computedStyle = window.getComputedStyle(catImage);
  const borderRadius = computedStyle.borderRadius;
  const borderWidth = parseInt(computedStyle.borderWidth, 10);

  // Get the bounding rectangle of the .center-doll element
  const rect = centerDoll.getBoundingClientRect();

  // Ensure no extra margins or borders are affecting the position
  const scrollOffsetX = window.scrollX || 0;
  const scrollOffsetY = window.scrollY || 0;

  // Adjust width and height to match the content area (subtract borders if needed)
  rectangle.style.width = `${rect.width}px`;  // Set width to match .center-doll
  rectangle.style.height = `${rect.height}px`;  // Set height to match .center-doll

  // Adjust position relative to the viewport, accounting for scrolling and any margins
  rectangle.style.left = `${rect.left + scrollOffsetX}px`;  // Adjust for scroll and position relative to the viewport
  rectangle.style.top = `${rect.top + scrollOffsetY}px`;  // Adjust for scroll and position relative to the viewport
  
  // Ensure no offsets from parent margins/padding
  rectangle.style.marginLeft = '-6vw';  // Move the rectangle to the left by 5vw
  rectangle.style.marginTop = '-9vw';  // Move the rectangle to the left by 5vw

  rectangle.style.borderRadius = '1.5vw';  // Optional: Border-radius can match .center-doll's style
  rectangle.style.zIndex = `${parseInt(computedStyle.zIndex) + 1 || 0}`;  // Ensure rectangle is behind the cat image but in front of the background

  // Track the current image
  currentImage = rectangle;

  // Append the rectangle to the .center-doll element
  centerDoll.appendChild(rectangle);
}


// Handle image drag start
function handleDragStart(e) {
  e.dataTransfer.setData("text", e.target.src);
}

// Show the color picker when the third folder is clicked
function showColorPicker() {
  const rectangleContainer = document.getElementById("rectangleContainer");
  rectangleContainer.innerHTML = ""; // Clear current content

  const backgroundText = document.createElement("div");
  backgroundText.id = "backgroundText";
  backgroundText.innerText = "Pick a color for the background!"; // Text content

  // Modify the style directly in JavaScript
  backgroundText.style.marginTop = "1vw"; // Adjust the top margin
  backgroundText.style.fontSize = "2.4vw";  // Adjust font size
  backgroundText.style.color = "#735b4c";
  backgroundText.style.fontFamily = "'MPlus_Medium', sans-serif"; // Set the font

rectangleContainer.appendChild(backgroundText);


  // Create a container for the color options
  const colorOptionsContainer = document.createElement("div");
  colorOptionsContainer.id = "colorOptionsContainer"; // Add a unique ID or class for styling
  rectangleContainer.appendChild(colorOptionsContainer);

  // Color options array
const colors = ["#FF0000", // Red
  "#FF7F00", // Orange
  "#FFFF00", // Yellow
  "#00FF00", // Green
  "#0000FF", // Blue
  "#4B0082", // Indigo
  "#8A2BE2", // Violet
  "#FF1493", // Deep Pink
  "#FF4500", // Orange Red
  "#FFD700", // Gold
  "#32CD32", // Lime Green
  "#1E90FF", // Dodger Blue
  "#8A2BE2", // Blue Violet
  "Transparent"  // Chocolate 
];

colors.forEach(color => {
  let div = document.createElement("div");
  div.classList.add("colorOption");
  
  // Set styles for size, margin, and other properties
  div.style.backgroundColor = color;
  div.style.width = "4.6vw"; // Set the width of the color option
  div.style.height = "4.6vw"; // Set the height of the color option
  div.style.margin = "0.4vw"; // Set margin around each color option
  div.style.border = "0px";
  div.style.borderRadius = "0.5vw"; // Optional: round the corners
  div.style.cursor = "pointer"; // Change cursor to pointer when hovering
  
  // Optional: add some hover effect
  div.style.transition = "background-color 0.3s";
  div.addEventListener("mouseover", () => {
    div.style.opacity = "0.8"; // Change opacity on hover
  });
  div.addEventListener("mouseout", () => {
    div.style.opacity = "1"; // Reset opacity when hover ends
  });

  // Event listener for clicking the color option
  div.addEventListener("click", () => applyColor(color));
  
  // Append the div to the container
  colorOptionsContainer.appendChild(div);
});

}


// change bg color
function applyColor(color) {
  const catImage = document.querySelector(".cat_image");
  catImage.style.backgroundColor = color;
}

// Show font picker when the fourth folder is clicked
function showFontPicker() {
  const rectangleContainer = document.getElementById("rectangleContainer");
  rectangleContainer.innerHTML = ""; // Clear current content

  let textBox = document.createElement("input");
  textBox.id = "textBox";
  textBox.type = "text";
  textBox.value = "Sample Text"; // Default value

  // Set initial styling for the text box
  textBox.style.padding = "0.1vw";
  textBox.style.marginTop = "1vw";
  textBox.style.fontSize = "2vw";
  textBox.style.width = "20vw"; 
  textBox.style.height = "4vw"; 
  textBox.style.borderRadius= "0.4vw"; 
  textBox.style.fontFamily = "Arial"; // Default font

  // Center the text inside the text box
  textBox.style.textAlign = "center";  // Horizontally center the text
  textBox.style.verticalAlign = "middle"; // Vertically align the text
  textBox.style.lineHeight = "4vw"; // This is equal to the height of the input box to vertically center the text

  rectangleContainer.appendChild(textBox);

  const fontOptionsContainer = document.createElement("div");
  fontOptionsContainer.style.display = "flex";
  fontOptionsContainer.style.flexWrap = "wrap";
  fontOptionsContainer.style.overflow = "auto";
  rectangleContainer.appendChild(fontOptionsContainer);

  const fonts = [
    { name: "Bangers", family: "Bangers" },
    { name: "Playwrite IN", family: "Playwrite IN" },
    { name: "Delicious Handrawn", family: "Delicious Handrawn" }
  ];

  fonts.forEach(font => {
    let div = document.createElement("div");
    div.classList.add("fontOption");
    div.style.fontFamily = font.family;
    div.innerText = font.name;
    div.style.width = "10vw"; 
    div.style.fontSize = "1.5vw";
    div.style.height = "5vw"; 
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.margin = "1vw";
    div.style.cursor = "pointer";
    div.style.backgroundColor = "#f6f1e4";
    div.style.borderRadius = "0.5vw";
    div.style.transition = "background-color 0.3s";

    div.addEventListener("click", () => {
      // Apply font to the text box
      textBox.style.fontFamily = font.family;
      textBox.disabled = true; // Disable the text box once the font is applied

      // Convert the text box content into an image (Canvas)
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size to match the text size
      canvas.width = textBox.clientWidth;
      canvas.height = textBox.clientHeight;

      // Apply font styling
      ctx.font = `${textBox.style.fontSize} ${textBox.style.fontFamily}`;
      ctx.fillStyle = "#000"; // Text color
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Draw the text on the canvas
      ctx.fillText(textBox.value, canvas.width / 2, canvas.height / 2);

      // Convert canvas to an image
      const img = new Image();
      img.src = canvas.toDataURL(); // Convert canvas to base64 image
      img.style.position = "fixed"; // Fixed position on the screen
      img.style.cursor = "move"; // Make it draggable
      img.style.zIndex = "99999"; // Make sure the image is on top of other elements
      img.style.left = "50%"; // Start at the center of the screen
      img.style.top = "50%";  // Start at the center of the screen

      const centerDoll = document.querySelector(".center-doll");

      if (centerDoll) {
        // Append the image to .center-doll to make it part of the doll container
        centerDoll.appendChild(img);
      } else {
        console.warn('No element with class "center-doll" found');
      }      

      // Make the image follow the mouse when clicked
      img.addEventListener("mousedown", (e) => {
        e.preventDefault();

        const offsetX = e.clientX - img.offsetLeft;
        const offsetY = e.clientY - img.offsetTop;

        // Function to handle mouse move
        const onMouseMove = (moveEvent) => {
          img.style.left = `${moveEvent.clientX - offsetX}px`;
          img.style.top = `${moveEvent.clientY - offsetY}px`;
        };

        // Mouse up event to stop dragging
        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };

        // Add mouse event listeners to handle drag
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
    });

    fontOptionsContainer.appendChild(div);
  });
}


let btnDownload = document.getElementById("btn-download");

function downloadImg() {
    console.log("Download started");

    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    var targetUrl = document.getElementById("cat_image").src;
    console.log("Image URL:", targetUrl);

    // Ensure the image is fully loaded before proceeding
    const imgElement = document.getElementById("cat_image");

    // Check if the image is loaded
    if (!imgElement.complete || imgElement.naturalWidth === 0) {
        console.error("Image is not loaded yet or has failed to load.");
        return;
    }

    console.log("Image loaded successfully.");

    // Hide unwanted elements of canvas
    let nonCanvas = document.querySelectorAll(".nonCanvas");
    for (let el of nonCanvas) {
        el.style.visibility = "hidden";
    }

    // Fetch the image asynchronously
    fetch(proxyUrl + encodeURIComponent(targetUrl))
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        return response.blob();
    })
    .then(blob => {
        console.log("Image fetched successfully");

        // Create an object URL from the image blob
        const imgURL = URL.createObjectURL(blob);
        const img = new Image();
        img.src = imgURL;

        // Ensure the image is loaded before proceeding
        img.onload = () => {
            console.log("Image loaded successfully!");

            // Reassign the blob URL to the image element
            document.getElementById("cat_image").src = img.src;

            // Use html2canvas to render the entire section including the image
            html2canvas(document.querySelector(".center-doll"), {
                allowTaint: true,
                useCORS: true,
                logging: true, // Enable this to help debug errors
            }).then((canvas) => {
                console.log("Canvas rendering complete");

                // Check if the canvas has any content (non-zero width and height)
                if (canvas.width === 0 || canvas.height === 0) {
                    console.error("Canvas is empty. Rendering failed.");
                    return;
                }

                // Create a blob from the canvas and save it
                canvas.toBlob(function (blob) {
                    if (!blob) {
                        console.error("Failed to create blob from canvas.");
                        return;
                    }

                    console.log("Blob created");
                    window.saveAs(blob, "cat.jpg");
                }, "image/jpeg");

                // Show elements back again after download process
                for (let el of nonCanvas) {
                    el.style.visibility = "visible";
                }
            }).catch((error) => {
                console.error("Error during html2canvas rendering:", error);

                // Show elements back again even if there's an error
                for (let el of nonCanvas) {
                    el.style.visibility = "visible";
                }
            });
        };

        // If there's an issue loading the image, handle the error
        img.onerror = () => {
            console.error("Error loading the image");

            // Show elements back again even if the image fails to load
            for (let el of nonCanvas) {
                el.style.visibility = "visible";
            }
        };
    })
    .catch((error) => {
        console.error("Error fetching image:", error);

        // Show elements back again even if the image fetch fails
        for (let el of nonCanvas) {
            el.style.visibility = "visible";
        }
    });
}

// Adding event listeners
btnDownload.addEventListener("click", downloadImg);
