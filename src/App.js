import React, {useState, useEffect} from 'react'
import _ from 'lodash'
import './sass/reset.scss'
import './sass/fonts.scss'
import './sass/global-styles.scss'
import './sass/layout.scss'

const App = props => {

  const repFactor = 1.05;
  const rpeFactor = 1.05;

  const [data, setData] = useState({
    weight:100,
    reps:4,
    rpe:8,
    e1rm:10
  });

  const [statToCalculate, setStatToCalculate] = useState('e1rm');

  const setDataValue = (key, value) => {
      let temp = _.clone(data)
      temp[key] = value;
      setData(temp)
  }

  const handleVariableSelect = (event) => {
    console.log(event.currentTarget.value)
    setStatToCalculate(event.currentTarget.value);
  }

  const getWeight = () => {
      let temp = data.e1rm;

      for(let i = 1; i < data.reps; i++){
        temp/=repFactor;
      }

      for(let i = data.rpe; i < 10; i++){
        temp/=rpeFactor;
      }

      return Math.round(temp);
  }
  
  const getE1RM = () => {
      let temp = data.weight;
      for(let i = 1; i < data.reps; i++){
        temp*=repFactor;
      }

      for(let i = data.rpe; i < 10; i++){
        temp*=rpeFactor;
      }

      return Math.round(temp);
  }

  const getRPE = () => {
    let temp = data.weight;

    for(let i = 1; i < data.reps; i++){
      temp*=repFactor;
    } 

    let factor = temp/data.e1rm;

    for(let i=0; i < 7; i++){
      if(factor > Math.pow(rpeFactor, 0-i)){
        return 11 - i;
      }
    }
    return 5;
  }

  const getReps = () => {
      
  }

  useEffect(()=>{
    if(statToCalculate === 'e1rm' && data.e1rm !== getE1RM()){
      setDataValue('e1rm', getE1RM());
    }
    if(statToCalculate === 'weight' && data.weight !== getWeight()){
      setDataValue('weight', getWeight());
    }
    if(statToCalculate === 'rpe' && data.rpe !== getRPE()){
      setDataValue('rpe', getRPE());
    }
    if(statToCalculate === 'reps' && data.reps !== getReps()){
      setDataValue('reps', getReps());
    }
  }, [data, statToCalculate])
  
  return <div className="App">
    <div className={`variable-select`}>
      <input onChange={handleVariableSelect} checked={statToCalculate === 'weight'} type="radio" id="weight" name="variable-select" value="weight"/>
      <label htmlFor="weight">Weight</label>
      <input onChange={handleVariableSelect} checked={statToCalculate === 'reps'} type="radio" id="reps" name="variable-select" value="reps"/>
      <label htmlFor="reps">Reps</label>
      <input onChange={handleVariableSelect} checked={statToCalculate === 'rpe'} type="radio" id="rpe" name="variable-select" value="rpe"/>
      <label htmlFor="rpe">RPE</label>
      <input onChange={handleVariableSelect} checked={statToCalculate === 'e1rm'} type="radio" id="e1rm" name="variable-select" value="e1rm"/>
      <label htmlFor="e1rm">E1RM</label>
    </div>
      
     

    {
        statToCalculate === 'weight' ? 
        <div className={`field calculated weight`}>
          Weight:{data.weight}
        </div>
        :
        <div className={`field weight`}>
          weight:<input type="number" value={data.weight} onChange={(e) => setDataValue('weight', e.currentTarget.value)}/>
        </div>
      }

      {
        statToCalculate === 'reps' ? 
        <div className={`field calculated reps`}>
          Reps:{data.reps}
        </div>
        :
        <div className={`field reps`}>
          reps<input type="number" value={data.reps} onChange={(e) => setDataValue('reps', e.currentTarget.value)}/>
        </div>
      }


      {
        statToCalculate === 'rpe' ? 
        <div className={`field calculated rpe`}>
          RPE:{data.rpe}
        </div>
        :
        <div className={`field rpe`}>
          RPE{data.rpe}<input type="range" min={6} max={10} value={data.rpe} onChange={(e) => setDataValue('rpe', e.currentTarget.value)}/>
        </div>
      }

      {
        statToCalculate === 'e1rm' ? 
        <div className={`field calculated e1rm`}>
          E1RM:{data.e1rm}
        </div>
        :
        <div className={`field e1rm`}>
          E1RM{data.e1rm}<input type="number" value={data.e1rm} onChange={(e) => setDataValue('e1rm', e.currentTarget.value)}/>
        </div>
      }

      <div className={`field`}>
        Difficulty Rating: {Math.floor(100*getE1RM()/data.e1rm)/100}
      </div>
      
     
  </div>
}

export default App
