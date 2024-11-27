import {COLORES} from '@trvlyUtils/Colors';
import React from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const NavigationButton: React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onClick} style={styles.btn}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: '100%',
    position: 'absolute',
    paddingBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: COLORES.Primary,
    width: '100%',
    height: 50,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
