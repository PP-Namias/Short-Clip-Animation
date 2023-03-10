const hulu = new SplitText("#namias-text"),
      originals = new SplitText("#originals-text");

const t1 = new gsap.timeline();

t1.from(["#top-gradient", "#bottom-gradient"], 0.7, { ease: "power3.inOut", filter: "blur(0px)", opacity: 0 })
  .from("#green-filter", 0.8, { opacity: 0, scale: 3 }, "-=50%")
  .to("#green-filter", 0.25, { opacity: 0, scale: 3 })
  .to(["#top-gradient", "#bottom-gradient"], 0.3, { filter: "blur(0px)", opacity: 0 }, "-=100%")
  .set("#logo", { opacity: 1 })
  .from(hulu.chars, 0.2, { ease: "back", filter: "blur(0.3em)", opacity: 0, scale: 1.5, stagger: 0.02 })
  .from(originals.chars, 0.2, { delay: 0.25, filter: "blur(0.3em)", opacity: 0, scale: 0.5, stagger: 0.02, xPercent: -25 })
  .from("#logo-border", 0.4, { ease: "power3.out", opacity: 0, scale: 0.75 }, "-=100%")
  .from("#logo-border-inner", 0.4, { ease: "power3.out", scale: 0.75 }, "-=100%")
  .to("#logo", 1.5, { scale: 1.1 }, "-=20%")
  .to(["#logo-border", "#logo-border-inner"], 1.5, { ease: "power3.out", scale: 1.1 }, "-=100%")
  .to("#logo-border", 1.25, { ease: "power4.in", scale: 8 }, "-=50%")
  .to("#logo-border-inner", 0.5, { ease: "power4.in", scale: 8 }, "-=60%")
  .to("#logo", 0.25, { opacity: 0, scale: 1.2 }, "-=50%");

document.getElementById("restart-button").onclick = () => t1.restart();

const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0,
    toggled = false;

const toggle = () => {
  toggled = !toggled;
  
  document.body.classList.toggle("toggled");
}

const handleOnClick = index => {
  toggle();
  
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  tile.style.opacity = toggled ? 0 : 1;
  
  tile.onclick = e => handleOnClick(index);
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.body.clientWidth > 800 ? 100 : 50;
  
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();