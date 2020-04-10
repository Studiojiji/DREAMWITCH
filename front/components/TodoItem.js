import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  createRef,
} from "react";
import { useDispatch } from "react-redux";
import {
  CHECK_TODO_REQUEST,
  EDIT_TODO_REQUEST,
  REMOVE_TODO_REQUEST,
} from "../reducers/todo";

const TodoItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const [todoContent, setTodoContent] = useState(item.content);
  const [editingMode, setEditingMode] = useState(false);
  const todoInput = createRef();
  useEffect(() => {
    if (editingMode) {
      todoInput.current.focus();
    }
  }, [editingMode]);

  const checkTodo = useCallback(() => {
    console.log("todoItem:", index);
    dispatch({
      type: CHECK_TODO_REQUEST,
      data: index,
    });
  }, [index]);

  const editModeStart = useCallback(() => {
    setTodoContent(item.content);
    setEditingMode(true);
  }, [item]);

  const onChangeContent = useCallback(
    (e) => {
      setTodoContent(e.target.value);
      console.log(todoContent);
    },
    [todoContent]
  );

  const editModeEnd = useCallback(() => {
    setEditingMode(false);
    console.log(todoContent);
    dispatch({
      type: EDIT_TODO_REQUEST,
      data: {
        index,
        content: todoContent,
      },
    });
  }, [index, todoContent]);

  const onRemoveTodo = useCallback(() => {
    dispatch({
      type: REMOVE_TODO_REQUEST,
      data: index,
    });
  }, [index]);

  return (
    <>
      <li>
        <button onClick={checkTodo}>
          {item.checked ? "체크취소" : "체크"}
        </button>
        {editingMode ? (
          <>
            <input
              style={
                item.checked
                  ? { textDecorationLine: "line-through" }
                  : { textDecorationLine: "none" }
              }
              type="text"
              value={todoContent}
              onChange={onChangeContent}
              onBlur={editModeEnd}
              ref={todoInput}
            />
          </>
        ) : (
          <>
            <span
              style={
                item.checked
                  ? { textDecorationLine: "line-through" }
                  : { textDecorationLine: "none" }
              }
              onClick={editModeStart}
            >
              {item.content}
            </span>
            <button onClick={onRemoveTodo}>삭제</button>
          </>
        )}
      </li>
    </>
  );
};

export default TodoItem;