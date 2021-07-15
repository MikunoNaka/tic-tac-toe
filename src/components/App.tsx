/*
 * Tic Tac Toe - Minimalistic Tic Tac Toe
 * Copyright (C) 2021  Vidhu Kant Sharma
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { useState } from 'react';
import ScoreBoard from './ScoreBoard';
import Grid from './Grid';
import Footer from './Footer';
import './style.css';

const App: React.FC = () => {
  const [scoreX, setScoreX] = useState<number>(0);
  const [scoreO, setScoreO] = useState<number>(0);
  return (
    <>
      <ScoreBoard scoreX={scoreX} scoreO={scoreO}/>
      <Grid scoreX={scoreX} setScoreX={setScoreX} scoreO={scoreO} setScoreO={setScoreO}/>
      <Footer/>
    </>
  );
}

export default App;
