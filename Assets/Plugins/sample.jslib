mergeInto(LibraryManager.library, {

    Alert: async function () {
        window.alert("Hello from Unity!");
        await window.arweaveWallet.connect(["SIGN_TRANSACTION", "ACCESS_ADDRESS"]);
    },

    AlertParam: async function (message) {
        const address = await window.arweaveWallet.getActiveAddress();
        window.alert(UTF8ToString(message) + address);
    },

    // Send message to AOConnect with dynamic data and tags
    SendMessageToAO: async function (dataPtr, tagsPtr,pidPtr) {
        const data = UTF8ToString(dataPtr);
        const tagsJSON = UTF8ToString(tagsPtr);
        const tags = JSON.parse(tagsJSON);
        const pid = UTF8ToString(pidPtr);

        console.log("Sending message with data:", data, "and tags:", tags);

        try {
            await AOConnectLibrary.sendMessage(pid ,data, tags);
            console.log("Message sent successfully from Unity!");
        } catch (err) {
            console.error("Error sending message from Unity:", err);
        }
    },

});
