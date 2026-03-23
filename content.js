let currentTooltip = null;
let currentTimeout = null;

// Listen for text selection
document.addEventListener('mouseup', function(event) {
    // 1. Fetch user settings from storage (Defaults: Alt key, 8 seconds)
    chrome.storage.sync.get({ modifierKey: 'Alt', displayTime: 8 }, (settings) => {
        
        let keyMatched = false;
        if (settings.modifierKey === 'Alt' && event.altKey) keyMatched = true;
        if (settings.modifierKey === 'Ctrl' && (event.ctrlKey || event.metaKey)) keyMatched = true;
        if (settings.modifierKey === 'Shift' && event.shiftKey) keyMatched = true;

        if (!keyMatched) return; // Stop if the correct key isn't held

        const selectedText = window.getSelection().toString().trim();

        // 2. Process text if it's a reasonable length
        if (selectedText.length > 0 && selectedText.length < 150) {
            
            // Show loading state immediately
            renderTooltip("Translating...", event.clientX, event.clientY, settings.displayTime);

            // Send to background.js
            chrome.runtime.sendMessage(
                { action: "translate", text: selectedText },
                function(response) {
                    if (response && response.translatedText) {
                        if (currentTooltip) currentTooltip.innerText = response.translatedText;
                    } else {
                        if (currentTooltip) currentTooltip.innerText = "Error";
                    }
                }
            );
        }
    });
});

// Hide tooltip if the user clicks anywhere else on the page
document.addEventListener('mousedown', function() {
    if (currentTooltip) {
        currentTooltip.remove();
        currentTooltip = null;
    }
});

function renderTooltip(text, x, y, displayTimeInSeconds) {
    if (currentTooltip) currentTooltip.remove();
    if (currentTimeout) clearTimeout(currentTimeout);

    currentTooltip = document.createElement('div');
    currentTooltip.innerText = text;

    // Styling the tooltip
    Object.assign(currentTooltip.style, {
        position: 'fixed', 
        backgroundColor: '#202124', color: '#ffffff',
        padding: '8px 12px', borderRadius: '6px',
        fontSize: '15px', fontFamily: 'sans-serif',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: '2147483647', opacity: '0',
        transition: 'opacity 0.2s ease-in', pointerEvents: 'none',
        whiteSpace: 'nowrap'
    });

    document.body.appendChild(currentTooltip);

    // 3. Smart Positioning to keep it on screen
    const tooltipRect = currentTooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalX = x;
    let finalY = y + 20;

    if (finalX + tooltipRect.width > viewportWidth - 20) finalX = viewportWidth - tooltipRect.width - 20;
    if (finalY + tooltipRect.height > viewportHeight - 20) finalY = y - tooltipRect.height - 10;

    currentTooltip.style.left = `${finalX}px`;
    currentTooltip.style.top = `${finalY}px`;

    // Fade in
    requestAnimationFrame(() => currentTooltip.style.opacity = '1');

    // 4. Auto-remove timer based on settings
    currentTimeout = setTimeout(() => {
        if (currentTooltip) {
            currentTooltip.style.opacity = '0';
            setTimeout(() => {
                if (currentTooltip) {
                    currentTooltip.remove();
                    currentTooltip = null;
                }
            }, 200);
        }
    }, displayTimeInSeconds * 1000);
}