import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MemeItem from './MemeItem';
import MemeList from './MemeList';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MemeList />} />
      <Route path="/:memId" element={<MemeItem />} />
    </Routes>
  );
}
