import { FaRegEdit } from "react-icons/fa";
import { Task } from "../types";
import { BsFillTrash3Fill } from "react-icons/bs";
import { MdFileDownloadDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteTaskWithId } from "../utils/deleteTask";
import { editTask } from "../utils/editTask";
import { toast } from "react-toastify";
import dayjs from "dayjs";

function TaskRow({ task }: { task: Task }) {
  const navigate = useNavigate();

  const editTaskForm = () => navigate(`/task-details/${task.id}`);

  const markDone = () => {
    try {
      editTask({
        ...task,
        status: task.status == "done" ? "not yet" : "done",
      }).then((doc) => {
        console.log(doc);
      });
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td
          className={`py-3 px-6 text-left whitespace-nowrap ${
            task.status == "done" ? "line-through" : ""
          }`}
        >
          {task.title}
        </td>
        <td
          className={`py-3 px-6 text-left ${
            task.status == "done" ? "line-through" : ""
          }`}
        >
          {task.description}
        </td>
        <td
          className={`py-3 px-6 text-left font-bold capitalize ${
            task.priority == "high"
              ? "text-dark_crimson"
              : task.priority == "medium"
              ? "text-[#F08080]"
              : "text-[#FFC0CB]"
          }`}
        >
          {task.priority}
        </td>
        <td className="py-3 px-6 text-left">{task.createdAt}</td>
        <td className="py-3 px-6 text-left">
          {dayjs(task.dueDate).format("DD/MM/YYYY")}
        </td>
        <td
          className={`py-3 px-6 text-left capitalize
        
        ${task.status == "done" ? "text-text" : ""}
        `}
        >
          {task.status}
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <button
              className="w-4 mr-2 transform hover:text-text hover:scale-110"
              onClick={editTaskForm}
            >
              <FaRegEdit />
            </button>
            <button
              className="w-4 mr-2 transform hover:text-text hover:scale-110"
              onClick={() => {
                deleteTaskWithId(task.id);
              }}
            >
              <BsFillTrash3Fill />
            </button>
            <button
              className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
              onClick={markDone}
            >
              <MdFileDownloadDone />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default TaskRow;
