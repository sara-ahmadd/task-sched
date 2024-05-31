import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Task } from "../types";
import InputField from "../shared/InputField";
import Btn from "../shared/Btn";
import { useNavigate, useParams } from "react-router-dom";
import { editTask } from "../utils/editTask";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";
import { deleteTaskWithId } from "../utils/deleteTask";

function TaskDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [task, setTask] = useState<Task>();
  useEffect(() => {
    const docRef = doc(db, "tasks", params.id as string);
    getDoc(docRef).then((doc) => {
      const { createdAt, description, dueDate, priority, title, status } =
        doc.data() as DocumentData;
      setTask({
        id: doc.id,
        createdAt,
        description,
        dueDate,
        priority,
        title,
        status,
      });
    });
  }, []);

  const methods = useForm<Task>({
    defaultValues: {
      title: "",
      description: "",
      status: false,
      priority: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (task) {
      methods.reset({
        title: task.title,
        description: task.description,
        status: task.status === "done",
        priority: task.priority,
        dueDate: task.dueDate,
      });
    }
  }, [task]);

  const onSubmit: SubmitHandler<Task> = (data) => {
    console.log(data);
    try {
      editTask({
        ...data,
        id: params.id as string,
        status: data.status ? "done" : "not yet",
      }).then(() => {
        toast.success("Task is editted successfully");
        navigate("/tasks");
      });
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="flex flex-col justify-start items-center gap-3 p-5 my-3 w-full md:w-1/2 bg-white mx-auto text-text"
    >
      <h3 className="text-center font-medium text-xl">Edit task</h3>
      <FormProvider {...methods}>
        <InputField
          label={"Title"}
          id={"title"}
          placeholder={"Enter your task title"}
          type={"text"}
          register={methods.register("title", {
            required: "Title is required.",
          })}
        />
        <div className="flex flex-col justify-start items-start gap-3 min-w-[200px] max-w-[300px] md:w-[375px]">
          <label htmlFor="description">Task Description</label>
          <textarea
            className="outline-none border-[1px] border-disapled rounded-md text-black p-2  w-full"
            {...methods.register("description")}
          />
        </div>
        <select
          id="priority"
          {...methods.register("priority", {
            required: "Priority is requiired",
          })}
          className="outline-none border-[1px] border-disapled rounded-md text-black p-2 max-w-[300px] md:w-[375px]"
        >
          <option value="">Select priority...</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          type="date"
          {...methods.register("dueDate", {
            required: "Due date is required",
          })}
          min={new Date().toISOString().split("T")[0]}
          className="outline-none border-[1px] border-disapled rounded-md p-2 max-w-[300px] md:w-[375px]"
        />
        <div className="flex justify-start items-center gap-3">
          <input type="checkbox" id="state" {...methods.register("status")} />
          <label htmlFor="state">Status</label>
        </div>
      </FormProvider>
      <div className="flex justify-center items-center gap-3">
        <Btn>Submit</Btn>
        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="border-[1px] border-text rounded-md px-3 py-2 capitalize txt-text"
        >
          cancel
        </button>
        <button
          type="button"
          onClick={async () => {
            deleteTaskWithId(params?.id as string).then(() => {
              navigate("/tasks");
            });
          }}
          className="border-[1px] transition-all hover:bg-dark_red hover:text-white rounded-md px-3 py-2 capitalize text-dark_red border-dark_red"
        >
          Delete Task
        </button>
      </div>
    </form>
  );
}

export default TaskDetails;
