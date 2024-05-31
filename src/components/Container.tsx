import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return <div className="container page-dimensions">{children}</div>;
}

export default Container;
