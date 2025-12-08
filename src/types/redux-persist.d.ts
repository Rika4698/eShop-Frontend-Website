/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "redux-persist/integration/react" {
  import * as React from "react";

  interface PersistGateProps {
    children?: React.ReactNode;
    loading?: React.ReactNode | null;
    persistor: any;
  }

  export class PersistGate extends React.Component<PersistGateProps> {}
}
