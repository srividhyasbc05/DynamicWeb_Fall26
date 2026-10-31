import ListContent from '../list/ListContent';
import { Provider } from '../context/todos';

const LIST_ID = 'list-1';




const ListWidget = ({listId= LIST_ID}) => {
    

    return (
        <Provider listId={listId}>
        <div>
            <ListContent />
        </div>
        </Provider>
    );
}

export default ListWidget;