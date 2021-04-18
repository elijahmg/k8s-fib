import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    fetchIndexes();
    fetchValues();
  }, [index]);

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current');

    setValues(values.data);
  }

  const fetchIndexes = async () => {
    const indexes = await axios.get('/api/values/all');

    setSeenIndexes(indexes.data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index,
    });

    setIndex('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index: </label>
        <input type="text" value={index} onChange={(e) => setIndex(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes I have seen</h3>
      {seenIndexes.map(({ number }) => number).join(',')}

      <h3>Calculated Values</h3>
      {Object.keys(values).map((key, index) =>
        (
          <div key={index}>
            For index {key} I calculated {values[key]}
          </div>
        )
      )}
    </div>
  );
}

export default Fib;
