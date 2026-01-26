function getMembershipLevel(level) {
    const levels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
    return levels[level] || 'Member';
}

document.addEventListener('DOMContentLoaded', () => {
    const spotlightsContainer = document.querySelector('.spotlight-list');
    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {
            const goldSilver = members.filter(m => m.membership === 2 || m.membership === 3);

            const count = Math.floor(Math.random() * 2) + 2;
            const shuffled = goldSilver.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, count);

            spotlightsContainer.innerHTML = '';
            selected.forEach(member => {
                const membershipName = getMembershipLevel(member.membership);
                const div = document.createElement('div');
                div.className = 'spotlight';
                div.innerHTML = `
                    <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                    <h3>${member.name}</h3>
                    <p class="membership-badge ${membershipName.toLowerCase()}">${membershipName} Member</p>
                    <p class="tagline">${member.tagline}</p>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
                `;
                spotlightsContainer.appendChild(div);
            });
        })
        .catch(err => {
            spotlightsContainer.innerHTML = '<p>Unable to load member spotlights.</p>';
        });
});