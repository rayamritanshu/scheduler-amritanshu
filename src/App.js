import React from 'react';
import './App.css';
import { CourseList } from './components/CourseList'
import { useData } from './utilities/firebase.js';
import { addScheduleTimes } from './utilities/times';

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);



export const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);




const App = () => {
  const [schedule, loading, error] = useData('/', addScheduleTimes); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

export default App;