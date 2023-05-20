import {
    generate_skills
} from './generate_skills.js'
import {
    generate_services
} from './generate_services.js'
import {
    generate_works
} from './generate_works.js'

function scrolHeader() {
    let header = document.getElementById('header');
    if (this.scrollY >= 50)
        header.classList.add('scroll-header');
    else
        header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrolHeader);


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
// console.log(sections);
const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {

        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
            // console.log(sectionsClass);
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset:true,
});
sr.reveal(`.home__data`)
sr.reveal(`.home__handle`, {
    delay: 700
})
sr.reveal(`.home__handle .home__scroll`, {
    delay: 900,
    origin: 'bottom'
})

$(document).ready(() => {
    generate_skills()
    generate_services()
    generate_works()
    $('form').submit(function (e) {
        e.preventDefault();
        sendEmail();
        // or return false;
    });
});

function sendEmail() {
    let name = document.getElementById('mail_name').value;
    let email = document.getElementById('mail_email').value;
    let project = document.getElementById('mail_project').value;
    // $.post('../php/send_email.php', {
    //     email: email,
    //     name: name,
    //     project: project
    // }, function (data, status) {
    //     console.log("Data: " + data + "\nStatus: " + status);
    // });
    $.ajax({
        type: 'POST',
        url: "php/send_email.php",
        data: {
            email: email,
            name: name,
            project: project
        },
        success: function (data) {
            let json = JSON.parse(data);
            alert(json.result);
        }
    });
}