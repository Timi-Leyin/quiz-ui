// @ts-nocheck
const openStartQuizPopup = document.querySelector("#open-level-popup");
const StartQuizPopup = document.querySelector("#level-popup");
const closeQuizPopup = document.querySelector("#close-level-popup");
openStartQuizPopup.addEventListener("click", (e) => {
    StartQuizPopup.style.display = "flex";
});
closeQuizPopup.addEventListener("click", (e) => {
    StartQuizPopup.style.display = "none";
});

