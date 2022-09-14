import {useSelector, useDispatch} from 'react-redux';
import { DELETE_ITEM, EDIT_ITEM } from './actions/actionTypes.js';

function List() {
  const items = useSelector(state => state.items);
  const editedItemId = useSelector(state => state.editedItemId);
  const dispatch = useDispatch();
  
  const handleDelete = (id) => {
    dispatch({type: DELETE_ITEM, payload: {id}});
  };
  const handleEdit = (id) => {
    dispatch({type: EDIT_ITEM, payload: {id}});
  }
  return (<ol>
    {items.map(item => {
      return (<div key={item.id}>
        <span>{item.name}&nbsp;</span>
        <span>{item.price}</span>
        <button disabled={editedItemId == item.id} onClick={() => handleDelete(item.id)}>Delete</button>
        <button disabled={editedItemId == item.id} onClick={() => handleEdit(item.id)}>Edit</button>
      </div>);
    })}
  </ol>);
}

export default List;
