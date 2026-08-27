import { useState, useRef, useEffect } from 'react';
import styles from '../css/taskform.module.css';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createtodo } from '../services/api';

function TaskForm() {
    const [inputs, setInputs] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const queryClient = useQueryClient();

    const taskMutation = useMutation({
        mutationFn: createtodo,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['todos'],
            });
            console.log('created todo', data);
            setInputs('');
        },
    });

    function submitForm(e) {
        e.preventDefault();
        const text = inputs.trim();
        if (!text) {
            return;
        }
        taskMutation.mutate(inputs);
    }

    return (
        <>
            <form className={styles.taskForm} onSubmit={submitForm}>
                <input
                    className={styles.formInput}
                    onChange={(event) => setInputs(event.target.value)}
                    type="text"
                    value={inputs}
                    ref={inputRef}
                    placeholder="Name your task..."
                />
                <input
                    className={styles.formSubmit}
                    type="submit"
                    value="Create"
                />
            </form>
        </>
    );
}
export default TaskForm;
