import React, { Component, PropTypes } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

class MatchesList extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.matches.map(match =>
          <TouchableWithoutFeedback
            key={match.id}
            onPress={this.props.onMatchPress.bind(null, match)}
          >
            <View>
              <Text>
                {match.participants[0].username}
                {' VS '}
                {match.participants[1].username}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

MatchesList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMatchPress: PropTypes.func.isRequired,
};

export default MatchesList;
