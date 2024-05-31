import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const deleteTask = async (id: string) => {
  const docRef = doc(db, "tasks", id);
  const taskDoc = deleteDoc(docRef);
  return taskDoc;
};

export const deleteTaskWithId = async (id: string) => {
  try {
    const res = await Swal.fire({
      title: "Delete Task",
      text: "Are you sure you want to delete this task?",
      icon: "question",
      confirmButtonText: "Delete",
      confirmButtonColor: "#8B0000",
      iconColor: "#8B0000",
      cancelButtonColor: "#333",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });
    if (res.isConfirmed) {
      deleteTask(id).then(() => {
        toast.success("Task is deleted sucessfully.");
      });
    }
  } catch (error) {
    toast.error(`${error}`);
  }
};
