// scroll set smooth
$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        1000,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});

// cover
function hiddenCover() {
  document.getElementById("cover").style.visibility = "hidden";
  document.getElementById("cover-text").style.visibility = "hidden";
  window.scrollTo(0, 0);
  AOS.init();
  document.getElementById("music").play();
}

// music
var audio = document.getElementById("music");
var button = document.getElementById("musicIcon");

function buttonMusic() {
  if (button.className == "bi bi-play-circle-fill") {
    audio.play();
    button.className = "bi bi-pause-circle-fill";
  } else {
    audio.pause();
    button.className = "bi bi-play-circle-fill";
  }
}

// from submit to database, googlform
const scriptURL = "https://script.google.com/macros/s/AKfycbyz8kwGuHJCzZJe8lun5IFqojnJIy5IwZa9ovcam0IjqVei-M3HLjZztFOqFapxLkgahw/exec";
const form = document.forms["submit-form-undangaja"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-putar");
const btnDisabled = document.querySelector(".btn-disabled");
const alertTerima = document.querySelector(".alert-terima");

const nama = document.querySelector("#inputNama");
const pesan = document.querySelector("#inputUcapan");
const guest = document.querySelector("#guestbook");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      btnLoading.classList.toggle("d-none");
      btnDisabled.classList.toggle("d-none");
      alertTerima.classList.toggle("d-none");

      guest.innerHTML =
        '<div class="user-guestbook"><div class="row align-items-start"><div class="col-1"><i class="bi bi-person-badge" style="font-size: 25px"></i></div><div class="col-10"><h4>' +
        nama.value +
        "</h4><p>" +
        pesan.value +
        "</p></div></div></div><hr />";

      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});

// countdown
(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let birthday = document.getElementById("getCountdown").value,
    countDown = new Date(birthday).getTime(),
    x = setInterval(function () {
      let now = new Date().getTime(),
        distance = countDown - now;

      (document.getElementById("days").innerText = Math.floor(distance / day)),
        (document.getElementById("hours").innerText = Math.floor((distance % day) / hour)),
        (document.getElementById("minutes").innerText = Math.floor((distance % hour) / minute)),
        (document.getElementById("seconds").innerText = Math.floor((distance % minute) / second));

      //do something later when date is reached
      if (distance < 0) {
        let headline = document.getElementById("headline"),
          countdown = document.getElementById("countdown"),
          content = document.getElementById("content");

        headline.innerText = "Countdown Timer";
        countdown.style.display = "none";
        content.style.display = "block";

        clearInterval(x);
      }
      //seconds
    }, 0);
})();
