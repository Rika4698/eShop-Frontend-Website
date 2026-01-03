import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetAllCouponsQuery } from "@/redux/features/coupon/couponApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewsApi";
import { useGetAllTypeUsersQuery, useGetPublicVendorsQuery } from "@/redux/features/users/userApi";


export const useDashboardData = () => {
  const { data: usersData, isLoading: usersLoading } = useGetAllTypeUsersQuery({ 
    page: 1, 
    limit: 10000 
  });
  const { data: productsData, isLoading: productsLoading } = useGetAllProductsQuery({ 
    page: 1, 
    limit: 10000 
  });
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery({ 
    page: 1, 
    limit: 10000 
  });
  const { data: reviewsData, isLoading: reviewsLoading } = useGetAllReviewsQuery({ 
    page: 1, 
    limit: 10000 
  });
//   console.log(reviewsData,"ree");

  const { data: couponsData, isLoading: couponsLoading } = useGetAllCouponsQuery(undefined);

  const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoriesQuery(undefined);

  const { data: vendorsData, isLoading: vendorsLoading } = useGetPublicVendorsQuery({ 
    page: 1, 
    limit: 10000 
  });

  const isLoading = usersLoading || productsLoading || ordersLoading || 
                    reviewsLoading || couponsLoading || categoriesLoading || vendorsLoading;

  return {
    usersData,
    productsData,
    ordersData,
    reviewsData,
    couponsData,
    categoriesData,
    vendorsData,
    isLoading
  };
};
