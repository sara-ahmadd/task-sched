import { useNavigate } from "react-router-dom";
import Btn from "../shared/Btn";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col gap-3">
      <p className="text-text p-4 bg-white rounded-md">Page is not found</p>
      <Btn clickFunc={() => navigate("/")}>Home</Btn>
    </div>
  );
}

export default NotFound;
