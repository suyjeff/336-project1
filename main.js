// Set of classifications from Image -> BigBiGAN -> Setting
const classifications = [
    "rock arch",
    "field/cultivated",
    "ski slope",
    "sky",
    "forest/broadleaf",
    "volcano",
    "islet",
    "stage",
    "temple/asia",
    "courtyard",
    "crevasse",
    "beach",
    "lagoon",
    "pizzeria",
    "trench",
    "cliff",
    "hot spring",
    "tree farm",
    "landfill",
    "rainforest",
    "boardwalk",
    "desert/sand",
    "hayfield"
];

// Set of types of climate/crises
const crises = [
    "wildfire",
    "forest fire",
    "smog",
    "drought",
    "melting",
    "flooding",
    "habitat",
    "water level",
    "coral reef",
    "trash",
    "dried rivers",
];

// string array of OG images
const og_image_names = [
    "Original_01.png",
    "Original_04.png",
    "Original_05.png",
    "Original_07.png",
    "Original_08.png",
    "Original_09.png",
    "Original_11.png",
    "Original_12.png",
    "Original_13.png",
    "Original_14.png",
    "Original_17.png",
    "Original_18.png",
    "Original_21.png",
    "Original_22.png",
    "Original_24.png",
    "Original_25.png",
    "Original_26.png",
    "Original_27.png",
    "Original_28.png",
    "Original_30.png",
    "Original_31.png",
    "Original_32.png",
    "Original_33.png",
    "Original_34.png"
];

// string array of GAN images
const gan_image_names = [
    "BigBiGAN-01.png",
    "BigBiGAN-04.png",
    "BigBiGAN-07.png",
    "BigBiGAN-08.png",
    "BigBiGAN-09.png",
    "BigBiGAN-11.png",
    "BigBiGAN-13.png",
    "BigBiGAN-16.png",
    "BigBiGAN-17.png",
    "BigBiGAN-18.png",
    "BigBiGAN-19.png",
    "BigBiGAN-20.png",
    "BigBiGAN-21.png",
    "BigBiGAN-22.png",
    "BigBiGAN-24.png",
    "BigBiGAN-25.png",
    "BigBiGAN-26.png",
    "BigBiGAN-27.png",
    "BigBiGAN-28.png",
    "BigBiGAN-30.png",
    "BigBiGAN-31.png",
    "BigBiGAN-32.png",
    "BigBiGAN-33.png",
    "BigBiGAN-34.png"
];

// randomly choose one of two arrays
const randomArray = (arr1, arr2) => {
    const rand = Math.random();
    if (rand < 0.5) {
        return arr1;
    } else {
        return arr2;
    }
};

// call above function
const randomClassification = randomArray(classifications, crises);

// fetch classifications elements in random order
var random_Array = randomClassification.sort(() => Math.random() - 0.5);
var location_div = document.getElementById("location");

// populate location div with random classifications
for (var i = 0; i < random_Array.length; i++) {
    var text_div = document.createElement("div");
    text_div.className = "text-div";
    text_div.innerHTML = random_Array[i];
    location_div.appendChild(text_div);
}

// get random image array
// const randomImage = randomArray(og_image_names, gan_image_names);
const randomImage = randomArray(og_image_names);

// fetch og_image_names elemnts in random order
var randImgArr = randomImage.sort(() => Math.random() - 0.5);
console.log(randImgArr);
// populate images div with images from og_images directory
var images_div = document.getElementById("images");
for (var i = 0; i < randImgArr.length; i++) {
    var image_div = document.createElement("div");
    image_div.className = "image-div";

    // return result based on which array is chosen
    if (randImgArr[i].includes("Original")) {
        image_div.innerHTML = "<img src='og_images/" + randImgArr[i] + "'>";
    } else {
        image_div.innerHTML = "<img src='gan_images/" + randImgArr[i] + "'>";
    }
    images_div.appendChild(image_div);
}

// randomly choose between location_div and images_div
var random_div = randomArray(location_div, images_div);

// hide random_div
random_div.style.display = "none";

// hide next div by default
document.getElementById("next").style.display = "none";

// show next div if text div class is clicked
var location_divs = document.getElementsByClassName("text-div");
document.getElementById("overlay").style.display = "none";

// add click action to every item in location_divs
for (var i = 0; i < location_divs.length; i++) {
    location_divs[i].addEventListener("click", function() {
        // show next div
        document.getElementById("next").style.display = "flex";

        // add "active" class to selected div
        this.classList.add("active");
        
        document.getElementById("overlay-text").innerHTML = this.innerHTML;

        // remove "active" class from all other divs
        // add "non-active" to all other divs
        for (var i = 0; i < location_divs.length; i++) {
            if (location_divs[i] != this) {
                location_divs[i].classList.remove("active");
                location_divs[i].classList.add("non-active");
            }
        }

        // populate next div with text from the array not chosen
        var next_div = document.getElementById("text-container");
        // next_div.innerHTML = "";
        var next_Array = randomArray(classifications, crises);
        var next_Array_sorted = next_Array.sort(() => Math.random() - 0.5);
        for (var i = 0; i < next_Array_sorted.length; i++) {
            var text_div = document.createElement("div");
            text_div.className = "text-div-2";
            text_div.addEventListener("click", function() {
                this.classList.add("active2");
                document.getElementById("overlay-subtext").innerHTML = this.innerHTML;
            });
            text_div.innerHTML = next_Array_sorted[i];
            next_div.appendChild(text_div);
            if (i < 3) {
                next_div.addEventListener("click", function() {
                    var rand_image = Math.floor(Math.random() * og_image_names.length);
                    var image_div = document.createElement("div");
                    image_div.className = "image-div";
                    image_div.innerHTML = "<img src='og_images/" + og_image_names[rand_image] + "'>";
                    image_div.addEventListener("click", function() {
                        document.getElementById("overlay").style.display = "flex";
                    });
                    document.getElementById("image-container").appendChild(image_div);
                });
            }           
        }   
    });
}

// randomly assign display grid to #location
var rand_grid = Math.floor(Math.random() * 2);

// edit image-container every time text-container element is clicked
var text_container = document.getElementById("text-container");
text_container.addEventListener("click", function() {
    document.getElementById("image-container").innerHTML = "";
    var rand_image = Math.floor(Math.random() * og_image_names.length);
    var image_div = document.createElement("div");
    image_div.className = "image-div";
    image_div.innerHTML = "<img src='og_images/" + og_image_names[rand_image] + "'>";
    document.getElementById("image-container").appendChild(image_div);
});

var overlay_content = document.getElementById("overlay-content");

// sort gan_image_names array in random order
var gan_image_names_sorted = gan_image_names.sort(() => Math.random() - 0.5);

// populate overlay_content with 4 images from gan_image_names
for (var i = 0; i < 4; i++) {
    overlay_content.innerHTML += "<img src='gan_images/" + gan_image_names_sorted[i] + "'>";
}

var overlay_divs = document.getElementsByClassName("text-div-2");
for (var i = 0; i < overlay_divs.length; i++) {
    if (this.className.includes("active2")) {
        overlay_content.innerHTML = "hello";
 
    }
}


// store 4 elements randomClassifications and put in array
for (var i = 0; i < 4; i++) {
    var aoText = document.createElement("div");
    aoText.className = "text-div-3"; 
    aoText.innerHTML = randomClassification[i];
    document.getElementById("another-overlay").appendChild(aoText);
}

// if chosen div is image_div
if (random_div.className != "a9") {
    $(document).ready(function() {
        $(this).on("click", function(e) {
            var x = e.pageX;
            var y = e.pageY;
            var el = $("#another-overlay");
            el.css('position', 'absolute');
            el.css("left", x);
            el.css("top", y);
            el.css("display", "block");
        })
    })
}

// assign click action to text-div-3
var text_div_3 = document.getElementsByClassName("text-div-3");
for (var i = 0; i < text_div_3.length; i++) {
    text_div_3[i].addEventListener("click", function() {
        document.getElementById("overlay").style.display = "flex";
    });
}


// This is really poorly written Javascript and is very very messy and inefficient, sorry :)
