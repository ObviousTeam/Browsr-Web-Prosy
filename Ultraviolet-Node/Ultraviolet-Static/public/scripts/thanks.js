
function showThankButton() {
  document.getElementById("thankButton").classList.remove("hidden");
  document.getElementById("thankButton").classList.add("shownbutton");
  document.getElementById("closethank").classList.remove("hidden");
  document.getElementById("closethank").classList.add("closethank");
  document.getElementById("thanktext").classList.remove("hidden");
  document.getElementById("thanktext").classList.add("shown");
  document.getElementById("nametext").classList.remove("hidden");
  document.getElementById("nametext").classList.add("shown");
}

function didnothank() {
  document.getElementById("overlay").style.display = "none";            
  document.getElementById("thankButton").classList.add("hidden");
  document.getElementById("closethank").classList.add("hidden");
  document.getElementById("thanktext").classList.add("hidden");
  document.getElementById("nametext").classList.add("hidden");
  document.getElementById("closethank").classList.remove("closethank");
  document.getElementById("thanktext").classList.remove("shown");
  document.getElementById("nametext").classList.remove("shown");
  document.getElementById("thankButton").classList.remove("shownbutton");
}

function thankDeveloper() {
  alert("Thank you for using this website!");
  document.getElementById("overlay").style.display = "none";            
  document.getElementById("thankButton").classList.add("hidden");
  document.getElementById("closethank").classList.add("hidden");
  document.getElementById("thanktext").classList.add("hidden");
  document.getElementById("nametext").classList.add("hidden");
  document.getElementById("closethank").classList.remove("closethank");
  document.getElementById("thanktext").classList.remove("shown");
  document.getElementById("nametext").classList.remove("shown");
  document.getElementById("thankButton").classList.remove("shownbutton");
  localStorage.setItem("thanks", "true")
  fetch("/thanks",
  {
      method: "POST",

      body: 1,
      headers: 
      {
          "Content-Type": "application/x-www-form-urlencoded"
      }
  
  }).then((response) => 
  { 
      console.log("thanks sucsessfuly posted")
  });
}

// Delay the display of the thank you button after 15 seconds
setTimeout(function () {
    askforthanks = localStorage.getItem("thanks")
    if(askforthanks === "true") {
      console.log("they said thanks")
    }
    else{
      document.getElementById("overlay").style.display = "block"
      showThankButton();
    }
}, 15000);
