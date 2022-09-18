import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import hardCodeMemes from './hardCodeMemes';

export default function MemeItem() {
  const [input, setInput] = useState({ text1: '' });
  const [result, setResult] = useState(false);
  const { memId } = useParams();
  const meme = hardCodeMemes.find((item) => item.id === memId);
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/');
  };
  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const emptyArrForMap = new Array(meme.box_count).fill('1');
  const pushHandler = () => {
    const captions = emptyArrForMap.map((el, i) => input[`text${i + 1}`]);
    fetch('/api/v1/meme', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        templateId: memId,
        // boxes,
        captions,
        text0: input.text1,
        text1: input.text2,
      }),
    })
      .then((res) => res.json()).then((data) => setResult(data));
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2 onClick={clickHandler}>Wanna go to the Home Page? Then click me!</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="card" style={{ width: '750px', marginTop: '20px', alignItems: 'center' }}>
          {result ? (
            <>
              <h3>You are welcome!</h3>
              <img src={result.url} style={{ padding: '10px' }} className="card-img-top" alt="..." />
            </>
          ) : (<img src={meme.url} style={{ padding: '10px' }} className="card-img-top" alt="..." />)}
          <div className="card-body">
            <h5 className="card-title">Write something funny</h5>
            {emptyArrForMap.map((el, i) => (
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">{i + 1}</span>
                </div>
                <input type="text" className="form-control" name={`text${i + 1}`} value={input[`text${i + 1}`]} onChange={changeHandler} placeholder="your joke" aria-label="your joke" aria-describedby="basic-addon1" />
              </div>
            ))}
          </div>
          <button type="button" onClick={pushHandler} className="btn btn-outline-dark" style={{ marginBottom: '30px' }}>Push me</button>
        </div>
      </div>
      <div style={{ height: '30px' }} />
    </>
  );
}
