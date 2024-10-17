const listItem = document.querySelector("display-characters");

const more = document.getElementById("more");
const pageNumber = document.getElementById("page");
const loading = document.getElementById("loading");
const dataList = document.getElementById("display-characters");

const getCharacters = async (page) => {
  const pageNumber = document.getElementById("page");
  loading.style.display = "block";
  pageNumber.innerHTML = page;
  await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((response) => response.json())
    .then((character) => {
      console.log("character", character);
      character.results.forEach((item) => {
        dataList.innerHTML += `
          <div id=${item.id} class="card">
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

const openModal = async (id) => {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => response.json())
    .then((character) => {
      modal.innerHTML = `
      
    <div class="modal-dialog">
    <button id="close" class="btn btn-close">X</button>
     <h3>${character.name}</h3>
     <img src="${character.image}" alt="${character.name}" class="card-img-top">
      <p>${character.status}</p>
      </div>
      
`;
      const close = document.getElementById("close");
      close.addEventListener("click", () => {
        modal.style.display = "none";
      });
      const body = document.querySelector("body");
      body.addEventListener("click", (e) => {
        if (e.target.id === "modal") {
          modal.style.display = "none";
        }
      });
    })
    .catch((error) => console.error("Error fetching character:", error));
};

const loadMoreData = async () => {
  const dataList = document.getElementById("display-characters");
  const pageNumber = document.getElementById("page");
  console.log(pageNumber.innerHTML);
  await fetch(
    `https://rickandmortyapi.com/api/character/?page=${
      Number(pageNumber.innerHTML) + 1
    }`
  )
    .then((response) => response.json())
    .then((character) => {
      character.results.forEach((item) => {
        dataList.innerHTML += `
      <div class="modal-dialog">
    <button id="close" class="btn btn-close">X</button>
     <h3>${character.name}</h3>
     <img src="${character.image}" alt="${character.name}" class="card-img-top">
      <p>${character.status}</p>
      </div>`;
      });
      document.querySelectorAll(".card").forEach((card, index) => {
        card.addEventListener("click", () => {
          openModal(character.results[index].id);
        });
      });
      loading.style.display = "none";
    })
    .catch((error) => console.error("Error fetching characters:", error));
};

more.addEventListener("click", () => {
  getCharacters(Number(pageNumber.innerHTML) + 1);
});

dataList.onclick = function (e) {
  const target = e.target;

  if (target.id !== "display-characters") {
    const cardId = target.closest(".card").id;
    openModal(cardId);
  }
};
