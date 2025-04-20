import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCreateTaskMutation,
  useDeleteMutation,
  useEditTaskMutation,
  useGetTasksQuery,
} from "../generated/graphql";
import { toast, ToastContainer } from "react-toastify";

const Tasks: React.FC = () => {
  const { loading, data, error } = useGetTasksQuery();
  const [deleteTask] = useDeleteMutation();
  const [createTask] = useCreateTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [title, setTitle] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editIsComplete, setEditIsComplete] = useState(false);
  const [editPriority, setEditPriority] = useState("medium");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);
  const [priority, setPriority] = useState("medium");
  


  if (loading) return (
    <div className="bg-black min-h-screen text-white flex justify-center items-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-3xl font-bold"
      >
        Loading tasks...
      </motion.div>
    </div>
  );
  
  if (error) return (
    <div className="bg-black min-h-screen text-white flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-xl"
      >
        Error loading tasks. Please try again later.
      </motion.div>
    </div>
  );
  const filteredTasks = data?.getTasks?.filter(task => 
    filterStatus === null ? true : task.isComplete === filterStatus
  );
  const handleDelete = async (id: number) => {
    try {
      await deleteTask({
        variables: {
          deleteTaskId: id,
        },
        refetchQueries: ["GetTasks"],
      });
      toast.success("successfully deleted the task",{
      })
    } catch (err) {
      console.error(err);
      toast.error("an error occured!");
    }
  };
  const handleEdit = async () => {
    if (!editTitle.trim() || editingTaskId === null) return;
    try {
      await editTask({
        variables: {
          title: editTitle,
          isComplete: editIsComplete,
          priority: editPriority,
          editTaskId: editingTaskId,
        },
        refetchQueries: ["GetTasks"],
      });
      closeModal();
      toast.success("successfully edited the task!")
    } catch (err) {
      console.error(err);
      toast.error("an error occured!");
    }
  };
  const handleToggleComplete = async (id: number, title: string, currentStatus: boolean) => {
    try {
      await editTask({
        variables: {
          title,
          isComplete: !currentStatus,
          editTaskId: id,
        },
        refetchQueries: ["GetTasks"],
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handleCreate = async () => {
    if (!title.trim()) {
      toast.warn("Please enter a title");
      return;
    }
    try {
      await createTask({
        variables: {
          title,
          priority
        },
        refetchQueries: ["GetTasks"],
      });
      setTitle("");
      toast.success("successfully added the task!");
    } catch (err) {
      console.log(err);
      toast.error("could not add the task!")
    }
  };
  
  const openModal = (taskId: number, currentTitle: string, currentIsComplete: boolean, currentPriority: string) => {
    setEditingTaskId(taskId);
    setEditTitle(currentTitle);
    setEditIsComplete(currentIsComplete);
    setEditPriority(currentPriority);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setEditingTaskId(null);
    setEditTitle("");
    setEditIsComplete(false);
  };
  const toggleFilter = () => {
    if (filterStatus === null) setFilterStatus(true);
    else if (filterStatus === true) setFilterStatus(false);
    else setFilterStatus(null);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const taskVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300 
      }
    },
    exit: { 
      x: -300, 
      opacity: 0,
      transition: { 
        duration: 0.5 
      }
    }
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 25 
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white overflow-x-hidden">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center pt-10 px-4"
        >
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            TASKS
          </h2>
        </motion.div>
        {/* <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col md:flex-row justify-center gap-3 px-4 items-center"
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
            type="text"
            placeholder="Enter your task"
            className="mt-5 border w-full md:w-[60vh] p-4 rounded-lg bg-gray-800 border-gray-700 focus:border-purple-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 mt-5 p-3 h-12 rounded-lg cursor-pointer w-[30%] md:w-auto flex justify-center font-bold shadow-lg"
            onClick={handleCreate}
          >
            ADD
          </motion.button>
        </motion.div> */}

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col md:flex-row justify-center gap-3 px-4 items-center"
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
            type="text"
            placeholder="Enter your task"
            className="mt-5 border w-full md:w-[60vh] p-4 rounded-lg bg-gray-800 border-gray-700 focus:border-purple-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <motion.select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-5 border w-full md:w-[20vh] p-4 rounded-lg bg-gray-800 border-gray-700 focus:border-purple-500 focus:outline-none"
          >
            <option value="high">Hard</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </motion.select>


          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 mt-5 p-3 h-12 rounded-lg cursor-pointer w-[30%] md:w-auto flex justify-center font-bold shadow-lg"
            onClick={handleCreate}
          >
            ADD
          </motion.button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-5"
        >
          <div className="flex items-center gap-2 bg-gray-800 bg-opacity-50 px-4 py-2 rounded-lg border border-gray-700">
            <button 
              onClick={toggleFilter}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterStatus === null 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterStatus(true)}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterStatus === true 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Completed
            </button>
            <button 
              onClick={() => setFilterStatus(false)}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterStatus === false 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Active
            </button>
          </div>
        </motion.div>
        
        <div className="flex justify-center items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 px-4 md:px-10 w-full max-w-3xl"
          >
            <AnimatePresence>
              {filteredTasks?.map((task) => (
                <motion.div
                  key={task.id}
                  variants={taskVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className={`flex flex-col md:flex-row justify-between items-center gap-4 mt-4 
                    ${task.isComplete ? 'bg-gray-700 bg-opacity-30' : 'bg-gray-800 bg-opacity-50'} 
                    p-5 rounded-xl backdrop-blur-sm shadow-lg border border-gray-700 
                    hover:border-purple-500 transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleComplete(task.id, task.title, task.isComplete)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer
                        ${task.isComplete 
                          ? 'border-green-500 bg-green-500 bg-opacity-30' 
                          : 'border-gray-500'}`}
                    >
                      {task.isComplete && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </motion.div>
                    <div className={`text-white text-center md:text-left text-lg ${task.isComplete ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </div>
                    <div className={`text-sm font-semibold px-2 py-1 rounded
                  ${
                    task.priority === "high"
                      ? "bg-red-500 text-white"
                      : task.priority === "medium"
                      ? "bg-yellow-400 text-black"
                      : "bg-green-400 text-black"
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg cursor-pointer w-full md:w-auto transition-colors duration-300 font-medium"
                      onClick={() => handleDelete(task.id)}
                    >
                      DELETE
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg cursor-pointer w-full md:w-auto transition-colors duration-300 font-medium"
                      onClick={() => openModal(task.id, task.title, task.isComplete,task.priority)}
                    >
                      EDIT
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredTasks?.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-gray-400 mt-10"
              >
                {filterStatus === null 
                  ? "No tasks yet. Add your first task above!" 
                  : filterStatus 
                    ? "No completed tasks yet." 
                    : "No active tasks - everything's done!"}
              </motion.div>
            )}
          </motion.div>
          <ToastContainer/>
        </div>
     
      </div>

      <AnimatePresence>
        {modalIsOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gray-800 text-white p-6 rounded-xl w-[90%] max-w-md shadow-2xl border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl mb-4 font-bold text-purple-400">Edit Task</h2>
              <motion.input
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Update task title"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none mb-4"
              />
              
              <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 mb-4"
              >
                <motion.select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                <option value="high">Hard</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                </motion.select>
              <div className="flex items-center gap-3">
              <div onClick={() => setEditIsComplete(!editIsComplete)} className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer
              ${editIsComplete ? 'border-green-500 bg-green-500 bg-opacity-30' : 'border-gray-500'}`}>
               {editIsComplete && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
               )}
              </div>
             <div className="text-sm">Mark as complete</div>
            </div>
          </motion.div>

              
              <div className="flex justify-end gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-lg cursor-pointer transition-colors duration-300"
                  onClick={closeModal}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg cursor-pointer font-bold"
                  onClick={handleEdit}
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>


            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tasks;
