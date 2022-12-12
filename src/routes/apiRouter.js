import axios from 'axios';
import express from 'express';
import FormData from 'form-data';
// import fetch from 'node-fetch';
import fetch from 'node-fetch';
// const fetch = require('node-fetch');

const router = express.Router();

router.post('/meme', async (req, res) => {
  const {
    templateId, captions,
  } = req.body;
  console.log(req, templateId, captions);
  // const { text0, text1 } = req.body;
  const formData = new FormData();
  formData.append('username', 'aynur.m');
  formData.append('password', '3Af5!KkNiFMx!t2');
  formData.append('template_id', templateId);
  captions.forEach((input, i) => formData.append(`boxes[${i}][text]`, input));

  fetch('https://api.imgflip.com/caption_image', {
    method: 'POST',
    body: formData,
  })
    .then((resp) => resp.json()).then((data) => res.json(data.data));

  // const options = {
  //   url: 'https://api.imgflip.com/caption_image',
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/x-www-form-urlencoded',
  //   },
  //   params: { // iz-za togo chto bylo (data) ne rabotalo
  //     template_id: templateId,
  //     username: 'aynur.m',
  //     password: '3Af5!KkNiFMx!t2',
  //     text0,
  //     text1,
  //     font: 'impact',
  //     max_font_size: '50px',
  //   },
  // };
  // const response = await axios(options);
  // console.log(response.data);
  // res.json(response.data);
});

router.get('/memes', async (req, res) => {
  const response = await axios.get('https://api.imgflip.com/get_memes');
  res.json(response.data.data.memes);
});

export default router;
