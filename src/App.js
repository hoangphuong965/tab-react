import React, { useState, useEffect } from 'react';
const url = 'https://course-api.netlify.app/api/react-tabs-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    const respon = await fetch(url);
    const newJob = await respon.json();
    setJobs(newJob);
    console.log(newJob);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  if (loading) {
    return <div class='ui bottom attached loading tab segment'></div>;
  }

  const { company, title, duties, dates } = jobs[value];
  return (
    <section className='ui container'>
      {/* btn */}
      <div className='ui top attached tabular menu'>
        <div className='active item cursor'>
          {jobs.map((item, index) => {
            return (
              <div
                key={index}
                className={`active item ${
                  index === value ? 'active-btn' : ''
                } cursor`}
                onClick={() => setValue(index)}
              >
                {item.company}
              </div>
            );
          })}
        </div>
      </div>
      {/* info */}
      <div className='ui bottom attached active tab segment'>
        <h3>{title}</h3>
        <h4>{company}</h4>
        <p className='job-date'>{dates}</p>
        {duties.map((duty, index) => {
          return (
            <div key={index} className='ui segment'>
              <p>{duty}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default App;
