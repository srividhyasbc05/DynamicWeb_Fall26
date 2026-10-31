import {useState, useEffect} from 'react';
import CreateListItem from '../list/CreateListItem';
import ListItem from '../list/ListItem';
import useTodosContext from '../context/use-todos-context';

const LIST_ID = 'list-1';


// we need listContent to be a separate component so that it can use the context provided by the Provider in ListWidget.
// since Provider is a component, it can only provide context to its children, not to itself. So we need to move the content that uses the context into a separate component that is a child of Provider.
const ListContent = () => {
  const { todos, isLoading, error, fetchTodos } = useTodosContext()
    const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])
  // useEffect is used to fetch the todos when the component mounts.
  // fetchTodos is the dependency because we want to fetch the todos again if the listId changes, which is handled in the context provider.


  // derived while rendering, never stored in state
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done
    if (filter === 'done') return todo.done
    return true
  })
  const remaining = todos.filter((todo) => !todo.done).length
  
  return (
    <>
    
      <CreateListItem />

      <div className="flex gap-4 mb-4 text-sm">
        {['all', 'active', 'done'].map((name) => (
          <button
            key={name}
            onClick={() => setFilter(name)}
            className={`capitalize ${filter === name ? 'font-bold underline' : 'text-gray-500'}`}
          >
            {name}
          </button>
        ))}
      </div>

      {isLoading && <p>Loading…</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && todos.length === 0 && <p>Nothing yet.</p>}
      {!isLoading && !error && todos.length > 0 && visibleTodos.length === 0 && (
        <p className="text-gray-500">No tasks match this filter.</p>
      )}

      <div>
        {visibleTodos.map((todo) => (
          <ListItem key={todo.id} todo={todo} />
        ))}
      </div>

      <p className="mt-6 text-sm">
        {remaining} {remaining === 1 ? 'thing' : 'things'} left to do
      </p>
    </>
  )
}

export default ListContent
