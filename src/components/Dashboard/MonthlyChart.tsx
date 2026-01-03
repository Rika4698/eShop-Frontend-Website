/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useState } from "react";

type TMonthlyData = {
  month: string;
  year: number;
  products: number;
  orders: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  activeBar?: string;
};

const CustomTooltip = ({ active, payload, activeBar }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !activeBar) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white p-3 rounded shadow border text-sm">
      <p className="font-semibold mb-2">
        {data.month}, {data.year}
      </p>
      {activeBar === "products" && (
        <p className="text-blue-600">Products: {data.products}</p>
      )}
      {activeBar === "orders" && (
        <p className="text-green-600">Orders: {data.orders}</p>
      )}
    </div>
  );
};

export default function MonthlyChart({ data }: { data: TMonthlyData[] }) {
  const [activeBar, setActiveBar] = useState<string>("");

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow w-full overflow-x-auto">
      <h2 className="text-md sm:text-xl font-semibold mb-4">
        Monthly Products & Orders Overview
      </h2>

      {/* Responsive chart container */}
      <div className="w-full h-[320px] sm:h-[360px] md:h-[400px] lg:h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap="20%" // spacing between bars
            margin={{ top: 20, right: 20, left: 10, bottom: 60 }} // extra bottom space for x-axis labels
          >
            <CartesianGrid strokeDasharray="3 3" />

            {/* X-Axis with responsive label rotation on mobile */}
            <XAxis
              dataKey={(d) => `${d.month} ${d.year}`}
              tick={{ fontSize: 12 }}
              angle={window.innerWidth < 640 ? -45 : 0} // rotate labels on mobile
              textAnchor={window.innerWidth < 640 ? "end" : "middle"}
              interval={0} // show all labels
              height={window.innerWidth < 640 ? 60 : 30} // extra height for rotated labels
            />

            <YAxis />
            
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip activeBar={activeBar} />}
            />
            
            <Legend />

            {/* Product Bar */}
            <Bar
              dataKey="products"
              name="Products"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              onMouseEnter={() => setActiveBar("products")}
              onMouseLeave={() => setActiveBar("")}
            />

            {/* Order Bar */}
            <Bar
              dataKey="orders"
              name="Orders"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              onMouseEnter={() => setActiveBar("orders")}
              onMouseLeave={() => setActiveBar("")}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
