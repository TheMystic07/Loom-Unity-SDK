// aobridge.js
import { message, result, dryrun, createDataItemSigner } from "@permaweb/aoconnect";

const aoBridge = {
    // Store wallet connection
    wallet: null,
    
    // Connect Wallet
    connectWallet: async function() {
        try {
            await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
            this.wallet = window.arweaveWallet;
            const address = await window.arweaveWallet.getActiveAddress();
            return address;
        } catch (error) {
            console.error('Wallet connection error:', error);
            return null;
        }
    },

    // Send Message
    sendMessage: async function(processId, messageData, tags) {
        try {
            const response = await message({
                process: processId,
                tags: tags,
                data: messageData,
                signer: createDataItemSigner(this.wallet)
            });
            return JSON.stringify(response);
        } catch (error) {
            console.error('Send message error:', error);
            return JSON.stringify({ error: error.message });
        }
    },

    // Get Result
    getResult: async function(messageId, processId) {
        try {
            const response = await result({
                message: messageId,
                process: processId
            });
            return JSON.stringify(response);
        } catch (error) {
            console.error('Get result error:', error);
            return JSON.stringify({ error: error.message });
        }
    },

    // Dry Run
    dryRun: async function(processId, data, tags) {
        try {
            const response = await dryrun({
                process: processId,
                data: data,
                tags: tags
            });
            return JSON.stringify(response);
        } catch (error) {
            console.error('Dry run error:', error);
            return JSON.stringify({ error: error.message });
        }
    }
};

window.aoBridge = aoBridge;