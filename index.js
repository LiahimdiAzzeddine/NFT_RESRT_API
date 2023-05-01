import express from 'express';
import path from 'path';
import fs from 'fs';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const app = express();
// Serve the glb file and its animation from a static directory
app.use('/assets', express.static(path.join(process.cwd(), 'public')));
app.get('/', (req, res) => {
  // Replace this with your desired response
  res.send('Hello from the /nft/woman route!');
});

// Endpoint for generating the link to the iframe
app.get('/character/:tokenId', async (req, res) => {
  const tokenId = req.params.tokenId;
  const sdk = new ThirdwebSDK("goerli");
  const contract = await sdk.getContract("0x558Cdc58d9f1d5E26c995a039FD1d4dd2e1c1a39");
  const animation = await contract.call(
    "getNftAnimation", // Name of your function as it is on the smart contract
    [
      tokenId, // e.g. Argument 1
    ],
  );
  const options = {
    root: path.join(process.cwd(), 'public'),
    index: 'index.html',
  };
  const html = fs.readFileSync(path.join(options.root, options.index), 'utf8');
  const placeholder = '__DATA_FROM_SERVER__';
  const renderedHtml = html.replace(placeholder, JSON.stringify(animation));
  res.send(renderedHtml);
});



app.listen(4000, () => console.log('Server running on port 4000'));
