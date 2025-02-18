// check if there is local storage color option
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  // set color on root
  document.documentElement.style.setProperty("--main--color", mainColor);

  //remove active class from all colors list items
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add Active class
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}
// Random background option
let backgroundOption = true;

//variable to control the interval
let backgroundInterval;

// check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
//check if random background local stoarge is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  //remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
    // Add Active class
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// toggle spin calss on icon

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // toggle class for rotation
  this.classList.toggle("fa-spin");

  //toggle class open
  document.querySelector(".settings-box").classList.toggle("open");
};

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    //set color on root
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );

    // set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

      handleActive(e);
  });
});

//=====================================================================================
//switch random Background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
      handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
//================================================================================

// Select landing page element
let landingPage = document.querySelector(".landing-page");

// Get Array of images
let imgsArray = ["immmg(1).webp", "immg(3).jpg", "immg(4).jpg", "immg(5).jpg"];

// function to randomaize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    //Change Background image url
    // landingPage.style.backgroundImage = 'url("img/immg(3).jpg")';

    backgroundInterval = setInterval(() => {
      //Get random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      //Change background image url
      landingPage.style.backgroundImage = `url("img/${imgsArray[randomNumber]}")`;
    }, 1000);
  }
}

randomizeImgs();

//================================================================================

//select skills selector

let ourSkills = document.querySelector(".skills");

window.addEventListener("scroll", function () {
  let skillsSection = ourSkills.getBoundingClientRect();

  if (skillsSection.top <= window.innerHeight - 100) {
    console.log("skills section reached");

    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
});

//=======================================================================

// create popup with the image

let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create overlay element
    let overlay = document.createElement("div");

    //Add overlay to the body
    overlay.className = "popup-overlay";

    //Apend Overlay to the body
    document.body.appendChild(overlay);

    //create the popup box
    let popupBox = document.createElement("div");

    //add clas to the popup box
    popupBox.className = "popup-box";

    if ((img, getComputedStyle.alt !== null)) {
      //Create heading
      let imgHeading = document.createElement("h3");

      //create text for heading
      let imgText = document.createTextNode(img.alt);

      //Apend the text t the heading
      imgHeading.appendChild(imgText);

      //Append the heading to the popupbox
      popupBox.append(imgHeading);
    }

    //create the image
    let popupImage = document.createElement("img");

    //set source of the image
    popupImage.src = img.src;

    //add the image to the popup box
    popupBox.appendChild(popupImage);

    //append the popup box to the body
    document.body.appendChild(popupBox);

    //Create the close span
    let closeButton = document.createElement("span");

    //Create the close Button text
    let closeButtonText = document.createTextNode("X");

    //Append text to the close Button
    closeButton.appendChild(closeButtonText);

    //Add Class to ClosrButton
    closeButton.className = "close-button";

    //Add Close Button To The Popup box
    popupBox.appendChild(closeButton);
  });
});

//Close button
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    //Remove The Currnt Popup
    e.target.parentNode.remove();

    //Remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//select all Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);


// Handle Active Stats 
function handleActive(ev) {
    //remove active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });

      // add active class on target
        ev.target.classList.add("active");
}


let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option")

if (bulletLocalItem !== null) {
    
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    })

    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    }
    else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");

    }
}
    
    
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option" , 'block')
        }
        else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option" , 'none')
        }
        handleActive(e);
    })
})


// Reset Button

document.querySelector(".reset-options").onclick = function () {

    // localStorage.clear();
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");

    window.location.reload();
}

//Toggle menu 
let ToggleBn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links")

ToggleBn.onclick = function (e) {
  tLinks.classList.toggle("open")

  //stop propagation
  e.stopPropagation();
}

//Click anywhere outside menu and toggle button

document.addEventListener("click", (e) => {
  if (e.target !== ToggleBn && e.target !== tLinks) {
    //check if menu is open 
    if (tLinks.classList.contains("open")) {
      tLinks.classList.toggle("open");
      
    }
  }
})


// stop propagation on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
}