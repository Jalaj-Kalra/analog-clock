import { useEffect, useState } from 'react';

import './App.css';
import Clock from './components/clock';

const App = () => {

  const [ second, setSecond ] = useState(0);
  const [ minute, setMinute] = useState(0);
  const [ isTimeChanging, setIsTimeChanging] = useState(0);
  
  const setClock = () =>{
    if(second === 60){
      setSecond(1);
      if(minute === 60){
        setMinute(1);
      }else{
        setMinute(prev=>prev+1);
      }
    }else {
      setSecond(prev=>prev+1);
    }  
  }

 useEffect(()=>{
  const interval = setInterval(() => {
    setClock()
  }, 1000);
  return()=>{
    clearInterval(interval);
  }
 },[isTimeChanging])  
  

  return(
    <>
      <Clock secondRatio={second / 60} minuteRatio={((second / 60) + minute) / 60} setSecond={setSecond} setMinutes={setMinute}/>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div>
          <label className='timeLabel'>Min:</label>
          <input defaultValue={0} type='number' min="0" max="60" placeholder='Minutes' className='timeInput' onChange={(e)=>{
            setMinute(e?.target?.valueAsNumber);
            setIsTimeChanging(prev=>prev+1);
          }}/>
        </div>
        <div>
          <label className='timeLabel'>Sec:</label>
          <input defaultValue={0} type='number' min="0" max="60" placeholder='Seconds' className='timeInput' onChange={(e)=>{
            setSecond(e?.target?.valueAsNumber);
            setIsTimeChanging(prev=>prev+1);
          }}/>
        </div>
      </div>
    </>

  )
 
}



export default App;