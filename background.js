let im_id = "open-image";
let y_id = "open-youtube";


chrome.contextMenus.create({
    id: im_id,
    title: "Open Image in New Window",
    contexts: ["image"],
});

chrome.contextMenus.create({
    id: y_id,
    title: "Open YouTube Video",
    contexts: ["link"],
    targetUrlPatterns: ["*://*.youtube.com/watch*"],

});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === im_id) {
        chrome.windows.create({
            url: info.srcUrl,
            type: 'popup',
            width: 400,
            height: 500
        });
    } else if (info.menuItemId === y_id) {
        // Open YouTube link in new window
        if (info.linkUrl.includes("youtube.com")) {
            try {
                chrome.windows.create({
                    url: info.linkUrl.replace("watch?v=", "embed/") + "?autoplay=1",
                    type: "popup",
                    width: 400,
                    height: 280
                });
            } catch (error) {
                console.error("Error:", error);
            }



        }
    }

});