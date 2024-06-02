import { useEffect } from 'react';
import './App.css'
import TweetInput from './components/TweetInput';
import properties from './utils';

function App() {

  useEffect(()=>{
    document.body.style.backgroundColor = properties.bgcolor
  },[])
  
  return (
    <div className="App">
      <TweetInput></TweetInput>
    </div>
  );
}

export default App;
