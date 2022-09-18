import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hardCodeMemes from './hardCodeMemes';

export default function MemeList() {
  const [memes, setMemes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // fetch('/api/v1/memes').then((res) => res.json()).then((data) => setMemes(data));
    setMemes(hardCodeMemes);
  }, []);

  const clickHandler = (id) => {
    navigate(`/${id}`);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Yo, choose A meme</h1>
      </div>
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
      }}
      >
        {memes && memes.map((el) => (
          <div key={el.id}>
            <img
              src={el.url}
              className="img-thumbnail"
              onClick={() => clickHandler(el.id)}
              alt="..."
            />
          </div>
        ))}
      </div>
    </>
  );
}
