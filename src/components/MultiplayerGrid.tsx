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

import React, { useState/*, useEffect*/, Dispatch, SetStateAction } from 'react';
import { io } from 'socket.io-client';
import Box from './Box';
import './style.css';

interface Props {
  turn: number
  setTurn: Dispatch<SetStateAction<number>>
  scoreX: number
  scoreO: number
  setScoreX: Dispatch<SetStateAction<number>>
  setScoreO: Dispatch<SetStateAction<number>>
  setMessage: Dispatch<SetStateAction<string>>
  setShowMessage: Dispatch<SetStateAction<boolean>>
}

const socket = io("http://localhost:5000");

const MultiplayerGrid: React.FC<Props> = (props) => {
  // 0 is O, 1 is X, 2 is blank
  const [board, setBoard] = useState<number[]>([2,2,2,2,2,2,2,2,2]);
  const turn = props.turn;

  const getBoard = (index: number) => {
    const newBoard: number[] = board.slice(0, index).concat(turn).concat(board.slice(index+1, 9));
    socket.emit("update-remote-data", {board: newBoard, turn: turn});
    // props.setTurn(turn === 0 ? 1 : 0);
  }

  const endGame = (winner: number) => {
    const gameWinner = winner < 2 ? (winner === 1 ? "X" : "O") : "Draw";
    props.setMessage(`WINNER: ${gameWinner}`);
    props.setShowMessage(true);
    console.log(gameWinner, "X: ", props.scoreX, "O: ", props.scoreO);

    gameWinner === "Draw" || (gameWinner === "X"
      ? props.setScoreX(props.scoreX + 1)
      : props.setScoreO(props.scoreO + 1));

    console.log(gameWinner, "X: ", props.scoreX, "O: ", props.scoreO);
    socket.emit("update-remote-data", {board: [2,2,2,2,2,2,2,2,2], turn: turn});
    winner < 2 && props.setTurn(winner); // set turn to prev. winner
  }

  useState(() => {
    socket.on("update-client-data", (data) => {
      setBoard(data.board);
      props.setTurn(data.turn);
    });
    socket.on("set winner", (turn) => endGame(turn));
  });

  return (
    <div className="Grid">
      {
        board.map(
          (i, index) => 
            <Box key={index} index={index} sign={i} setSign={getBoard}/>
        )
      }
    </div>
  );
}

export default MultiplayerGrid;
