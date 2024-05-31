import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import Filter from "../shared/Filter";
import TaskTable from "../shared/Table";
import { Task } from "../types";
import Btn from "../shared/Btn";
import { FiPlus } from "react-icons/fi";
import NewTask from "./NewTask";

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    dueDate: "",
  });

  const handleSearchChange = (searchTerm: string) => {
    if (searchTerm.length > 0) {
      const searchResult = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(searchResult);
      // Reset filters when a search term is found
      setFilters({ priority: "", status: "", dueDate: "" });
    } else {
      applyFilters(tasks);
    }
  };

  const applyFilters = (tasks: Task[]) => {
    let updatedTasks = [...tasks];

    if (filters.priority) {
      updatedTasks = updatedTasks.filter(
        (task) => task.priority === filters.priority
      );
    }
    if (filters.status) {
      updatedTasks = updatedTasks.filter(
        (task) => task.status === filters.status
      );
    }
    if (filters.dueDate) {
      updatedTasks.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return filters.dueDate === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    setFilteredTasks(updatedTasks);
  };

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
    let updatedTasks = [...tasks];

    if (type === "priority" && value) {
      updatedTasks = updatedTasks.filter((task) => task.priority === value);
    } else if (type === "status" && value) {
      updatedTasks = updatedTasks.filter((task) => task.status === value);
    } else if (type === "dueDate" && value) {
      updatedTasks.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return value === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    // If no filters are applied, show all tasks
    if (!value) {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(updatedTasks);
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "tasks"), (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const { createdAt, description, dueDate, priority, title, status } =
          doc.data();
        return {
          id: doc.id,
          createdAt,
          description,
          dueDate,
          priority,
          title,
          status,
        };
      });
      setTasks(docs); // Set tasks state
      setFilteredTasks(docs); // Initially, filteredTasks is the same as tasks
    });
  }, []);

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="px-5">
      <div className="mx-auto">
        <div className="w-full flex justify-between items-center p-5 flex-wrap">
          <h1 className="text-2xl font-bold mb-4 text-text text-center">
            Task Manager
          </h1>
          <Btn clickFunc={() => setShowModal(true)}>
            <FiPlus />
            <span>Add new</span>
          </Btn>
        </div>
        <Filter
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
        <TaskTable tasks={filteredTasks} />
      </div>
      <NewTask showModal={showModal} closeModal={() => setShowModal(false)} />
    </div>
  );
}

export default Tasks;
