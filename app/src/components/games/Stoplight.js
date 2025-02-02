import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Template from '../common/Template';
import Timer from '../common/Timer';
import Duration from '../common/Duration';
import LargeButton from '../common/LargeButton';
import I18n from '../../config/i18n';
import Dimensions from 'Dimensions';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  stoplight: {
    height: deviceWidth * 0.7,
    width: deviceWidth * 0.3,
    borderRadius: 8,
    flexDirection: 'column',
    borderColor: '#583B67',
    borderWidth: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topFooter: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomFooter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  light: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 5,
    backgroundColor: 'transparent',
  },
  redlight: {
    borderColor: '#E74C3C',
  },
  activeRedlight: {
    backgroundColor: '#E74C3C',
  },
  orangelight: {
    borderColor: '#E67E2C',
  },
  activeOrangelight: {
    backgroundColor: '#E67E2C',
  },
  greenlight: {
    borderColor: '#4EB479',
  },
  activeGreenlight: {
    backgroundColor: '#4EB479',
  },
  newGame: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD664',
    borderColor: 'transparent',
  },
  messageBox: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  message: {
    fontSize: 26,
    fontFamily: 'chalkduster',
    color: 'white',
    textAlign: 'center',
  },
  titleBox: {
    flex: 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

class Stoplight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      running: false,
      finished: false,
      failure: false,
      score: 0,
      color: 'red',
    };
    this.onGoPress = this.onGoPress.bind(this);
    this.goRed = this.goRed.bind(this);
    this.goOrange = this.goOrange.bind(this);
    this.goGreen = this.goGreen.bind(this);
    this.goRed();
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  onGoPress() {
    if (this.state.running) {
      const score = Date.now() - this.state.startTime;
      this.setState({
        running: false,
        finished: true,
        score,
      });
      this.props.onEnd({ score });
      return;
    }

    clearTimeout(this.timeout);

    this.setState({
      running: false,
      finished: true,
      score: 3000,
      failure: true,
    });
    this.props.onEnd({ score: 3000 });
  }
  goRed() {
    this.timeout = setTimeout(this.goOrange, 1000);
  }
  goOrange() {
    this.setState({ color: 'orange' });
    this.timeout = setTimeout(this.goGreen, 5000 * Math.random() + 1000);
  }
  goGreen() {
    this.setState({ color: 'green', startTime: Date.now(), running: true });
  }
  renderScore() {
    if (this.state.running) {
      return <Timer startTime={this.state.startTime} />;
    }

    if (this.state.finished) {
      return <Duration duration={this.state.score} />;
    }

    return <Duration duration={0} />;
  }
  render() {
    return (
      <Template
        header={
          <View style={styles.container}>
            <View style={styles.titleBox}>
              {this.renderScore()}
            </View>
            <View style={[styles.messageBox, styles.centered]}>
              <Text style={styles.message}>
                {this.state.finished && (
                  this.state.failure ?
                    I18n.t('falseStart') :
                    I18n.t('wellDone')
                )}
              </Text>
            </View>
          </View>
        }
        footer={
          <View style={styles.container}>
            <View style={styles.topFooter}>
              <View style={styles.stoplight}>
                <View
                  style={[
                    styles.light,
                    styles.redlight,
                    this.state.color === 'red' && styles.activeRedlight,
                  ]}
                />
                <View
                  style={[
                    styles.light,
                    styles.orangelight,
                    this.state.color === 'orange' && styles.activeOrangelight,
                  ]}
                />
                <View
                  style={[
                    styles.light,
                    styles.greenlight,
                    this.state.color === 'green' && styles.activeGreenlight,
                  ]}
                />
              </View>
            </View>
            <View style={styles.bottomFooter}>
              <LargeButton
                style={styles.newGame}
                buttonText="GO!"
                onPress={this.onGoPress}
                underlayColor={this.state.color === 'green' ? '#4EB479' : 'red'}
              />
            </View>
          </View>
        }
      />
    );
  }
}

Stoplight.propTypes = {
  onEnd: PropTypes.func.isRequired,
};

export default Stoplight;
