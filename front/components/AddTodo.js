import React, { useState, useRef, useCallback, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO_REQUEST } from "../reducers/todo";
import styled from 'styled-components';
import {Button} from './styledComponents/PageComponent'

const AddTodo = () => {
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);
  const [content, setContent] = useState('');
  const addTodoInput = createRef();
  const { date } = useSelector((state) => state.todo);

  useEffect(()=>{
    if(adding){
      addTodoInput.current.focus();
    }
  }, [adding]);

  const AddTodoOn = useCallback(() => {
    setAdding(true);
  }, []);

  const AddTodoOff = useCallback(() => {
    setAdding(false);
    if(!content || !content.trim()){
      return setContent('');;
    }
    dispatch({
      type: ADD_TODO_REQUEST,
      data: {
        content,
        date
      }
    })
    setContent('');
  }, [content]);

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      AddTodoOff();
    }
  }

  return (
  <>
    {adding && <input type="text" ref={addTodoInput} onBlur={AddTodoOff} value={content} onChange={onChangeContent} onKeyPress={handleKeyPress}/>}
    {!adding && <AddButton onClick={AddTodoOn}><i/></AddButton>}
  </>);
};

const AddButton = styled(Button)`
  background-color: ${props => props.theme.yellowMedium};
  outline: none;
  & i {
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url('/static/icons/checkadd.svg');
  }
`;


export default AddTodo;
