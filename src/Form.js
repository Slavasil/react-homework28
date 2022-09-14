import {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux';
import { ADD_ITEM, SAVE_ITEM } from './actions/actionTypes.js';

function Form(props) {
  const dispatch = useDispatch();
  const store = useStore(a => a);
  const globalState = store.getState();

  const selectEditedItem = state => {
    for (let item of state.items) {
      if (item.id == state.editedItemId) {
        return item;
      }
    }
    return null;
  };
  const editedItem = useSelector(selectEditedItem);

  const [state, setState] = useState({
    name: '',
    price: ''
  });
  const stateRef = useRef();
  stateRef.current = state;

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      let state = store.getState();
      if (state.editedItemId != null) {
        let item = selectEditedItem(state);
        setState(state => ({...state, name: item.name, price: item.price}));
      }
    });
    return unsubscribe;
  }, []);

  const handleSubmitClick = () => {
    let currentName = stateRef.current.name;
    let currentPrice = stateRef.current.price;
    if (globalState.editedItemId == null) {
      dispatch({type: ADD_ITEM, payload: {name: currentName, price: currentPrice}});
    } else {
      dispatch({type: SAVE_ITEM, payload: {name: currentName, price: currentPrice}});
    }
    setState(state => ({...state, name: '', price: ''}));
  };

  const handleNameInputChange = e => {
    setState({...state, name: e.target.value});
  };

  const handlePriceInputChange = e => {
    setState({...state, price: e.target.value});
  };
  let canSubmit = state.name.trim() != '' && state.price.trim() != '';
  return (
    <div className="form">
      <input value={state.name} onChange={handleNameInputChange} placeholder="Service"/>
      <input type="number" value={state.price} onChange={handlePriceInputChange} placeholder="Price"/>
      <button disabled={!canSubmit} onClick={handleSubmitClick}>{globalState.editedItemId == null ? 'Add' : 'Save'}</button>
    </div>
  );
}

export default Form;
