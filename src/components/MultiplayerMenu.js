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

import React from 'react';
import './style.css';

const MultiplayerMenu = (props) => {
  return (
    <div className={"MultiplayerMenu"}>
      <div className={"GamemodeButton"} onClick={() => {
        props.setIsHost(true);
        props.setGameStarted(true);
      }}>
        HOST GAME
      </div>

      <div className={"GamemodeButton"} onClick={() => {
        props.setGameStarted(true);
      }}>
        JOIN GAME
      </div>
    </div>
  );
}

export default MultiplayerMenu;
