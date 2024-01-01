import {
  BadgeDelta,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { TVLChart } from '@/components/landing/tvl-chart';

const topWallets = [
  {
    name: 'CyberConnect',
    leads: 45,
    sales: '1,000,000',
    quota: '1,200,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming',
    deltaType: 'moderateIncrease',
  },
  {
    name: 'Pimlico',
    leads: 35,
    sales: '900,000',
    quota: '1,000,000',
    variance: 'low',
    region: 'Region B',
    status: 'average',
    deltaType: 'unchanged',
  },
  {
    name: 'Privy',
    leads: 52,
    sales: '930,000',
    quota: '1,000,000',
    variance: 'medium',
    region: 'Region C',
    status: 'underperforming',
    deltaType: 'moderateDecrease',
  },
  {
    name: 'Particle',
    leads: 22,
    sales: '390,000',
    quota: '250,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming',
    deltaType: 'increase',
  },
  {
    name: 'Max Balmoore',
    leads: 49,
    sales: '860,000',
    quota: '750,000',
    variance: 'low',
    region: 'Region B',
    status: 'overperforming',
    deltaType: 'increase',
  },
  {
    name: 'Peter Moore',
    leads: 82,
    sales: '1,460,000',
    quota: '1,500,000',
    variance: 'low',
    region: 'Region A',
    status: 'average',
    deltaType: 'unchanged',
  },
  {
    name: 'Joe Sachs',
    leads: 49,
    sales: '1,230,000',
    quota: '1,800,000',
    variance: 'medium',
    region: 'Region B',
    status: 'underperforming',
    deltaType: 'moderateDecrease',
  },
];

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>UserOperations - Account Abstraction Dashboard | ERC 4337</title>
        <meta
          content="UserOperations is an analytics website about Ethereum and EVM account abstraction efforts. You can find an overview of the current activity, total value locked, bundler revenue, paymaster invocations, and much more."
          name="description"
        />
        <meta
          content="ethereum, account abstraction, erc4337, erc-4337, user operations, user ops, evm, solidity, arbitrum, optimism, polygon, avalanche, base, bundler, paymaster, smart contract wallets"
          name="keywords"
        />
      </Head>
      <main className="flex flex-col py-16">
        <TVLChart />

        <Table className="mt-6">
          <TableHead>
            <TableRow className="uppercase bg-tremor-brand-faint">
              <TableHeaderCell className="text-tremor-brand">#</TableHeaderCell>
              <TableHeaderCell className="text-tremor-brand">
                Name
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-brand">
                Accounts
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-brand">
                Risks
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-brand">
                TVL
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-brand">
                Mkt Share
              </TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {topWallets.map((item, idx) => (
              <TableRow
                className="hover:bg-tremor-background-muted"
                key={item.name}
              >
                <TableCell>#{idx + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sales}</TableCell>
                <TableCell>{item.sales}</TableCell>
                <TableCell>{item.quota}</TableCell>
                <TableCell>
                  <BadgeDelta deltaType={item.deltaType} size="xs">
                    {item.status}
                  </BadgeDelta>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  );
};

export default HomePage;
