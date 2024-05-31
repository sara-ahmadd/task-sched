import { doc, updateDoc } from "firebase/firestore";
import { Task } from "../types";
import { db } from "../firebaseConfig";

export const editTask = async (task: Task) => {
  if (!task.id) {
    throw new Error("Task ID is undefined");
  }
  const docRef = doc(db, "tasks", task.id);
  await updateDoc(docRef, { ...task });
};
