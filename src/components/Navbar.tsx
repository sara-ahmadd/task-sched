import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppSelector } from "../redux/store";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { FaBars } from "react-icons/fa";
import { UserType } from "../types";
import { CgClose } from "react-icons/cg";

function Navbar() {
  const userData = useAppSelector((state) => state.userReducer.user);
  const [showList, setShowList] = useState(false);
  return (
    <div className=" bg-white shadow-md text-blue-500 h-[100px] font-semibold text-lg flex justify-between items-center ">
      <div className="padding flex justify-between items-center w-full py-3 relative">
        <div>
          <Link to={"/"}>Task Scheduler</Link>
        </div>
        <span
          role="button"
          onClick={() => setShowList(!showList)}
          className="block md:hidden"
        >
          {showList ? <CgClose /> : <FaBars />}
        </span>
        <ul className="hidden md:flex justify-start items-center gap-5">
          <List userData={userData} />
        </ul>
        <ul
          className={`absolute px-3 w-[200px] h-fit rounded-md text-text z-[444] overflow-hidden top-10 right-0 flex flex-col justify-start items-start gap-2 shadow-lg bg-white duration-500 ${
            showList ? "py-3 max-h-[200px]" : "max-h-0"
          }`}
        >
          <List userData={userData} />
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

const List = ({ userData }: { userData: UserType | null }) => {
  return (
    <>
      {userData && userData.email ? (
        <>
          {userData?.email && (
            <li className="font-light">
              Hello, {userData.email.split("@")[0]}
            </li>
          )}

          <li
            role="button"
            className="text-dark_red"
            onClick={() => {
              Swal.fire({
                title: "Signout",
                text: "Are you sure you want to signout?",
                icon: "question",
                confirmButtonText: "SignOut",
                confirmButtonColor: "#8B0000",
                iconColor: "#8B0000",
              }).then((res) => {
                if (res.isConfirmed) {
                  signOut(auth);
                }
              });
            }}
          >
            SignOut
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
          <li>
            <NavLink to={"/register"}>Register</NavLink>
          </li>
        </>
      )}
    </>
  );
};
