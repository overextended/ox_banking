import locales from '@/locales';
import { formatNumber } from '@/utils/formatNumber';
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
  data?: {
    day: string;
    income: number;
    expenses: number;
  }[];
}

const OverviewChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      {data && data.length > 0 ? (
        <LineChart data={data}>
          <XAxis
            tickFormatter={(value) => locales[`day_${value}` as keyof typeof locales]}
            dataKey="day"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip
            animationDuration={100}
            labelFormatter={(value: keyof typeof locales) => locales[value]}
            formatter={(value, name: keyof typeof locales) => [formatNumber(value as number), locales[name]]}
            wrapperClassName="rounded-lg"
            contentStyle={{
              backgroundColor: 'hsl(var(--background)/0.8)',
              border: '1px solid hsl(var(--foreground)/0.1)',
              backdropFilter: 'blur(4px)',
            }}
          />
          <Line type="monotone" dataKey="income" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" strokeWidth={3} dot={false} />
        </LineChart>
      ) : (
        <></>
      )}
    </ResponsiveContainer>
  );
};

export default OverviewChart;
