//~ here used EyeDropper Api
//! you can also use the canva Api

//~ the import is not working here so we need to add the scrip file inside the html to get the colorNamer (if use this then ues type="module" inside the script tag of the body)
// import colorNamer from "color-namer";
// const namer = require("color-namer");

// let selectFile = document.getElementById("selectFile");
// let selectColor = document.getElementById("selectColor");
let pickedColor = document.getElementById("pickedColor");
let selectedImageFile = document.getElementById("selectedImageFile");

//~ to check the function colorNnamer(it is the methos or function of the EyeDropper Api) is present or not
window.onload = function () {
  if (typeof colorNamer === "undefined") {
    console.error("color-namer is not loaded.");
  } else {
    console.log("color-namer is successfully loaded.");
  }
};

function choosingColor() {
  //~ To check the window will support the EyeDropper Api or not
  if (!window) {
    alert("window not support");
  } else {
    //! Eyedropper object is the part of the EyeDropper Api allow us to pick the color
    let EyeDrope = new EyeDropper();
    //~ to us ethe EyeDropper Api .open() you need to use
    EyeDrope.open()
      .then((result) => {
        //! To print the selected color with name
        let savedColor = result.sRGBHex;
        let colorName = "Unknown";
        try {
          pickedColor.innerText = "";
          //! basic[0] is the default array name, it will give the first array of object result
          //~ the .name will give the first related name to the array[o] of hex value
          colorName = colorNamer(savedColor).basic[0].name;
          pickedColor.innerText += `Picked Color:${savedColor}, (${colorName})`;
        } catch (e) {
          console.error("No color found:", e);
        }
        console.log(savedColor);

        //! other way to do without the try and catch block
        // let colorName = colorNamer(savedColor).basic[0].name;
        // console.log(colorName);
        // pickedColor.innerText += `Picked Color:${savedColor}, (${colorName})`;

        //! to get the image choosing from the file and place into the image container
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
function choosingFile(event) {
  //~ input type="file" so the file is triggered the event
  let file = event.target.files[0];
  if (!file) {
    return;
  } else {
    //~ it is the built in keyword used to read the users data such as files,image etc
    let reader = new FileReader();
    reader.onload = function () {
      selectedImageFile.src = reader.result;
    };
    //! this method reads the data provided by the user and triggers the file into URL
    reader.readAsDataURL(file);
  }
}
