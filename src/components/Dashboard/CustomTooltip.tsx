/* eslint-disable @typescript-eslint/no-explicit-any */
type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
};

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  // Recharts e je bar hover kora hoy, sheta payload[0] e thake
  // But safety jonno check kori je value ache kina
  let hoveredItem = payload[0];
  
  // If first item has no value, check second item
  if (hoveredItem.value === undefined || hoveredItem.value === null) {
    hoveredItem = payload.find(item => item.value !== undefined && item.value !== null) || payload[0];
  }
  
  const data = hoveredItem.payload;
  const barType = hoveredItem.dataKey;
console.log("Payload[0]:", payload[0]);
console.log("Payload[1]:", payload[1]);
  return (
    <div className="bg-white p-3 rounded shadow border text-sm">
      <p className="font-semibold mb-2">
        {data.month}, {data.year}
      </p>
      {barType === "products" && (
        <p className="text-blue-600">Products: {data.products}</p>
      )}
      {barType === "orders" && (
        <p className="text-green-600">Orders: {data.orders}</p>
      )}
    </div>
  );
};