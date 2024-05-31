import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Task } from "../types";
import { toast } from "react-toastify";

export const addTask = async (data: Task) => {
  try {
    await addDoc(collection(db, "tasks"), { ...data });
    toast.success("Task is added successfully");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
