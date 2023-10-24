const { EventGridPublisherClient } = require("@azure/eventgrid");
const { DefaultAzureCredential } = require('@azure/identity');


async function main() {

    const client = new EventGridPublisherClient(
        "<endpoint>",
        "<endpoint schema>",
        new DefaultAzureCredential()
      );
      
}

main()
    .then(() => console.log("\nDone"))
    .catch((ex) => console.log(ex.message));