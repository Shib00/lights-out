import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.4
  }

  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: this.createBoard() }
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** isCellLit: implementing the probability function */
  isCellLit() {
    return !!this.props.chanceLightStartsOn && Math.random() <= this.props.chanceLightStartsOn;
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  createBoard() {
    let board = Array.from({ length: this.props.nrows }).map(row => {
      return Array.from({ length: this.props.ncols }).map(col => {
        return this.isCellLit()
      });
    });
    return board
  }z

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({ board, hasWon });
  }


  /** Render game board or winning message. */
  render() {
    return (
      <div>
        {this.state.hasWon ? (
          <div className='winner'>
            <span className='neon-orange'>YOU</span>
            <span className='neon-blue'>WIN!</span>
          </div>
          ) : (
          <div>
            <div className='Board-title'>
              <div className='neon-orange'>Lights</div>
              <div className='neon-blue'>Out</div>
            </div>
            <table className="Board">
              <tbody>
                {this.state.board.map((row, rIndex) => (
                 <tr key={rIndex}>
                    {row.map((col, cIndex) => (
                      <Cell key={`${rIndex}-${cIndex}`} isLit={col} flipCellsAroundMe={this.flipCellsAround} coord={`${rIndex}-${cIndex}`} />
                   ))}
                 </tr>
               ))}
             </tbody>
           </table>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
