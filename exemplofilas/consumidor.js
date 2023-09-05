const { QueueClient } = require("@azure/storage-queue");
const { DefaultAzureCredential } = require('@azure/identity');
const { v1: uuidv1 } = require("uuid");

async function main() {
    console.log("Azure Queue Storage client library - JavaScript quickstart sample");

    const queueName = "waltercoan";

    const queueClient = new QueueClient(`https://waltercoan.queue.core.windows.net/${queueName}`, new DefaultAzureCredential());
    console.log("\nCreating queue...");
    console.log("\t", queueName);

    const messages = await queueClient.receiveMessages({ numberOfMessages : 5 });

    for (i = 0; i < messages.receivedMessageItems.length; i++) {
        // Display the peeked message
        console.log("\t", 
            encodeBase64ToJson(messages.receivedMessageItems[i].messageText)
            );
        
        const deleteMessageResponse = await queueClient.deleteMessage(
            messages.receivedMessageItems[i].messageId,
            messages.receivedMessageItems[i].popReceipt
        );

    }

}

function jsonToBase64(jsonObj) {
    const jsonString = JSON.stringify(jsonObj)
    return  Buffer.from(jsonString).toString('base64')
}
function encodeBase64ToJson(base64String) {
    const jsonString = Buffer.from(base64String,'base64').toString()
    return JSON.parse(jsonString)
}

main()
    .then(() => console.log("\nDone"))
    .catch((ex) => console.log(ex.message));