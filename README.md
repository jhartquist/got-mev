# got MEV?

A web application to help see potential MEV within a historical Ethereum transaction. A user can paste a transaction hash and then view a summary of all the token transfers that occurred. The transaction is checked against the [Flashbots Blocks API](https://blocks.flashbots.net/) to see if it was submitted to the network through the Flashbots Relay. If so, the other bundled transactions are listed as well to help identify frontrunning, backrunning, sandwiching, etc.

This app was written in TypeScript using React, [Next.js](https://nextjs.org/), and the [Alchemy SDK](https://www.alchemy.com/sdk).

This is a project submission for the [Encode x Wintermute MEV Hack](https://www.encode.club/wintermute-mev-hack).

## Example

![backrun example](/images/screenshot.png)
The second transaction "backrunning" the first one.

Check out https://explore.flashbots.net/leaderboard to see more examples of MEV.

## Further work

- Identify and label DEX pools (Uniswap, Sushiswap, etc.)
- Find related transactions based on the pools they interact with (to identify backrunning/frontrunning not submitted through Flashbots)
- Clean up the code and only query necessary data
