"use client"

import ShopForm from "@/components/MyShop/ShopForm";

import useUserDetails from "@/hooks/useUser";


const EditMyShop= () => {

  const { userData } = useUserDetails();

  return (

     <>
     <ShopForm initialValues={userData?.userData} />;

    </>
  )
};

export default EditMyShop;
