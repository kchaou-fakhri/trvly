import {COLORES} from '@trvlyUtils/Colors';
import React from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';

interface ButtonProps {
  text: string;
  onClick: () => void;
  customStyles: any;
}

export const NavigationButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  customStyles,
}) => {
  return (
    <View style={[styles.container, customStyles]}>
      <Pressable onPress={onClick} style={styles.btn}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    paddingBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: COLORES.Primary,
    width: '100%',
    height: 40,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
});
