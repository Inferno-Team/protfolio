export function generate_works() {
  let works = [
    {
      type: "mobile",
      title: "My Day Application",
      img: "imgs/myday.jpg",
      link: "https://play.google.com/store/apps/details?id=team.inferno.mobile.my_day_app",
      langs: ["java", "kotlin", "back4apps"],
    },
    {
      type: ["flutter", "laravel", "fullstack"],
      title: "Healthy Minders",
      img: "imgs/favicon.png",
      link: "https://healthy.digiworld-dev.com",
      langs: ["dart", "flutter", "laravel", "php", "websocket"],
    },
    {
      type: ["laravel", "fullstack"],
      title: "Survey System",
      img: "imgs/bxs-brain.svg",
      link: "https://int.digiworld-dev.com",
      langs: ["laravel", "php", "blade", "vue.JS", "websocket"],
    },
    {
      type: "laravel",
      title: "YAMHAD Market",
      img: "imgs/YAMHAD.png",
      link: "#",
      langs: ["laravel"],
    },
    {
      type: "laravel",
      title: "Hotel Management API",
      img: "imgs/hotel.webp",
      link: "#",
      langs: ["laravel"],
    },

    {
      type: "fullstack",
      title: "Hire Me",
      img: "imgs/hireme.PNG",
      link: "https://hireme.inferno-team.cloud/",
      langs: ["laravel", "vue.js", "vuetify"],
    },
  ];
  let works_html = ``;
  console.log(Array.isArray(works[1].type));
  works.forEach((work) => (works_html += generate_work_card(work) + "\n"));
  let works_el = document.getElementById("works");
  works_el.innerHTML = works_html;

  /* MIX IT UP */

  let mixer = mixitup(".work__container", {
    selectors: {
      target: ".work__card",
    },
    animation: {
      duration: 300,
    },
  });

  /* link active work */
  const linkWork = document.querySelectorAll(".work__item");

  function activeWork() {
    linkWork.forEach((l) => l.classList.remove("active-work"));
    this.classList.add("active-work");
  }
  linkWork.forEach((l) => l.addEventListener("click", activeWork));
}

const generate_work_card = (work) => `
         <div class="work__card mix ${
           Array.isArray(work.type)
             ? generate_type_from_array(work.type)
             : work.type
         }">
            <img src="${work.img}" alt="${work.title} logo" class="work__img">
            <h3 class="work__title">${work.title}</h3>
            <a href="${work.link}" target='_blank' class="work__button">
                Demo <i class="bx bx-right-arrow-alt work__icon"></i>
            </a>
        </div>
`;
function generate_type_from_array(types) {
  let string = "";
  types.forEach((element) => {
    string += ` ${element}`;
  });
  return string;
}
