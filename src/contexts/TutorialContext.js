import React, { useState, useEffect, createContext } from 'react';

export const TutorialContext = createContext();

const TutorialContextProvider = (props) => {
  // const newCreature = {
  //   creature: '',
  //   name: '',
  //   purpose: '',
  //   purposeName: '',
  //   evolutions: [],
  //   level: 1,
  //   objectives: [],
  //   showObjectives: false,
  //   exp: 0,
  //   expGoal: 1,
  //   prevExp: 0,
  //   expSurplus: 0,
  //   streak: 0,
  //   id: 'creatureTutorial',
  // };

  // const [sampleCreature, setSampleCreature] = useState(() => {
  //   const storedCreature = localStorage.getItem('tutorial');
  //   return storedCreature
  //     ? JSON.parse(storedCreature)
  //     : newCreature;
  // });

  // useEffect(() => {
  //   localStorage.setItem('tutorial', JSON.stringify(sampleCreature));
  // }, [sampleCreature]);

  const [tutorial, setTutorial] = useState({
    index: 0,
    complete: false
  });

  const [complete, setComplete] = useState(() => {
    const storedResult = localStorage.getItem('tutorial');

    return storedResult ? JSON.parse(storedResult) : { state: false }
  });

  useEffect(() => {
    if (!tutorial.complete || !complete.state) return;

    localStorage.setItem('tutorial', JSON.stringify(tutorial));
  }, [tutorial]);

  const [sampleCreature, setSampleCreature] = useState({
    creature: '',
    name: '',
    purpose: '',
    purposeName: '',
    evolutions: [],
    level: 1,
    objectives: [],
    showObjectives: false,
    exp: 0,
    expGoal: 1,
    prevExp: 0,
    expSurplus: 0,
    streak: 0,
    id: 'creatureTutorial',
  });

  const completeTutorial = () => {    
    setComplete({
      ...complete,
      state: true
    });
    
    return setTutorial({
      ...tutorial,
      index: 0,
      complete: true
    });
  }

  const advanceScript = () => {
    if (tutorial.index === 15) {
      return completeTutorial();
    }

    return setTutorial({
      ...tutorial,
      index: tutorial.index + 1
    });
  }

  return (
    <TutorialContext.Provider value={{ 
      sampleCreature, setSampleCreature, 
      completeTutorial,
      tutorial, setTutorial, 
      advanceScript 
    }}>
      {props.children}
    </TutorialContext.Provider>
  )
}

export default TutorialContextProvider;
