import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCreatetaskMutation,
  useDeletetaskMutation,
  useEditTaskMutation,
  useGettasksQuery,
} from "../generated/graphql";

const Tasks: React.FC = () => {
  const { loading, data, error } = useGettasksQuery();
  const [deleteTask] = useDeletetaskMutation();
  const [createTask] = useCreatetaskMutation();
  const [editTask] = useEditTaskMutation();
  const [title, setTitle] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

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

  const handleDelete = async (id: number) => {
    try {
      await deleteTask({
        variables: {
          deleteTaskId: id,
        },
        refetchQueries: ["gettasks"],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async () => {
    if (!editTitle.trim() || editingTaskId === null) return;
    try {
      await editTask({
        variables: {
          title: editTitle,
          isComplete: false,
          editTaskId: editingTaskId,
        },
        refetchQueries: ["gettasks"],
      });
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      await createTask({
        variables: {
          title,
        },
        refetchQueries: ["gettasks"],
      });
      setTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = (taskId: number, currentTitle: string) => {
    setEditingTaskId(taskId);
    setEditTitle(currentTitle);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingTaskId(null);
    setEditTitle("");
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 mt-5 p-3 h-12 rounded-lg cursor-pointer w-[30%] md:w-auto flex justify-center font-bold shadow-lg"
            onClick={handleCreate}
          >
            ADD
          </motion.button>
        </motion.div>
        
        <div className="flex justify-center items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-10 px-4 md:px-10 w-full max-w-3xl"
          >
            <AnimatePresence>
              {data?.getTasks?.map((task) => (
                <motion.div
                  key={task.id}
                  variants={taskVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4 bg-gray-800 bg-opacity-50 p-5 rounded-xl backdrop-blur-sm shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300"
                >
                  <div className="text-white text-center md:text-left text-lg">{task.title}</div>
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
                      onClick={() => openModal(task.id, task.title)}
                    >
                      EDIT
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {data?.getTasks?.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-gray-400 mt-10"
              >
                No tasks yet. Add your first task above!
              </motion.div>
            )}
          </motion.div>
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
