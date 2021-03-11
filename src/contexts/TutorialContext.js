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
  //   id: 'creatureTutorial'
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
    id: 'creatureTutorial'
  });

  return (
    <TutorialContext.Provider value={{ sampleCreature, setSampleCreature, }}>
      {props.children}
    </TutorialContext.Provider>
  )
}

export default TutorialContextProvider;
