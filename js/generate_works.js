export function generate_works() {
    let works = [{
            type: 'mobile',
            title: 'My Day Application',
            img: '/imgs/myday.jpg',
            link:'https://team-inferno-mobile-my-day-app.en.uptodown.com/'
        },
        {
            type: 'laravel',
            title: 'YAMHAD Market',
            img: '/imgs/YAMHAD.png',
            link:'#'
        },
        {
            type: 'fullstack',
            title: 'Hire Me',
            img: '/imgs/hireme.PNG',
            link:'https://hireme.inferno-team.cloud/'
        },
    ]
    let works_html = ``
    works.forEach(work => works_html += generate_work_card(work) + '\n');
    let works_el = document.getElementById('works')
    works_el.innerHTML = works_html

    /* MIX IT UP */

    let mixer = mixitup('.work__container', {
        selectors: {
            target: '.work__card'
        },
        animation: {
            duration: 300
        }
    });

    /* link active work */
    const linkWork = document.querySelectorAll('.work__item');

    function activeWork() {
        linkWork.forEach(l => l.classList.remove('active-work'));
        this.classList.add('active-work');
    }
    linkWork.forEach(l => l.addEventListener('click', activeWork));

}

const generate_work_card = (work) => `
         <div class="work__card mix ${work.type}">
            <img src="${work.img}" alt="" class="work__img">
            <h3 class="work__title">${work.title}</h3>
            <a href="${work.link}" target='_blank' class="work__button">
                Demo <i class="bx bx-right-arrow-alt work__icon"></i>
            </a>
        </div>
`