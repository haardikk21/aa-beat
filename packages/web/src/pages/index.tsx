import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>UserOperations - Account Abstraction Dashboard | ERC 4337</title>
        <meta
          name="description"
          content="UserOperations is an analytics website about Ethereum and EVM account abstraction efforts. You can find an overview of the current activity, total value locked, bundler revenue, paymaster invocations, and much more."
        />
        <meta
          name="keywords"
          content="ethereum, account abstraction, erc4337, erc-4337, user operations, user ops, evm, solidity, arbitrum, optimism, polygon, avalanche, base, bundler, paymaster, smart contract wallets"
        />
      </Head>
      <main>sdfsf</main>
    </>
  );
}
