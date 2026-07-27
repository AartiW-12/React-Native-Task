import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import Button from '../button/Button';

const TabSwitcher = ({
    tabs,
    activeTab,
    onTabPress,
    buttonWidth = scale(140),
    containerStyle,
    buttonTextStyle,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {tabs.map((tab) => (
                <View
                    key={tab.value}
                    style={[styles.buttonContainer, { width: buttonWidth }]}
                >
                    <Button
                        text={tab.label}
                        varient={activeTab === tab.value ? 'primary' : 'secondary'}
                        onPress={() => onTabPress(tab.value)}
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
        gap: scale(12),
    },

    buttonContainer: {
        width: scale(140),
    },
});

export default TabSwitcher;