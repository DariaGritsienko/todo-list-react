import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import './TodoForm.css';

/**
 * Компонент формы для добавления новой задачи.
 * @param {Object} props - Свойства компонента.
 * @param {function(string): void} props.addTask - Функция для добавления новой задачи.
 * @returns {JSX.Element} Компонент TodoForm.
 */
const TodoForm = ({ addTask }) => {
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [deadlineDate, setDeadlineDate] = useState('');
    const [deadlineTime, setDeadlineTime] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) {
            enqueueSnackbar('Task text cannot be empty', { variant: 'error' });
            return;
        }

        let deadline = deadlineDate;

        if (deadlineTime) {
            const today = new Date();
            const [hours, minutes] = deadlineTime.split(':');
            today.setHours(hours, minutes, 0, 0);

            if (deadlineDate) {
                deadline = `${deadlineDate}T${deadlineTime}:00`;
            } else {
                if (today < new Date()) {
                    today.setDate(today.getDate() + 1);
                }
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const year = today.getFullYear();
                deadline = `${year}-${month}-${day}T${deadlineTime}:00`;
            }
        }

        if (deadline && new Date(deadline) < new Date()) {
            enqueueSnackbar('Cannot set a deadline in the past', { variant: 'error' });
            return;
        }

        addTask({ text, deadline, description });
        setText('');
        setDescription('');
        setDeadlineDate('');
        setDeadlineTime('');
    };

    const getTodayDateTime = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return {
            date: `${year}-${month}-${day}`,
        };
    };

    const { date: minDate } = getTodayDateTime();

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task..."
                className="todo-input"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..."
                className="todo-input"
                rows="3"
            />
            <input
                type="date"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                className="todo-input"
                placeholder='Add a deadline date...'
                min={minDate}
            />
            <input
                type="time"
                value={deadlineTime}
                onChange={(e) => setDeadlineTime(e.target.value)}
                placeholder='Add a deadline time...'
                className="todo-input"
            />
            <button type="submit" className="todo-button">Add Task</button>
        </form>
    );
};

TodoForm.propTypes = {
    addTask: PropTypes.func.isRequired,
};

export default TodoForm;