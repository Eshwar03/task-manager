import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export const getTodos = async () => {
    const { data } = await axios.get(API_URL + '/todo');
    return data;
};

export const createtodo = async (newTodoData) => {
    const { data } = await axios.post(API_URL + '/todo', {
        title: newTodoData,
    });
    return data;
};

export const updateTodo = async ({ id, updateData }) => {
    const data = axios.patch(API_URL + `/todo/${id}`, updateData);
    return data;
};

export const deleteTodo = (id) => {
    const data = axios.delete(API_URL + `/todo/${id}`);
    return data;
};
