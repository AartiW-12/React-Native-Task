import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import Button from '../button/Button';

const TabSwitcher = ({
  tabs,
  activeTab,
  onTabPress,
  containerStyle,
  tabStyle,
  buttonStyle,
  buttonTextStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {tabs.map(tab => (
        <View
          key={tab.value}
          style={[styles.buttonContainer, tabStyle]}>
          <Button
            text={tab.label}
            varient={activeTab === tab.value ? 'primary' : 'secondary'}
            onPress={() => onTabPress(tab.value)}
            style={buttonStyle}
            textStyle={buttonTextStyle}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        gap: scale(8),
    },

    buttonContainer: {
        flex: 1,
        minWidth: 0, // lets text shrink/ellipsize instead of forcing overflow
    },
});

export default TabSwitcher;