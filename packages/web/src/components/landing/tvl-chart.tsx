import {
  AreaChart,
  Card,
  Metric,
  Select,
  SelectItem,
  Subtitle,
  Tab,
  TabGroup,
  TabList,
  Title,
} from '@tremor/react';
import type { CustomTooltipType } from '@tremor/react/dist/components/chart-elements/common/CustomTooltipProps';
import format from 'date-fns/format';

const startDate = new Date(2023, 0, 1);
const endDate = new Date(2024, 0, 1);

const smallNumber = 100000;
const bigNumber = 12401820998;

const chartData: { date: string; 'Total Value Locked': number }[] = [];

let cumulative = smallNumber;

for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
  chartData.push({
    date: format(d, 'PPP'),
    'Total Value Locked': cumulative,
  });

  const plusOrMinus = Math.random() < 0.4 ? -1 : 1;
  const random = Math.floor(Math.random() * bigNumber);
  cumulative += random * plusOrMinus;
}

const customTooltip = ({ payload, active, label }: CustomTooltipType) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category, idx) => (
        <div className="flex flex-1 space-x-2.5" key={idx}>
          <div
            className={`w-1 flex flex-col bg-${category.color}-500 rounded`}
          />
          <div className="space-y-1">
            <p className="text-tremor-content-emphasis font-bold">
              {category.name}
            </p>
            <p className="text-tremor-content">{label}</p>
            <p className="text-tremor-content-emphasis">
              {category.value?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const TVLChart: React.FC = () => {
  return (
    <Card>
      <TabGroup className="p-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center space-x-4">
              <Title>Total Value Locked</Title>
              <Select
                className="w-fit"
                defaultValue="All Chains"
                enableClear={false}
              >
                <SelectItem value="All Chains">All Chains</SelectItem>
                <SelectItem value="Ethereum">Ethereum</SelectItem>
                <SelectItem value="Optimism">Optimism</SelectItem>
                <SelectItem value="Base">Base</SelectItem>
                <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                <SelectItem value="Polygon">Polygon</SelectItem>
                <SelectItem value="Gnosis">Gnosis</SelectItem>
                <SelectItem value="Avalanche">Avalanche</SelectItem>
              </Select>
            </div>

            <Subtitle className="text-pretty">
              The sum of total USD value of tokens locked in smart contract
              wallets compliant with ERC-4337.
            </Subtitle>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Metric>
              {' '}
              {bigNumber.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Metric>

            <TabList variant="solid">
              <Tab>7D</Tab>
              <Tab>30D</Tab>
              <Tab>90D</Tab>
              <Tab>180D</Tab>
              <Tab>1Y</Tab>
              <Tab>MAX</Tab>
            </TabList>
          </div>
        </div>

        <AreaChart
          categories={['Total Value Locked']}
          className="h-72 mt-4"
          colors={['blue']}
          customTooltip={customTooltip}
          data={chartData}
          index="date"
          showAnimation
          showXAxis={false}
          valueFormatter={(value) => {
            return value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
            });
          }}
        />
      </TabGroup>
    </Card>
  );
};
