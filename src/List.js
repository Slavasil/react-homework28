import {useSelector, useDispatch} from 'react-redux';
import { DELETE_ITEM, EDIT_ITEM } from './actions/actionTypes.js';

function List() {
  const items = useSelector(state => state.items);
  const filter = useSelector(state => state.listFilter);
  const editedItemId = useSelector(state => state.editedItemId);
  const dispatch = useDispatch();
  
  const handleDelete = (id) => {
    dispatch({type: DELETE_ITEM, payload: {id}});
  };
  const handleEdit = (id) => {
    dispatch({type: EDIT_ITEM, payload: {id}});
  }
  const matchesFilter = (item) => {
    return item.name.indexOf(filter) != -1;
  }
  return (<ol>
    {items.map(item => {
      if (matchesFilter(item)) {
        return (<div key={item.id}>
          <span className="list-row-name">{item.name}&nbsp;</span>
          <span className="list-row-price">{item.price}</span>
          <button disabled={editedItemId == item.id} onClick={() => handleDelete(item.id)}>Delete</button>
          <button disabled={editedItemId == item.id} onClick={() => handleEdit(item.id)}>Edit</button>
        </div>);
      } else {
        return null;
      }
    })}
  </ol>);
}

export default List;
