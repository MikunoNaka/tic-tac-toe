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

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Box from './Box';
import './style.css';

const socket = io("http://localhost:5000");

const MultiplayerGrid = (props) => {
  // 0 is O, 1 is X, 2 is blank
  const [board, setBoard] = useState([2,2,2,2,2,2,2,2,2]);
  const turn = props.turn;

  const isHost = props.isHost;
  useEffect(() => {
    if (isHost) {
      socket.emit("host");
      socket.on("set-host-id", (id) => alert(id));
    } else {
      socket.emit("join", prompt("Enter ID"));
    }
  }, [isHost]);

  const getBoard = (index) => {
    // if it's not your turn you can't play
    if ((turn === 0) === isHost) return;

    const newBoard = board.slice(0, index).concat(turn).concat(board.slice(index+1, 9));
    socket.emit("update-remote-data", {
      board: newBoard, 
      turn: turn, 
      scoreX: props.scoreX,
      scoreO: props.scoreO
    });
  }

  const endGame = (data) => {
    props.setMessage(
      `${data.winner === "Data" ? "" : "WINNER: "}${data.winner}`
    );
    props.setShowMessage(true);
    props.setScoreX(data.scoreX);
    props.setScoreO(data.scoreO);

    // socket.emit messes everything up
    // and this does the job very well
    setBoard([2,2,2,2,2,2,2,2,2]);
    props.setTurn(data.winner === "Draw" ? turn : (data.winner === "X" ? 1 : 0));
  }

  useEffect(() => {
    socket.on("update-client-data", (data) => {
      setBoard(data.board);
      props.setTurn(data.turn);
      props.setScoreX(data.score.scoreX);
      props.setScoreO(data.score.scoreO);
    });
    socket.on("update-winner", (data) => endGame(data));
  });

  return (
    <div className="Grid">
      {board.map((i, index) => 
        <Box key={index} index={index} sign={i} setSign={getBoard}/>
      )}
    </div>
  );
}

export default MultiplayerGrid;
