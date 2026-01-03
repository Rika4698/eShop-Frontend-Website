import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface UserDistributionChartProps {
  data: Array<{ role: string; count: number }>;
}

const UserDistributionChart = ({ data }: UserDistributionChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
        User Distribution
      </h2>
      
      
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            
            
            <XAxis 
              dataKey="role" 
              angle={-20}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            
        
            <YAxis 
              tick={{ fontSize: 12 }}
            />
            
           
            <Tooltip 
              contentStyle={{ 
                fontSize: '13px',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
            />
            
  
            <Legend 
              wrapperStyle={{ 
                fontSize: '12px',
                paddingTop: '10px'
              }}
              iconSize={12}
            />
            
            {/* Bar with rounded corners */}
            <Bar 
              dataKey="count" 
              fill="#8b5cf6" 
              name="User Count"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserDistributionChart;