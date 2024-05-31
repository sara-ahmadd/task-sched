import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Auth from "./shared/Auth";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="landing-page">
      <ToastContainer />
      <div className="bg-stone-300 bg-opacity-50 relative">
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="tasks"
              element={
                <Auth>
                  <Tasks />
                </Auth>
              }
            />
            <Route
              path="task-details/:id"
              element={
                <Auth>
                  <TaskDetails />
                </Auth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default App;
