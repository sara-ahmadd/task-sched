import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Task } from "../types";
import dayjs from "dayjs";
import Btn from "../shared/Btn";
import InputField from "../shared/InputField";
import { addTask } from "../utils/addNew";

function NewTask({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: () => void;
}) {
  const methods = useForm<Task>({
    defaultValues: {
      title: "",
      description: "", //optional
      status: "not yet",
      createdAt: dayjs(new Date().toISOString()).format("DD/MM/YYYY"),
      priority: "low",
      dueDate: dayjs(new Date().toISOString()).format("DD/MM/YYYY"),
    },
  });
  const onSubmit: SubmitHandler<Task> = (data) => {
    addTask(data);
    closeModal();
  };
  return (
    showModal && (
      <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center bg-stone-700 bg-opacity-50">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col justify-start items-center gap-3 p-2 md:p-5 w-[90%] md:w-1/2 bg-white mx-auto text-text"
        >
          <h3 className="text-center font-medium text-xl">Add task details</h3>
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
                className="outline-none border-[1px] border-disapled rounded-md p-2 text-black w-full"
                {...methods.register("description")}
              />
            </div>
            <select
              id="priority"
              {...methods.register("priority", {
                required: "Priority is requiired",
              })}
              className="outline-none border-[1px] border-disapled rounded-md p-2 text-black max-w-[300px] md:w-[375px]"
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
          </FormProvider>
          <div className="flex justify-center items-center gap-3">
            <Btn>Submit</Btn>
            <button
              type="button"
              onClick={closeModal}
              className="border-[1px] border-text rounded-md px-3 py-2 capitalize txt-text"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default NewTask;
