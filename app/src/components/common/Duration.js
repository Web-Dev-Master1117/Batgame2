import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

function formatDuration(d) {
  // This approach has issues
  // See https://github.com/moment/moment/issues/1048
  return moment.utc(d).format('mm:ss.SS');
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // For animation purposes: see heart.js
    backgroundColor: 'transparent',
  },
  char: {
    fontFamily: 'chalkduster',
    fontSize: 40,
    color: '#FFD664',
  },
  numberChar: {
    width: 30,
  },
  symbolChar: {
    width: 16,
  },
});

function Duration(props) {
  const { duration, style, textStyle, ...otherProps } = props;
  return (
    <View {...otherProps} style={[styles.container].concat(style)}>
      {formatDuration(duration).split('').map((c, idx) => {
        const code = c.charCodeAt(0);
        const isNumber = code >= 48 && code <= 57;
        return (
          <Text
            key={idx}
            style={[
              styles.char,
              isNumber ? styles.numberChar : styles.symbolChar,
            ].concat(textStyle)}
          >
            {c}
          </Text>
        );
      })}
    </View>
  );
}

Duration.propTypes = {
  style: PropTypes.any,
  duration: PropTypes.number.isRequired,
  textStyle: PropTypes.any,
};

export default Duration;
