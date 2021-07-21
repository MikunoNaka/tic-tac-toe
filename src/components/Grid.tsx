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

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
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

const Grid: React.FC<Props> = (props) => {
  // 0 is O, 1 is X, 2 is blank
  const [board, setBoard] = useState<number[]>([2,2,2,2,2,2,2,2,2]);
  const turn = props.turn;

  const getBoard = (index: number) => {
    setBoard(board.slice(0, index).concat(turn).concat(board.slice(index+1, 9)));
    props.setTurn(turn === 1 ? 0 : 1)
  }

  const allEqual = (arr: number[]) =>
    arr.includes(2) ? false : arr.every(i => i === arr[0])

  const getRow = (r: number) => board.slice(r * 3, (r * 3) + 3);
  const getRows: any = (r: number = 0) => 
    r <= 2 ? [getRow(r)].concat(getRows(r+1)) : getRow(r) 

  const getCol = (arr: number[][], c: number) => arr.map((i: any) => i[c])
  const getCols: any = (rows: number[][], c: number = 0) => 
    c < 2 ? [getCol(rows, c)].concat(getCols(rows, c+1)) : [getCol(rows, c)]

  const getLeftDiagonal: any = (i: number = 0) =>
    i < 3 ? [getRow(i)[i]].concat(getLeftDiagonal(i+1)) : [];

  const getRightDiagonal: any = (i: number = 2) =>
    i >= 0 ? [getRow(2-i)[i]].concat(getRightDiagonal(i-1)) : [];

  const endGame = (winner: number) => {
    const gameWinner = winner < 2 ? (winner === 1 ? "X" : "O") : "Draw";
    props.setMessage(`WINNER: ${gameWinner}`);
    props.setShowMessage(true);
    gameWinner === "Draw" || (gameWinner === "X" 
      ? props.setScoreX(props.scoreX + 1)
      : props.setScoreO(props.scoreO + 1));
    setBoard([2,2,2,2,2,2,2,2,2]);
    winner < 2 && props.setTurn(winner); // set turn to prev. winner
  }

  useEffect(() => {
    if (board.includes(0) || board.includes(1)) {
      const rows = getRows();
      (rows.some((i: number[]) => allEqual(i))
        || getCols(rows).some((i: number[]) => allEqual(i))
        || [getLeftDiagonal(), getRightDiagonal()].some((i) => allEqual(i))
      ) ? endGame(turn === 0 ? 1 : 0) : (board.includes(2) || endGame(2));
    }
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

export default Grid;
