"use client";
import { NextUIProvider } from "@nextui-org/react";


import { Toaster } from "sonner";

import { useRouter } from "next/navigation";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";




const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
  
    <Provider store={store}>
      <Toaster position="top-center" richColors={true} />
    <PersistGate loading={null} persistor={persistor}>
      <NextUIProvider  navigate={router.push}>
          {children}
         
        </NextUIProvider>
    </PersistGate>
        </Provider>
      
    
   
  );
};

export default ReduxProvider;