let images = document.querySelectorAll("img");
let wrapper = document.getElementById("wrapper");
let imgwrapper = document.getElementById("fullImg");
let close = document.querySelector("span");

console.log(images)

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        openModal(`/asset/image_test.jpg`);
    });
});
close.addEventListener("click", () => (wrapper.style.display = "none"));

function openModal(pic) {
    console.log("test2")
    wrapper.style.display = "flex";
    imgWrapper.src = pic;
}