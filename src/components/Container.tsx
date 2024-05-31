import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <div className="page-dimensions">{children}</div>
    </div>
  );
}

export default Container;
