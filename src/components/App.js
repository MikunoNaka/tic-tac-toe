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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { useState } from 'react';
import MessageBox from './MessageBox';
import ScoreBoard from './ScoreBoard';
import Grid from './Grid';
import MultiplayerGrid from './MultiplayerGrid';
import Footer from './Footer';
import './style.css';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [multiplayer, setMultiplayer] = useState(false);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [turn, setTurn] = useState(1);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState("");

  return gameStarted ? (
    <>
      {showMessageBox && 
        <MessageBox 
          message={message} 
          setShowMessage={setShowMessageBox}
        />
      }

      <ScoreBoard 
        turn={turn} 
        scoreX={scoreX} 
        scoreO={scoreO}
      />

      {multiplayer ? <MultiplayerGrid 
          turn={turn} 
          setTurn={setTurn} 
          scoreX={scoreX} 
          setScoreX={setScoreX} 
          scoreO={scoreO} setScoreO={setScoreO} 
          setMessage={setMessage} 
          setShowMessage={setShowMessageBox}
        /> : <Grid 
          turn={turn} 
          setTurn={setTurn} 
          scoreX={scoreX} 
          setScoreX={setScoreX} 
          scoreO={scoreO} setScoreO={setScoreO} 
          setMessage={setMessage} 
          setShowMessage={setShowMessageBox}
        />
      }

      <Footer/>
    </>
  ) : (
    <>
      <div className={"GamemodeChooser"}>
        <div className={"GamemodeButton"} onClick={() => {
          setGameStarted(true);
          setMultiplayer(false);
        }}>
          SINGLE PLAYER
        </div>

        <div className={"GamemodeButton"} onClick={() => {
          setGameStarted(true);
          setMultiplayer(true);
        }}>
          MULTIPLAYER
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default App;
