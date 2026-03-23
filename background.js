chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "translate") {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=si&dt=t&q=${encodeURIComponent(request.text)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data[0] && data[0][0]) {
                    sendResponse({ translatedText: data[0][0][0] });
                } else {
                    sendResponse({ translatedText: "Error processing translation" });
                }
            })
            .catch(error => {
                console.error("Translation Error:", error);
                sendResponse({ translatedText: "Network Error" });
            });

        return true; // Required to keep the response channel open for async fetch
    }
});