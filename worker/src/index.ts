import { createClient } from "redis";

async function main() {
    const client = createClient();
    await client.connect();
    while(1) {
        const response = await client.brPop("submission", 0);
        
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        console.log('User submission accepted');
        console.log(response);
    }
}

main();