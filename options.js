document.getElementById('saveBtn').addEventListener('click', () => {
    const modifier = document.getElementById('modifierKey').value;
    const time = document.getElementById('displayTime').value;

    chrome.storage.sync.set({
        modifierKey: modifier,
        displayTime: time
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Settings saved successfully!';
        setTimeout(() => { status.textContent = ''; }, 2500);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        modifierKey: 'Alt',
        displayTime: 8
    }, (items) => {
        document.getElementById('modifierKey').value = items.modifierKey;
        document.getElementById('displayTime').value = items.displayTime;
    });
});