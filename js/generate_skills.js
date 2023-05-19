export function generate_skills() {
    let skills__container = document.getElementById('skills__container');

    let android_skills_content_html = generate_skills_content(
        'Mobile developer',
        [
            [{
                    title: 'Java',
                    level: 'Advanced'
                },
                {
                    title: 'Flutter',
                    level: 'Intermediate'
                },
                {
                    title: 'Kotlin',
                    level: 'Intermediate'
                },

            ],
            [{
                    title: 'Git',
                    level: 'Intermediate'
                },
                {
                    title: 'Google Store',
                    level: 'Basic'
                },
            ],
        ]
    )
    let web_skills_content_html = generate_skills_content('Web application developer', [
        [{
            title: 'PHP',
            level: 'Advanced'
        }, {
            title: 'Laravel',
            level: 'Intermediate'
        }, {
            title: 'Node.Js',
            level: 'Basic'
        }, ],
        [{
            title: 'MySQL',
            level: 'Intermediate'
        }, {
            title: 'Vue.Js',
            level: 'Intermediate'
        }, {
            title: 'Server Administrator',
            level: 'Basic'
        }, ]
    ])
    skills__container.innerHTML = android_skills_content_html + '\n' + web_skills_content_html
}

const generate_skills_content = (title, skills_boxes) => {
    let skills_box_html = ''
    skills_boxes.forEach((box) => {
        let skills_groups_html = generate_skills_group(box)
        skills_box_html += skills_groups_html + '\n'
    })

    // let skills_groups_html = generate_skills_group(skills_groups)
    return `
    <div class="skills__content">
        <h3 class="skills__title">${title}</h3>
        <div class="skills__box">
            ${skills_box_html}
        </div>
    </div>
    `
}
const generate_skills_group = (group) => {
    let skills_group = '<div class="skills__group">\n';
    group.forEach(element => {
        skills_group += `
        <div class="skills__data">
        <i class="bx bxs-badge check"></i>
        <div>
            <h3 class="skills__name">${element.title}</h3>
            <span class="skills__level">${element.level}</span>
        </div>
    </div>
        `;
        skills_group += '\n';
    });
    skills_group += ' </div>\n';
    return skills_group;
}
// export const module = {
//     generate_skills
// }