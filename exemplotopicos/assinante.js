const { delay, ServiceBusClient, ServiceBusMessage } = require("@azure/service-bus");
const { DefaultAzureCredential } = require("@azure/identity");
const WebSocket = require('ws');
// Replace `<SERVICE-BUS-NAMESPACE>` with your namespace
const fullyQualifiedNamespace = "waltercoan.servicebus.windows.net";

// Passwordless credential
const credential = new DefaultAzureCredential();

const connectionOptions = {
    webSocketOptions: {
        webSocket : WebSocket
    }
};

const topicName = "univille";
const subscriptionName = "walter";

 async function main() {
    // create a Service Bus client using the passwordless authentication to the Service Bus namespace
    const sbClient = new ServiceBusClient(fullyQualifiedNamespace, credential, connectionOptions);

    // createReceiver() can also be used to create a receiver for a queue.
    const receiver = sbClient.createReceiver(topicName, subscriptionName);

    // function to handle messages
    const myMessageHandler = async (messageReceived) => {
        console.log(`Received message: ${messageReceived.body}`);
    };

    // function to handle any errors
    const myErrorHandler = async (error) => {
        console.log(error);
    };

    // subscribe and specify the message and error handlers
    receiver.subscribe({
        processMessage: myMessageHandler,
        processError: myErrorHandler
    });

    // Waiting long enough before closing the sender to send messages
    await delay(50000000);

    await receiver.close();
    await sbClient.close();
}

// call the main function
main().catch((err) => {
    console.log("Error occurred: ", err);
    process.exit(1);
 });