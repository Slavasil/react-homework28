import { useDispatch, useSelector } from 'react-redux';
import { SET_FILTER } from './actions/actionTypes.js';

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.listFilter);
  
  const handleFilterChange = e => {
    dispatch({type: SET_FILTER, payload: {filter: e.target.value}});
  }
  return (<div>
    <input onChange={handleFilterChange} value={filter} placeholder="Filter"/>
  </div>);
}

export default Filter;
