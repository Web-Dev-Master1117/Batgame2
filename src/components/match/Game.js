import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import Stoplight from '../games/Stoplight';
import MathBattle from '../games/MathBattle';
import PopTheBalloon from '../games/PopTheBalloon';
import RedGreenBlue from '../games/RedGreenBlue';
import Identical from '../games/Identical';
import Lucky from '../games/Lucky';
import RightOn from '../games/RightOn';
import WhackAMole from '../games/WhackAMole';
import NumberGame from '../games/numbers/NumberGame';
import GameOverlay from './GameOverlay';

import { gameSelector, matchSelector } from '../../selectors';
import { createGameScore } from '../../actions/application';

const gameComponents = {
  STOPLIGHT: Stoplight,
  MATH_BATTLE: MathBattle,
  POP_THE_BALLOON: PopTheBalloon,
  RED_GREEN_BLUE: RedGreenBlue,
  WHACK_A_MOLE: WhackAMole,
  IDENTICAL: Identical,
  LUCKY: Lucky,
  RIGHT_ON: RightOn,
  NUMBER: NumberGame,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameComponent: {
    flex: 1,
  },
  gameOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

class Game extends Component {
  constructor() {
    super();

    this.state = {
      ended: false,
    };

    this.onGameEnd = this.onGameEnd.bind(this);
  }

  onGameEnd(result) {
    const { game } = this.props;
    this.setState(state => {
      if (!state.ended) {
        this.props.dispatch(createGameScore(game.id, result.score));
      } else {
        console.error('`onEnd` has been called more than once.');
      }
      return { ended: true };
    });
  }

  render() {
    const { game, match } = this.props;

    const GameComponent = gameComponents[game.gameName];

    return (
      <View style={styles.container}>
        {/*
        I'd rather set this directly on GameComponent but it would mean passing
        otherProps and style on all game components.
        */}
        <View
          style={styles.gameComponent}
          pointerEvents={game.myScore ? 'none' : 'auto'}
        >
          <GameComponent
            onEnd={this.onGameEnd}
          />
        </View>
        {game.myScore &&
          <GameOverlay
            style={styles.gameOverlay}
            game={game}
            match={match}
          />
        }
      </View>
    );
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((state, props) => ({
  game: gameSelector(props.gameId, state),
  match: matchSelector(props.matchId, state),
}))(Game);
