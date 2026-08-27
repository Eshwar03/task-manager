import { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import { GiHamburgerMenu } from 'react-icons/gi';
import TaskHeader from './components/TaskHeader';
import useMediaQuery from './hooks/useMediaQuery';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from './services/api';

function App() {
    const [filter, setFilter] = useState('all');

    const { data: tasks = [] } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos,
    });

    let isSmallScreen = useMediaQuery('(max-width:600px)');
    const [isLeftBlock, setIsLeftBlock] = useState(isSmallScreen);
    useEffect(() => {
        setIsLeftBlock(isSmallScreen);
    }, [isSmallScreen]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // function addTask(text) {
    //   const newTask = {
    //     id: Date.now(),
    //     text: text,
    //     isCompleted: false,
    //   };
    //   setTasks((prev) => [...prev, newTask]);
    // }
    // const deleteTask = useCallback((id) => {
    //   setTasks((prev) => prev.filter((task) => task.id !== id));
    // }, []);
    // const toggleTask = useCallback((id) => {
    //   setTasks((prev) =>
    //     prev.map((task) => {
    //       return task.id === id
    //         ? { ...task, isCompleted: !task.isCompleted }
    //         : task;
    //     }),
    //   );
    // }, []);

    // const editTask = useCallback((id, editedTaskText) => {
    //   setTasks((prev) =>
    //     prev.map((task) => {
    //       return task.id === id ? { ...task, text: editedTaskText } : task;
    //     }),
    //   );
    // }, []);

    function changeFilter(item) {
        setFilter(item);
    }

    return (
        <>
            <div
                className={`${isLeftBlock ? 'leftBlockHidden' : 'leftBlock'} ${'leftBlockTransition'}`}
            >
                <div className="appMenu">
                    <div>Task Manager</div>
                    <button
                        className="giHamburgerMenuButton"
                        onClick={() => setIsLeftBlock((prev) => !prev)}
                    >
                        <GiHamburgerMenu className="giHamburgerMenu" />
                    </button>
                </div>
                <FilterBar
                    filter={filter}
                    tasks={tasks}
                    onChange={changeFilter}
                />
            </div>
            <div
                className={`${isLeftBlock ? 'rightBlockFull' : 'rightBlock'} ${'rightBlockTransition'}`}
            >
                <TaskHeader
                    filter={filter}
                    setIsLeftBlock={setIsLeftBlock}
                    isLeftBlock={isLeftBlock}
                />
                <TaskForm />
                <TaskList
                    filter={filter}
                    tasks={tasks}
                    // onDelete={deleteTask}
                    // onEdit={editTask}
                />
            </div>
        </>
    );
}

export default App;
