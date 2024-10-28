mergeInto(LibraryManager.library, {
    ConnectToAO: function () {
        return AOConnectLibrary.connectToAO().then(session => {
            console.log('Connected to AO:', session);
            return session ? 1 : 0;  
        }).catch(err => {
            console.error('Error in AO connection:', err);
            return 0;  
        });
    },

    SendMessageToAO: function () {
        return AOConnectLibrary.sendMessage().then(() => {
            console.log("Message sent!");
            return 1;
        }).catch(err => {
            console.error("Error sending message:", err);
            return 0;
        });
    },

    GetAOMessage: function () {
        return AOConnectLibrary.getMessage().then(result => {
            console.log("Message fetched:", result);
            return 1;
        }).catch(err => {
            console.error("Error fetching message:", err);
            return 0;
        });
    }
});
