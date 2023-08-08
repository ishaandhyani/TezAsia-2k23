

import React, { Component } from 'react';
import PropTypes from "prop-types";
import Chessboard from 'chessboardjsx';
import io from 'socket.io-client';
import {Chess} from 'chess.js'; // Import the Chess module

const socket = io.connect('http://localhost:8000');

class ChessBoard1 extends Component {
  static propTypes = { children: PropTypes.func };

  constructor(props) {
    super(props);
    this.state = {
      fen: 'start',
      squareStyles: {},
      history: [],
      game: null,
      room: null,

      userName: "",
      opponentName: "",

      dropSquareStyle: {},
      pieceSquare: "",
      square: "",
      endpoint: "http://localhost:5173/",
    };

    this.roomInput = React.createRef();
    this.userNameInput = React.createRef();
  }

  componentDidMount() {
    this.setState({
      game: new Chess()
    });
    socket.on('move', (msg) => {
      this.setState(msg);
    });
  }


  componentDidUpdate(prevState) {
    if (prevState.fen !== this.state.fen) {
      socket.on('move', (msg) => {
        console.log('Received FEN:', msg.fen); // Debugging statement
        try {
          msg.game = new Chess(msg.fen);
          this.setState(msg);
        } catch (error) {
          console.error('Error creating Chess instance:', error);
        }
      });
    }
  
  }

  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };


  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare
          })
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles }
    }));
  };

  onDrop = async({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    let move = this.state.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
    const change = await this.setState(({ history, pieceSquare }) => ({
      fen: this.state.game.fen(),
      history: this.state.game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history })
    }));
    console.log(this.state)
    socket.emit('move', this.state);

  };

  onMouseOverSquare = square => {
    // get list of possible moves for this square
    console.log(this.state.game);
    let moves = this.state.game.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = square => this.removeHighlightSquare(square);

  // central squares get diff dropSquareStyles
  onDragOverSquare = square => {
    this.setState({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    });
  };

  onSquareClick = square => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));

    let move = this.state.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    this.setState({
      fen: this.state.game.fen(),
      history: this.state.game.history({ verbose: true }),
      pieceSquare: ""
    });
  };

  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });


  createRoom = () => {
    const room = this.roomInput.current.value;
    socket.emit('createRoom', room);
    this.setState({ room });
  };

  joinRoom = () => {
    const room = this.roomInput.current.value;
    socket.emit('joinRoom', room);
    this.setState({ room });
  };

  handleMove = (move) => {
    const { game } = this.state;
    try {
      const moveObj = game.move(move);
  
      if (moveObj) {
        this.setState(
          {
            fen: game.fen(),
            history: game.history({ verbose: true }),
            squareStyles: {},
          },
          () => socket.emit('move', this.state)
        );
      }
    } catch (error) {
      console.error('Error making move:', error);
      // Handle the error here, e.g., display an error message to the user
    }
  };

  render() {
    const { fen, squareStyles, room, game } = this.state;

    return (
      <div>
        {!room ? (
          <div>
            <input ref={this.roomInput} placeholder="Enter Room ID" />
            <button onClick={this.createRoom}>Create Room</button>
            <button onClick={this.joinRoom}>Join Room</button>
          </div>
        ) : (
          <div>
            <h2>Room: {room}</h2>
            <Chessboard
              position={fen}
              onDrop={({ sourceSquare, targetSquare }) => {
                const move = { from: sourceSquare, to: targetSquare };
                this.handleMove(move);
              }}
              squareStyles={squareStyles}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ChessBoard1;