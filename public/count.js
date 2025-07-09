let count = 0;
const button = document.getElementById("bt");
const like = document.getElementById("like");
let aa = document.getElementById("aa");
let cmt = document.getElementById("cmt");

button.addEventListener("click", function () {
    count++;
    button.innerText = `like`;
    like.innerText=count
})

function clk() {
    if (cmt.style.display === "none") {
        cmt.style.display = "block"
    } else {
        cmt.style.display = "none"
    }
}
