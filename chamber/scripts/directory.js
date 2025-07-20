const directory = document.getElementById('directory');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');

async function getMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members, directory.classList.contains('grid'));
}

function displayMembers(members, isGrid) {
    directory.innerHTML = '';
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = isGrid ? 'business-card' : 'business-list-item';
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <div>
                <h3>${member.name}</h3>
                <p>${member.tagline}</p>
                <p><strong>Address:</strong> ${member.address}<br>
                <strong>Phone:</strong> ${member.phone}<br>
                <strong>Email:</strong> <a href="mailto:info@${member.website.replace(/^https?:\/\//, '')}">info@${member.website.replace(/^https?:\/\//, '')}</a><br>
                <strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a><br>
                <strong>Membership:</strong> ${['Member','Silver','Gold'][member.membership-1]}</p>
            </div>
        `;
        directory.appendChild(card);
    });
}

gridBtn.addEventListener('click', () => {
    directory.classList.add('grid');
    directory.classList.remove('list');
    getMembers();
});
listBtn.addEventListener('click', () => {
    directory.classList.add('list');
    directory.classList.remove('grid');
    getMembers();
});

getMembers();