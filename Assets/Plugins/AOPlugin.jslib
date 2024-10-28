mergeInto(LibraryManager.library, {
    ConnectWallet: async function() {
        try {
            const address = await window.aoBridge.connectWallet();
            var bufferSize = lengthBytesUTF8(address) + 1;
            var buffer = _malloc(bufferSize);
            stringToUTF8(address, buffer, bufferSize);
            return buffer;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    SendAOMessage: async function(processId, data, tagsJson) {
        const procId = UTF8ToString(processId);
        const messageData = UTF8ToString(data);
        const tags = JSON.parse(UTF8ToString(tagsJson));
        
        try {
            const result = await window.aoBridge.sendMessage(procId, messageData, tags);
            var bufferSize = lengthBytesUTF8(result) + 1;
            var buffer = _malloc(bufferSize);
            stringToUTF8(result, buffer, bufferSize);
            return buffer;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    GetAOResult: async function(messageId, processId) {
        const msgId = UTF8ToString(messageId);
        const procId = UTF8ToString(processId);
        
        try {
            const result = await window.aoBridge.getResult(msgId, procId);
            var bufferSize = lengthBytesUTF8(result) + 1;
            var buffer = _malloc(bufferSize);
            stringToUTF8(result, buffer, bufferSize);
            return buffer;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    DryRunAO: async function(processId, data, tagsJson) {
        const procId = UTF8ToString(processId);
        const dryRunData = UTF8ToString(data);
        const tags = JSON.parse(UTF8ToString(tagsJson));
        
        try {
            const result = await window.aoBridge.dryRun(procId, dryRunData, tags);
            var bufferSize = lengthBytesUTF8(result) + 1;
            var buffer = _malloc(bufferSize);
            stringToUTF8(result, buffer, bufferSize);
            return buffer;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
});