let isBlockingEnabled = false;

chrome.storage.sync.get(["blockingEnabled"], (data) => {
    isBlockingEnabled = data.blockingEnabled || false;
});

chrome.tabs.onCreated.addListener((tab) => {
    if (isBlockingEnabled) {
        chrome.tabs.remove(tab.id, () => {});
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "setBlocking") {
        isBlockingEnabled = message.value;
        chrome.storage.sync.set({ blockingEnabled: isBlockingEnabled });
        sendResponse({ status: "success" });
    }
});
