/* eslint-disable @typescript-eslint/no-explicit-any */

type TItem = {
  createdAt: string;
};

type TMonthlyData = {
  month: string;
  year: number;
  products: number;
  orders: number;
};  


export const calculateStats = (data: any) => {
  return {
    totalUsers: data.usersData?.meta?.total || 0,
    totalCategories: data.categoriesData?.length || 0,
    totalProducts: data.productsData?.meta?.total || 0,
    totalOrders: data.ordersData?.meta?.total || 0,
    totalReviews: data.reviewsData?.meta?.total || 0,
    totalCoupons: data.couponsData?.length || 0,
    totalShops: data.vendorsData?.meta?.total || 0
  };
};

export const calculateUserDistribution = (usersData: any) => {
  const adminCount = usersData?.data?.filter(
    (u: any) => u.role === "ADMIN" || u.role === "SUPER_ADMIN"
  )?.length || 0;
  
  const vendorCount = usersData?.data?.filter(
    (u: any) => u.role === "VENDOR"
  )?.length || 0;
  
  const customerCount = usersData?.data?.filter(
    (u: any) => u.role === "CUSTOMER"
  )?.length || 0;

  return { adminCount, vendorCount, customerCount };
};


export const getMonthlyData = (
  productsData: { data?: TItem[] },
  ordersData: { data?: TItem[] }
): TMonthlyData[] => {
  const map = new Map<string, TMonthlyData>();

  const processItem = (dateStr: string, type: "products" | "orders") => {
    const date = new Date(dateStr);

    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    const key = `${month}-${year}`;

    if (!map.has(key)) {
      map.set(key, {
        month,
        year,
        products: 0,
        orders: 0,
      });
    }

    map.get(key)![type]++;
  };

  productsData?.data?.forEach((p) =>
    processItem(p.createdAt, "products")
  );

  ordersData?.data?.forEach((o) =>
    processItem(o.createdAt, "orders")
  );

  return Array.from(map.values()).sort((a, b) => {
    const d1 = new Date(`${a.month} 1, ${a.year}`);
    const d2 = new Date(`${b.month} 1, ${b.year}`);
    return d1.getTime() - d2.getTime();
  });
};