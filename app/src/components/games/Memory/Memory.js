import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MemoryCell from './MemoryCell';
import Dimensions from 'Dimensions';

import shuffle from 'lodash/shuffle';

import Template from '../../common/Template';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojis: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
  },
  score: {
    fontSize: 20,
    fontFamily: 'chalkduster',
    color: '#FFD664',
    marginRight: 10,
  },
  cell: {
    width: (deviceHeight - 20) / 6,
    height: (deviceHeight - 20) / 6,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: (deviceHeight - 20) / 12,
    backgroundColor: '#34485E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// const allEmojis to use with react-native-emoji
// const allEmojis = ['moneybag', 'moneybag', 'moneybag', 'moneybag', 'moneybag',
//                   'moneybag', 'moneybag', 'moneybag', 'moneybag', 'moneybag', 'moneybag', 'bomb'
//                    ];

const allEmojis = ['🌍', '🌍', '🍎', '🍎', '🙈',
                  '🙈', '🔥', '🔥', '👸', '👸', '😈', '😈'];

class Memory extends Component {
  constructor() {
    super();
    this.state = {
      tries: 0,
      guesses: ['', '', '', '', '', '', '', '', '', '', '', ''],
      discovered: '',
      score: 0,
      emojis: shuffle(allEmojis),
      running: true,
    };
    this.emojiList = this.emojiList.bind(this);
    this.onCellPress = this.onCellPress.bind(this);
    this.onMiss = this.onMiss.bind(this);
    this.compatibilityCheck = this.compatibilityCheck.bind(this);
  }
  onCellPress(guess, key) {
    if (this.state.tries === 99) {
      this.setState({ tries: 100 });
      this.props.onEnd({ score: this.state.tries + 1 });
    } else {
      this.compatibilityCheck(this.state.discovered, guess, key);
    }
  }
  onMiss() {
    this.setState({
      guesses: ['', '', '', '', '', '', '', '', '', '', '', ''],
      discovered: '',
    });
  }
  compatibilityCheck(discovered, guess, key) {
    const array = this.state.guesses.slice();
    if (discovered === '') {
      array[key] = guess;
      this.setState({
        guesses: array,
        discovered: guess,
        tries: this.state.tries + 1,
      });
    } else if (this.state.score < 5) {
      if (discovered === guess) {
        array[key] = guess;
        this.setState({
          guesses: array,
          score: this.state.score + 1,
          discovered: '',
          tries: this.state.tries + 1,
        });
      } else {
        array[key] = guess;
        this.setState({
          guesses: array,
          tries: this.state.tries + 1,
          score: 0,
        });
        this.timeout = setTimeout(this.onMiss, 500);
      }
    } else {
      array[key] = guess;
      this.setState({
        guesses: array,
        tries: this.state.tries + 1,
        score: this.state.score + 1,
        running: false,
      });
      this.props.onEnd({ score: this.state.tries + 1 });
    }
  }
  emojiList() {
    return this.state.emojis.map((emoji, i) => {
      return (
        <MemoryCell
          style={styles.cell}
          onPress={this.onCellPress}
          isFlipped={!(this.state.guesses[i] === '')}
          key={i}
          index={i}
          underlayColor="transparent"
          emoji={emoji}
        />
      );
    });
  }
  render() {
    return (
      <Template
        header={
          <View style={styles.container}>
            <Text style={styles.score}>
              {this.state.tries}
            </Text>
          </View>
        }
        footer={
          <View style={styles.container}>
            <View style={styles.emojis}>
              {this.emojiList()}
            </View>
          </View>
        }
      />
    );
  }
}

Memory.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default Memory;
