const listItem = document.querySelector("display-characters");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pageNumber = document.getElementById("page");
const loading = document.getElementById("loading"); // Loading element
const dataList = document.getElementById("display-characters");

prev.addEventListener("click", () => {
  const page = pageNumber.innerHTML;
  const newPage = parseInt(page) - 1;
  getCharacters(newPage);
});

next.addEventListener("click", () => {
  const page = pageNumber.innerHTML;
  const newPage = parseInt(page) + 1;
  getCharacters(newPage);
});

const getCharacters = async (page) => {
  const pageNumber = document.getElementById("page");
  loading.style.display = "block";
  dataList.innerHTML = "";
  pageNumber.innerHTML = page;
  await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((response) => response.json())
    .then((character) => {
      //
      if (character.info.prev === null) {
        prev.style.display = "none";
      } else {
        prev.style.display = "block";
      }
      if (character.info.next === null) {
        next.style.display = "none";
      } else {
        next.style.display = "block";
      }
      character.results.forEach((item) => {
        dataList.innerHTML += `
          <div class="card">
            <img src="${item.image}" alt="${item.name}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title text-center">${item.name}</h5>
              <p class="card-text text-center">${item.status}</p>
            </div>
          </div>
          `;
      });
      loading.style.display = "none";
    })
    .catch((error) => console.error("Error fetching characters:", error));
};

getCharacters(1);
