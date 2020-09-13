// Global Variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContent = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// Fetch Data from API
fetch(urlAPI)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

function displayEmployees(employeeData) {
  employees = employeeData;

  // Store employee HTML as we create it
  let employeeHTML = "";

  // Loop through each employee and create an HTML markup
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
    <div class="card column" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
        </div>
    </div>
  `;
  });

  gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
  // Use object destructuring to make the template literal cleaner
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `  
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${
    street.name
  }, ${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;

  overlay.classList.remove("hidden");
  modalContent.innerHTML += modalHTML;
}

// Event Listeners
gridContainer.addEventListener("click", (e) => {
  // make sure the click is not on the gridContainer itself
  if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
    displayModal(index);
  }
});

modalClose.addEventListener("click", () => {
  modalContent.innerHTML = "";
  overlay.classList.add("hidden");
});
