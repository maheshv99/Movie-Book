//Create you project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];
// Use moviesList array for displaing the Name in the dropdown menu
const MovieName = document.getElementById("movieName");
const MoviePrice = document.getElementById("moviePrice");
const totalPrice = document.getElementById("totalPrice");
const NumberOfSeatsSelected = document.getElementById("numberOfSeat");
const allSeats = document.querySelectorAll("#seatCont .seat");
const displaySeatNumbers = document.getElementById("selectedSeatsHolder");
const continueBtn = document.getElementById("proceedBtn");
const cancelBtn = document.getElementById("cancelBtn");

const moviesDropDown = document.getElementById("selectMovie");
moviesList.forEach((movie) => {
  let element = `
  <option ${movie.movieName == "Flash" ? 'selected="selected"' : ""}>${
    movie.movieName
  }</option>
  `;
  moviesDropDown.innerHTML += element;

  //default movie details updating
  const SelectedMovie = document.querySelector(
    '#selectMovie option[selected="selected"]'
  );
  console.log(SelectedMovie);
  if (SelectedMovie) {
    let moviePrice = moviesList.filter((movie) => {
      if (movie.movieName == SelectedMovie.textContent) {
        return movie.price;
      }
    })[0].price;

    MovieName.textContent = SelectedMovie.textContent;
    MoviePrice.textContent = `$ ${moviePrice}`;

    // updating total price
    updateTotalPrice();
  }
});

moviesDropDown.onchange = updateMoviDetailes;

function updateMoviDetailes() {
  // remove previous selected option attribute
  const dropdownList = document.querySelectorAll("#selectMovie option");
  dropdownList.forEach((option) => {
    option.removeAttribute("selected");
  });

  // adding current checked option to selected attribute
  const SelectedMovie = document.querySelector("#selectMovie option:checked");
  SelectedMovie.setAttribute("selected", "selected");

  // movies price finding
  let moviePrice = moviesList.filter((movie) => {
    if (movie.movieName == SelectedMovie.textContent) {
      return movie.price;
    }
  })[0].price;

  MovieName.textContent = SelectedMovie.textContent;
  MoviePrice.textContent = `$ ${moviePrice}`;

  // updating total price
  updateTotalPrice();
}

// updating total price
function updateTotalPrice() {
  let price =
    Number(moviePrice.textContent.replaceAll("$", "")) *
    NumberOfSeatsSelected.innerText;
  totalPrice.textContent = `$ ${price}`;
}
updateTotalPrice();

//Add eventLister to each unoccupied seat
console.log(allSeats);

allSeats.forEach((seat) => {
  let unoccupiedseat = seat.classList;
  if (!unoccupiedseat.contains("occupied")) {
    seat.addEventListener("click", seatClickHandler);
  }
});

function seatClickHandler(event) {
  const seat = event.target;
  const index = Array.from(seat.parentNode.children).indexOf(seat) + 1;
  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    NumberOfSeatsSelected.innerText =
      Number(NumberOfSeatsSelected.innerText) - 1;
    displaySeatNumbers.querySelector(`span[key="${index}"]`).remove();
  } else {
    seat.classList.add("selected");
    NumberOfSeatsSelected.innerText =
      Number(NumberOfSeatsSelected.innerText) + 1;
    displaySeatNumbers.innerHTML += `<span class="selected" key="${index}">${index}</span>`;
  }

  if (displaySeatNumbers.querySelectorAll("span.selected").length > 0) {
    displaySeatNumbers.querySelector(".noSelected").style.display = "none";
  } else {
    displaySeatNumbers.querySelector(".noSelected").style.display =
      "inline-block";
  }

  updateTotalPrice();
}

//Add eventLsiter to continue Button

continueBtn.addEventListener("click", () => {
  if (NumberOfSeatsSelected.textContent <= 0) {
    alert("Oops no seat Selected");
  } else {
    alert("Yayy! Your Seats have been booked");
    allSeats.forEach((seat) => {
      let selectedSeat = seat.classList;
      if (selectedSeat.contains("selected")) {
        seat.classList.remove("selected");
        seat.classList.add("occupied");
        seat.removeEventListener("click", seatClickHandler);
        setDeafaultValuePriceAndSeatHolder();
      }
    });
  }
});

function setDeafaultValuePriceAndSeatHolder() {
  NumberOfSeatsSelected.textContent = 0;
  updateTotalPrice();
  displaySeatNumbers.innerHTML = `<span class="noSelected">No Seat Selected</span>`;
}
//Add eventListerner to Cancel Button

cancelBtn.addEventListener("click", () => {
  allSeats.forEach((seat) => {
    if (seat.classList.contains("selected")) {
      seat.classList.remove("selected");
    }
  });
  setDeafaultValuePriceAndSeatHolder();
});
