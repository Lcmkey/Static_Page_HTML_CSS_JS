const marker = document.querySelector("#marker");
const item = document.querySelectorAll("nav a");

const indicator = (e) => {
  marker.style.left = e.offsetLeft + "px";
  marker.style.width = e.offsetWidth + "px";
};

[...item].map((link) => {
  link.addEventListener("mouseover", (e) => {
    indicator(e.target);
  });
});

indicator(item[0]);
