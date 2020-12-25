const handleMouseEnter = (e) => {
  if (!e.target.dataset.expand) {
    return;
  }

  navsVisited += 1;

  if (navsVisited === 1) {
    expandMenu.classList.add("new--expand");
    menus.forEach((menu) => menu.classList.add("first"));
    indicator.classList.add("first");
  } else {
    expandMenu.classList.remove("new--expand");
    menus.forEach((menu) => menu.classList.remove("first"));
    indicator.classList.remove("first");
  }

  navLinks.forEach((navLink) => {
    if (navLink === e.target) {
      navLink.classList.add("hover");
      currentNav = navLink;
    } else {
      navLink.classList.remove("hover");
    }
  });

  const navLinkCenter = Math.floor(
    e.target.offsetLeft + e.target.clientWidth / 2
  );

  indicator.style.transform = `translateX(${navLinkCenter}px)`;
  indicator.style.opacity = "1";

  const targetMenu = document.querySelector(`#${e.target.dataset.expand}`);
  const targetCoords = targetMenu.getBoundingClientRect();
  const { width: targetWidth, height: targetHeight } = targetCoords;

  expandMenu.style.width = targetWidth + "px";
  expandMenu.style.height = targetHeight + "px";

  const prevMenu = targetMenu.previousElementSibling;

  targetMenu.classList.remove("prev");

  if (prevMenu) {
    prevMenu.classList.add("prev");
  }

  menus.forEach((menu) => {
    if (menu.id === targetMenu.id) {
      menu.classList.add("active");
    } else {
      menu.classList.remove("active");
    }
  });

  expandMenu.classList.add("expand");
};

const handleMouseLeave = (e) => {
  if (isMouseOnMenu || e.y > 50) {
    return;
  }

  forceInitialState();
};

const forceInitialState = () => {
  expandMenu.classList.remove("expand", "active");
  currentNav.classList.remove("hover");
  menus.forEach((menu) => menu.removeAttribute("class"));
  indicator.style.opacity = "0";
  currentNav = null;
  navsVisited = 0;
};

const expandMenu = document.querySelector(".header__expandMenu");
const menus = expandMenu.querySelectorAll(".menu__container > *");
const navLinks = document.querySelectorAll(".nav--link");
const indicator = document.querySelector(".tip");
let isMouseOnMenu = false;
let currentNav;
let navsVisited = 0;

const {
  height: menuHeight,
  width: menuWidth,
} = expandMenu.getBoundingClientRect();

navLinks.forEach((navLink) => {
  navLink.addEventListener("mouseenter", handleMouseEnter);
});

expandMenu.addEventListener("mouseenter", () => {
  if (expandMenu.style.opacity === "1") {
    isMouseOnMenu = true;
  }
});

expandMenu.addEventListener("mouseleave", (e) => {
  if (e.y > 70) {
    isMouseOnMenu = false;
    forceInitialState();
  }
});

document
  .querySelector(".nav__links")
  .addEventListener("mouseleave", handleMouseLeave);
