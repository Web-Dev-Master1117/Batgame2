import React, { Component, PropTypes } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import partition from 'lodash/partition';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  section: {
    height: 30,
    width: 100,
    borderWidth: 1,
    borderColor: '#FFD664',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34485E',
  },
  sectionTitle: {
    color: '#FFD664',
    fontSize: 14,
    fontFamily: 'chalkduster',
  },
  emptyTab: {
    height: 70,
    width: 250,
    borderWidth: 1,
    borderColor: '#FFD664',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#34485E',
  },
  emptyTabName: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'chalkduster',
  },
  match: {
    height: 70,
    width: 250,
    borderWidth: 1,
    marginTop: 7,
    borderColor: '#FFD664',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#34485E',
  },
  playBox: {
    flex: 6,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  usernameBox: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingBottom: 10,
  },
  pending: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34485E',
  },
  defeat: {
    color: '#895524',
    fontSize: 20,
    fontFamily: 'chalkduster',
    marginLeft: 30,
  },
  play: {
    color: '#4EB479',
    fontSize: 20,
    fontFamily: 'chalkduster',
    marginLeft: 30,
  },
  wait: {
    color: '#E67E2C',
    fontSize: 20,
    fontFamily: 'chalkduster',
    marginLeft: 30,
  },
  playUsername: {
    color: '#FFD664',
    fontSize: 12,
    fontFamily: 'chalkduster',
  },
  waitUsername: {
    color: '#FFD664',
    fontSize: 12,
    fontFamily: 'chalkduster',
  },
  victory: {
    color: '#FFD664',
    fontSize: 20,
    fontFamily: 'chalkduster',
    marginLeft: 30,
  },
});

class MatchesList extends Component {
  renderTab(tabName, emptyTabName, array) {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {tabName}
          </Text>
        </View>
        {array.length !== 0 ?
          array.map(match =>
            <TouchableWithoutFeedback
              key={match.id}
              onPress={this.props.onMatchPress.bind(null, match.id)}
            >
              <View style={styles.match}>
                {match.isFinished ?
                  match.winners.users.includes(match.leftUser.id) ?
                    <Text style={styles.victory}>
                        {'🏆 VS ' + match.rightUser.username}
                    </Text>
                  :
                    <Text style={styles.defeat}>
                        {'💩 VS ' + match.rightUser.username}
                    </Text>
                :
                  match.awaitingPlayers.includes(match.leftUser) ?
                    <View style={styles.pending}>
                      <View style={styles.playBox}>
                        <Text style={styles.play}>👍 YOUR TURN!</Text>
                      </View>
                      <View style={styles.usernameBox}>
                        <Text style={styles.playUsername}>{match.rightUser.username}</Text>
                      </View>
                    </View>
                  :
                    <View style={styles.pending}>
                      <View style={styles.playBox}>
                        <Text style={styles.wait}>✋ WAITING...</Text>
                      </View>
                      <View style={styles.usernameBox}>
                        <Text style={styles.waitUsername}>{match.rightUser.username}</Text>
                      </View>
                    </View>
                }
              </View>
            </TouchableWithoutFeedback>
          )
        :
          <View style={styles.emptyTab}>
            <Text style={styles.emptyTabName}>
            {emptyTabName}
            </Text>
          </View>
        }
      </View>
    );
  }
  render() {
    const [finishedGames, pendingGames] = partition(this.props.matches, { isFinished: true });
    return (
      <View>
        {this.renderTab('PENDING', 'NO PENDING GAMES', pendingGames)}
        {this.renderTab('FINISHED', 'NO FINISHED GAMES', finishedGames)}
      </View>
    );
  }
}

MatchesList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMatchPress: PropTypes.func.isRequired,
};

export default MatchesList;
