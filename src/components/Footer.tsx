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

const Footer: React.FC = () => {
  return (
    <div className={"Footer"}>
      <p><a href="https://github.com/MikunoNaka/tic-tac-toe">Tic Tac Toe</a>  Copyright (C) 2021  Vidhu Kant Sharma</p>
      <p>This program comes with ABSOLUTELY NO WARRANTY; for details refer to <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPL Licence.</a></p>
      <p>This is free software, and you are welcome to redistribute it under certain conditions; Refer to <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPL Licence</a> for details</p>
    </div>
  );
}

export default Footer;
