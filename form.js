const formId = "save-later-form";
const url = location.href;
const formIdentifier = `${url} ${formId}`; 
const saveButton = document.querySelector("#save"); 
const alertBox = document.querySelector(".alert"); 
let form = document.querySelector(`#${formId}`); 
let formElements = form.elements; 

const getFormData = () => {
  let data = { [formIdentifier]: {} };
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formIdentifier][element.name] = element.value;
    }
  }
  return data;
};

saveButton.onclick = event => {
  event.preventDefault();
  data = getFormData();
  localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
  const message = "Form draft has been saved!";
  displayAlert(message);
};

const displayAlert = message => {
  alertBox.innerText = message;
  alertBox.style.display = "block";
  setTimeout(function() {
    alertBox.style.display = "none";
  }, 1000);
};

const populateForm = () => {
  if (localStorage.key(formIdentifier)) {
    const savedData = JSON.parse(localStorage.getItem(formIdentifier)); // get and parse the saved data from localStorage
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
    const message = "Form has been refilled with saved data!";
    displayAlert(message);
  }
};
document.onload = populateForm();

var x = document.getElementById("map");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var location = position.coords.latitude + "," + position.coords.longitude;
  var img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" + location + "&zoom=14&size=600x450";
  document.getElementById("map").innerHTML = "<img src='" + img_url + "' alt='Map of your current location'>";
}

function initMap(){
    var location2 = {lat: 0.347, lng: 32.582};
    var map2 = new google.maps.Map(document.getElementById("map2"), {
        zoom: 4,
        center: location2
    });
    var marker = new google.maps.Marker({
        position: location2,
        map: map2
    });
}