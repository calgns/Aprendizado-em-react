import { useReducer } from 'react';
import './App.css';

const globalState = {
  title: 'O título que contexto',
  body: 'O body do contexto',
  counter: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'muda': {
      console.log('chamou muda', action.payload);
      return { ...state, title: action.payload };
    }
    case 'inverter': {
      console.log('chamou inverter');
      const { title } = state;
      return { ...state, title: title.split('').reverse().join('') };
    }
  }
  console.log('NENHUMA ACTION ENCONTRADA!');
  return { ...state };
};

function App() {
  const [state, dispatch] = useReducer(reducer, globalState);
  const { counter, title, body } = state;
  return (
    <div>
      <h1>
        {title} {counter} {body}
      </h1>
      <button onClick={() => dispatch({ type: 'muda', payload: new Date().toLocaleDateString('pt-BR') })}>Mude!</button>
      <button onClick={() => dispatch({ type: 'inverter' })}>Inverta!</button>
      <button onClick={() => dispatch({ type: 'none' })}>nrh</button>
    </div>
  );
}

export default App;
