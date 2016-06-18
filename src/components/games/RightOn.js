import React, { Component, PropTypes } from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import Template from '../common/Template';
import Timer from '../common/Timer';
import Duration from '../common/Duration';
// import formatTime from 'minutes-seconds-milliseconds';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    flex: 5,
  },
  laps: {
    flex: 4,
  },
  scoreBox: {
    flex: 1,
    alignItems: 'center',
  },
  score: {
    fontSize: 30,
  },
  timerWrapper: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 60,
    color: 'blue',
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4EB479',
  },
  startButton: {
    borderColor: 'green',
  },
  stopButton: {
    borderColor: 'red',
  },
  lap: {
    alignItems: 'center',
    marginTop: 30,
  },
  lapText: {
    fontSize: 30,
    color: '#FFD664',
    fontFamily: 'chalkduster',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'chalkduster',
  },
});

function formatDuration(d) {
  // This approach has issues
  // See https://github.com/moment/moment/issues/1048
  return moment.utc(d).format('s.SS');
}

class RightOn extends Component {
  constructor() {
    super();
    this.state = {
      startTime: Date.now(),
      duration: null,
      running: true,
      laps: [],
      difference: null,
    };

    this.handleLapPress = this.handleLapPress.bind(this);
  }
  laps() {
    return this.state.laps.map((time, index) => {
      return (
        <View key={index} style={styles.lap}>
          <Text style={styles.lapText}>
            Try {index + 1}: {formatDuration(time)}
          </Text>
        </View>
      );
    });
  }
  score() {
    return (
      <Text style={styles.score}>
        Your offset: {formatDuration(this.state.difference)}
      </Text>
    );
  }
  lapButton() {
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleLapPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          GO
        </Text>
      </TouchableHighlight>
    );
  }
  handleLapPress() {
    const lap = Date.now() - this.state.startTime;

    this.setState({
      startTime: Date.now(),
      laps: this.state.laps.concat([lap]),
    });

    if (this.state.laps.length === 3) {
      this.setState({
        difference: Math.abs(this.state.laps[0] - 3000) +
                    Math.abs(this.state.laps[1] - 3000) +
                    Math.abs(this.state.laps[2] - 3000),
        running: false,
      });
    }
  }
  render() {
    return (
      <Template
        header={
          <View style={styles.container}>
            <View style={styles.scoreBox}>
              <Text style={styles.score}>
                {this.state.taps}
              </Text>
            </View>
            <View style={styles.timerBox}>
              {this.state.running && <Timer startTime={this.state.startTime} />}
            </View>
          </View>
        }
        footer={
          <View style={styles.container}>
            <View style={styles.laps}>
              {this.laps()}
            </View>
            <View style={styles.buttonWrapper}>
              {this.lapButton()}
            </View>
            <View style={styles.scoreBox}>
              {this.score()}
            </View>
          </View>
        }
      />
    );
  }
}

RightOn.propTypes = {
  navigator: PropTypes.object.isRequired,
};

export default RightOn;
