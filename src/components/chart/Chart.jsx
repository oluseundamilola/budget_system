import "./chat.scss";
import {
  XAxis,
  // YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  {name: 'January', Total: '1200'},
  {name: 'February', Total: '120'},
  {name: 'March', Total: '872'},
  {name: 'April', Total: '200'},
  {name: 'May', Total: '589'},
  {name: 'June', Total: '1008'},
]

const Chart = ({aspect, title}) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
<ResponsiveContainer width="100%" aspect={aspect}>
      <AreaChart
        width={730}
        height={250}
        // width="100%"
        // aspect={2 / 1}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="gray" />
        {/* <YAxis /> */}
        <CartesianGrid strokeDasharray="3 3" className="chatGrid" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Total"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#total)"
        />
      </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
