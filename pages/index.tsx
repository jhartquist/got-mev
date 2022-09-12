import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Block } from "../components/Block";
import { getData } from "../lib/data";
import { BlockData } from "../lib/types";

const Main = styled.main`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  a {
    color: black;
    &:hover {
      text-decoration: none;
    }
  }
`;

const Header = styled.h1`
  font-size: 48px;
  font-weight: 600;
`;

const Text = styled.p`
  font-size: 16px;
`;

const FooterText = styled.p`
  margin: 24px;
  font-size: 14px;
  color: #555;
`;

const TransactionInput = styled.input`
  display: inline;
  font-size: 20px;
  color: #333333;
  width: 66ch;
  border: none;
  padding: 6px 24px;
`;

async function loadData(txHash: string): Promise<BlockData | null> {
  const data = await fetch(`/api/tx/${txHash}`);
  const block = (await data.json()) as BlockData | null;
  return block;
}

const Home: NextPage = () => {
  const [validHash, setValidHash] = useState<string>();
  const [inputHash, setInputHash] = useState<string>("");
  const [blockData, setBlockData] = useState<BlockData | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputHash) {
      const trimmedInputHash = inputHash.trim();
      if (trimmedInputHash.length === 66) {
        // TODO: more validation
        setBlockData(undefined);
        setValidHash(trimmedInputHash);
      }
    }
  }, [inputHash]);

  useEffect(() => {
    if (validHash) {
      console.log(`loading data for txHash ${validHash}`);
      setLoading(true);

      loadData(validHash).then((data) => {
        setLoading(false);
        setBlockData(data);
      });
    }
  }, [validHash]);

  return (
    <Main>
      <Header>got MEV?</Header>
      <Text>
        Paste an Ethereum transaction hash to see it's token transfers.
        <br />
        If submitted via Flashbots, any bundled transactions will appear as well.
      </Text>
      <TransactionInput
        type="text"
        placeholder="0x000000000000000000000000000000000000000000000000000000000000000"
        value={inputHash}
        onChange={(e) => setInputHash(e.target.value)}
      />
      {loading && "Loading..."}
      {blockData ? <Block block={blockData} /> : blockData === null ? "Unable to find transaction/block" : ""}
      <FooterText>
        Created by{" "}
        <a href="https://twitter.com/0xB2E3" target="_blank">
          @0xB2E3
        </a>{" "}
        for the{" "}
        <a href="https://www.encode.club/wintermute-mev-hack" target="_blank">
          Encode x Wintermute MEV Hack
        </a>{" "}
        with{" "}
        <a href="https://flashbots.net" target="_blank">
          Flashbots
        </a>
        .
      </FooterText>
    </Main>
  );
};

export default Home;
