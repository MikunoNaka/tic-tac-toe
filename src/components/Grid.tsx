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
  scoreX: number
  scoreO: number
  setScoreX: Dispatch<SetStateAction<number>>
  setScoreO: Dispatch<SetStateAction<number>>
}

const Grid: React.FC<Props> = (props) => {
  // 0 is O, 1 is X, 2 is blank
  const [board, setBoard] = useState<number[]>([2,2,2,2,2,2,2,2,2]);
  const [turn, setTurn] = useState<number>(1);
  const [winner, setWinner] = useState<number>(2)

  const getBoard = (index: number) => {
    setBoard(board.slice(0, index).concat(turn).concat(board.slice(index+1, 9)));
    setTurn(turn === 1 ? 0 : 1)
  }

  const allEqual = (arr: number[]) => arr.includes(2) ? false : arr.every(v => v === arr[0])

  const getRow = (r: number) => board.slice(r * 3, (r * 3) + 3);

  const getCol: any = (c: number, arr=board) => arr.length <= 3 ? arr[c] : [arr[c]].concat(getCol(c, arr.slice(3)))

  const getLeftDiagonal: any = (i: number = 0) =>
    i < 3 ? [getRow(i)[i]].concat(getLeftDiagonal(i+1)) : [];

  const getRightDiagonal: any = (i: number = 2) =>
    i >= 0 ? [getRow(2-i)[i]].concat(getRightDiagonal(i-1)) : [];

  const checkHorMatch: any = (rowNum: number = 0) =>
    rowNum <= 2 && (allEqual(getRow(rowNum)) ? setWinner(turn === 1 ? 0 : 1) : checkHorMatch(rowNum+1))

  const checkVerMatch: any = (colNum: number = 0) =>
    colNum <= 2 && (allEqual(getCol(colNum)) ? setWinner(turn === 1 ? 0 : 1) : checkVerMatch(colNum+1))

  const checkDiagonalMatch: any = () => {
    (allEqual(getLeftDiagonal()) || allEqual(getRightDiagonal())) && setWinner(turn === 1 ? 0 : 1)
  }

  const endGame = (winner: number) => {
    const gameWinner = winner < 2 ? (winner === 1 ? "X" : "O") : "Draw";
    // clean up before alerting
    setBoard([2,2,2,2,2,2,2,2,2]);
    setWinner(2);
    gameWinner === "Draw" || gameWinner === "X" 
      ? props.setScoreX(props.scoreX + 1) 
      : props.setScoreO(props.scoreO + 1)
    alert(`WINNER: ${gameWinner}`)
  }

  useEffect(() => {
    checkHorMatch();
    checkVerMatch();
    checkDiagonalMatch();
    winner < 2 && endGame(winner);
    board.includes(2) || endGame(2);
  })

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
