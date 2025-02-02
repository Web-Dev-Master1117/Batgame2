import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import shuffle from 'lodash/shuffle';
import without from 'lodash/without';

import Template from '../../common/Template';
import NumberCell from './NumberCell';
import Timer from '../../common/Timer';
import Duration from '../../common/Duration';

// Spacing in pixels between cells
const CELL_SPACING = 20;
const COLORS = [
  '#5bb578', // green
  '#df7f2f', // orange
  '#de4c3d', // red
  '#fcd866', // yellow
  '#4596da', // blue
];

const styles = StyleSheet.create({
  board: {
    flex: 1,
    // Even though it should be the default, it looks like manually setting
    // flexDirection breaks flexWrap. Will have to investigate
    // flexDirection: 'row',
    flexWrap: 'wrap',
    padding: CELL_SPACING / 2,
    justifyContent: 'center',
  },
  cell: {
    padding: CELL_SPACING / 2,
  },
});

const MAX_SCORE = 60000;

class NumberGame extends Component {
  constructor() {
    super();

    this.state = {
      livesLost: 0,
      running: true,
      startTime: Date.now(),
      currentNumber: 1,
      board: this.generateBoard(),
      score: null,
      cellSize: 0,
    };

    this.onLayout = this.onLayout.bind(this);
    this.onCellSuccess = this.onCellSuccess.bind(this);
    this.onCellFailure = this.onCellFailure.bind(this);
  }

  onLayout({ nativeEvent: { layout: { width } } }) {
    this.setState({
      cellSize: (width - CELL_SPACING) / 3,
    });
  }

  onCellSuccess(cell) {
    const nextNumber = cell.number + 1;
    const nextBoard = this.state.board.slice();
    const nextCell = { ...cell, success: true };
    nextBoard.splice(nextBoard.indexOf(cell), 1, nextCell);
    this.setState({
      board: nextBoard,
      currentNumber: nextNumber,
    });
    if (nextNumber === 10) {
      const score = Date.now() - this.state.startTime;
      this.setState({
        running: false,
        score,
      });
      this.props.onEnd({ score });
    }
  }

  onCellFailure() {
    const score = Date.now() - this.state.startTime;
    this.setState({
      running: false,
      score,
    });
    this.props.onEnd({ score: MAX_SCORE });
  }

  generateBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
      board.push({
        number: i + 1,
        success: false,
      });
    }
    board = shuffle(board);

    // Never have the same color twice in a row
    for (let i = 0; i < 9; i++) {
      const cell = board[i];
      const forbiddenColors = [];
      if (i - 3 >= 0) { // Top
        forbiddenColors.push(board[i - 3].color);
      }
      if (i % 3 !== 0) { // Left
        forbiddenColors.push(board[i - 1].color);
      }
      if (i - 4 >= 0 && i % 3 !== 0) { // Top left
        forbiddenColors.push(board[i - 4].color);
      }
      if (i - 2 >= 0 && i % 3 !== 2) { // Top right
        forbiddenColors.push(board[i - 2].color);
      }
      const availableColors = COLORS.filter(color =>
        forbiddenColors.indexOf(color) === -1
      );
      const color = availableColors[
        Math.floor(availableColors.length * Math.random())
      ];
      cell.color = color;
    }
    return board;
  }

  render() {
    return (
      <Template
        {...without(this.props, 'onEnd')}
        onLayout={this.onLayout}
        header={
          <View>
            {this.state.running ?
              <Timer startTime={this.state.startTime} />
            :
              <Duration duration={this.state.score} />
            }
          </View>
        }
        footer={
          <View style={styles.board}>
            {this.state.board.map(cell =>
              <View
                key={cell.number}
                style={[styles.cell, {
                  width: this.state.cellSize,
                  height: this.state.cellSize,
                }]}
              >
                {!cell.success &&
                  <NumberCell
                    cell={cell}
                    current={this.state.currentNumber === cell.number}
                    onSuccess={this.onCellSuccess}
                    onFailure={this.onCellFailure}
                  />
                }
              </View>
            )}
          </View>
        }
      />
    );
  }
}

NumberGame.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default NumberGame;
