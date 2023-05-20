export function generate_services() {
    let services = [

        {
            title: 'Training<br>Beginner',
            modal: {
                title: 'Training & Instruction',
                desc: `Teaching beginner or junior step by step and guiding them into programming world.`,
                list: [
                    'Andorid',
                    'Laravel',
                    'Vue',
                    'Flutter'
                ]
            }
        },
        {
            title: 'Mobile<br>Application',
            modal: {
                title: 'Mobile Application',
                desc: `Service with more than 7+ years of experience.<br>
                        Produce a beautiful and bug-free application.`,
                list: [
                    'Andorid',
                    'Java',
                    'Kolin',
                    'Flutter'
                ]
            }
        },
        {
            title: 'Back<br>End',
            modal: {
                title: 'Back End',
                desc: `Service with more than 3+ years of experience.<br>
                Produce a restFul API and GraphQL API well documented.`,
                list: [
                    'Laravel',
                    'PHP',
                    'Node.Js',
                    'JS/TS'
                ]
            }
        },
        {
            title: 'Front<br>End',
            modal: {
                title: 'Front End',
                desc: `Service with more than 3+ years of experience.<br>
                Produce a user friendly website.`,
                list: [
                    "Vue",
                    'HTML',
                    'CSS',
                    'JS',
                ]
            }
        },
        {
            title: 'Full<br>Stack',
            modal: {
                title: 'Full Stack',
                desc: `Service with more than 3+ years of experience.<br>
                Produce a bug-free, beautiful website and well documented`,
                list: [
                    'Laravel',
                    'PHP',
                    'Vue',
                    'JS'
                ]
            }
        },
    ]

    let services_html = ``;
    services.forEach(service => services_html += generate_services_card(service))
    let services_el = document.getElementById('services');
    services_el.innerHTML = services_html
    const modalViews = document.querySelectorAll('.services__modal')
    let modalBtns = document.querySelectorAll('.services__button')
    let modalClose = document.querySelectorAll('.services__modal-close')
    modalBtns.forEach((mb, i) => {
        mb.addEventListener('click', () => modal(modalViews, i))
    })
    modalClose.forEach((mc) => {
        mc.addEventListener('click', () => {
            modalViews.forEach((mv) => {
                mv.classList.remove('active-modal')
            })
        })
    })

}
let modal = function (modalViews, modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

const generate_services_card = (service, ) => `
                <div class="services__card">
                    <h3 class="services __title">${service.title}</h3>
                    <span class="services__button">
                        see more <i class="bx bx-right-arrow-alt services__icon"></i>
                    </span>
                    <div class="services__modal">
                        <div class="services__modal-content">
                            <i class="bx bx-x services__modal-close"></i>
                            <h3 class="services__modal-title">${service.modal.title}</h3>
                            <p class="services__modal-description">
                                ${service.modal.desc}
                            </p>
                            <ul class="services__modal-list">
                                ${modals_list_generater(service.modal.list)}
                            </ul>
                        </div>
                    </div>
                </div>
`

const modals_list_generater = (list) => {
    let html = ``;
    list.forEach(item => {
        html += `
                <li class="services__modal-item">
                    <i class="bx bx-check services__modal-icon"></i>
                    <p class="services__modal-info">${item}</p>
                </li>
        `
    })
    return html;
}