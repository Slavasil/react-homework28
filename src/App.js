import './App.css';
import Form from './Form.js';
import List from './List.js';
import Filter from './Filter.js'

function App() {
  return (
    <>
      <Form/>
      <hr className="spacer"/>
      <Filter/>
      <List/>
    </>
  );
}

export default App;
