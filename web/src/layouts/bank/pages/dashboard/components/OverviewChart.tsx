import React from 'react';
import { Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  {
    day: 'Mon',
    income: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    day: 'Tue',
    income: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    day: 'Wed',
    income: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    day: 'Thu',
    income: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    day: 'Fri',
    income: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    day: 'Sat',
    income: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    day: 'Sun',
    income: Math.floor(Math.random() * 5000) + 1000,
    expenses: Math.floor(Math.random() * 5000) + 1000,
  },
];

const OverviewChart: React.FC = () => {
  return (
    <ResponsiveContainer width='100%'>
      <LineChart data={data}>
        <XAxis dataKey='day' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip animationDuration={100} contentStyle = {{ backgroundColor: "hsl(var(--background)/0.8)", borderRadius: "1em", border: "1px solid hsl(var(--foreground)/0.1)", backdropFilter: "blur(4px)" }}/>
        <Line type='monotone' dataKey='income' stroke='hsl(var(--primary))' strokeWidth={3} dot={false} />
        <Line type='monotone' dataKey='expenses' stroke='hsl(var(--destructive))' strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OverviewChart;
