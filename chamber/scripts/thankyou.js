document.addEventListener('DOMContentLoaded', () => {
    displaySubmittedData();
});

function displaySubmittedData() {
    const params = new URLSearchParams(window.location.search);
    
    const firstName = params.get('firstName') || 'N/A';
    const lastName = params.get('lastName') || 'N/A';
    const email = params.get('email') || 'N/A';
    const phone = params.get('phone') || 'N/A';
    const organization = params.get('organization') || 'N/A';
    const membership = params.get('membership') || 'N/A';
    const timestamp = params.get('timestamp') || 'N/A';

    setElementText('display-firstName', firstName);
    setElementText('display-lastName', lastName);
    setElementText('display-email', email);
    setElementText('display-phone', phone);
    setElementText('display-organization', organization);
    setElementText('display-membership', formatMembership(membership));
    setElementText('display-timestamp', formatTimestamp(timestamp));
}

function setElementText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
}

function formatMembership(membership) {
    const levels = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    };
    return levels[membership] || membership;
}

function formatTimestamp(isoString) {
    if (!isoString || isoString === 'N/A') {
        return 'N/A';
    }
    
    try {
        const date = new Date(isoString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        };
        return date.toLocaleDateString('en-US', options);
    } catch (error) {
        return isoString;
    }
}
