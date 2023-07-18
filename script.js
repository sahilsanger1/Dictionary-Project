const inputEl = document.getElementById("input");
const infoText = document.getElementById("info-text");
const meaningContaineEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEL = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

const btnEL = document.getElementById("btn");

async function fetchAPI(word) {
  try {
    infoText.style.display = "block";
    meaningContaineEl.style.display = "none";
    infoText.innerText = `Searching the meaning of
    ${word}`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningContaineEl.style.display = "block";
      infoText.style.display = "none";
      titleEl.innerText = word;
      meaningEL.innerText = "N / A";
      audioEl.style.display = "None";
    } else {
      infoText.style.display = "none";
      meaningContaineEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEl.innerText = result[0].word;
      meaningEL.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infoText.innerText = `an error happened try later`;
  }
}
btnEL.addEventListener("click", () => {
  const word = inputEl.value.trim();
  if (word !== "") {
    fetchAPI(word);
  }
});
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const word = inputEl.value.trim();
    if (word) {
      fetchAPI(word);
    }
  }
});
