const toggleBlocking = document.getElementById("toggle-blocking");

chrome.storage.sync.get(["blockingEnabled"], (data) => {
    toggleBlocking.checked = data.blockingEnabled || false;
});

toggleBlocking.addEventListener("change", () => {
    const isEnabled = toggleBlocking.checked;

    chrome.runtime.sendMessage(
        { action: "setBlocking", value: isEnabled },
        (response) => {
            if (response.status === "success") {
                console.log(
                    `Blokowanie nowych kart: ${
                        isEnabled ? "włączone" : "wyłączone"
                    }`
                );
            }
        }
    );
});
