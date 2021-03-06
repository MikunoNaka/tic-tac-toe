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

import React from 'react';
import './style.css';

const ScoreBoard = (props) => {
  return (
    <div className={"ScoreBoardContainer"}>
      <div className={"ScoreBoard"}>
        <span>X: {props.scoreX}</span>
        <span>O: {props.scoreO}</span>
      </div>
      <div className={"turnMessage"}>
        -- {props.multiplayer 
          ? ` ${props.turn === 0 ? (props.isHost ? "Opponent's turn" : "Your turn") : (props.isHost ? "Your turn" : "Opponent's turn")} `
          : ` ${props.turn === 0 ? "O" : "X"}'s turn `
        } -- 
      </div>
    </div>
  );
}

export default ScoreBoard;
