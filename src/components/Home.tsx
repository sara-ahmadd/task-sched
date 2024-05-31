import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Btn from "../shared/Btn";
import { useCheckAuth } from "../hooks/useCheckAuth";

function Home() {
  const userData = useAppSelector((state) => state.userReducer.user);
  const location = useLocation();
  useCheckAuth();
  if (userData?.email) {
    return <Navigate to="/tasks" state={{ path: location.pathname }} />;
  } else {
    return (
      <div className="page-dimensions flex justify-center items-center">
        <div className="p-5 bg-white rounded-md shadow-lg flex flex-col justify-center items-center gap-5">
          <p className="w-full md:w-1/2 mx-auto text-center text-text font-medium ">
            Stay Organized and Boost Your Productivity with Our Task Scheduler
            App. Plan, Track, and Achieve Your Goals Seamlessly
          </p>
          <Link to={"/tasks"}>
            <Btn>
              <span>Go to your tasks</span>
              <span className="animate-moveRight">
                <MdKeyboardDoubleArrowRight />
              </span>
            </Btn>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
