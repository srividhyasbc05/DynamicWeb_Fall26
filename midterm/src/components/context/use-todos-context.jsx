import {useContext} from 'react';
import TodosContext from './todos';

const useTodosContext = () => {
  const context = useContext(TodosContext);
  return context;
}
export default useTodosContext;