import {COLORES} from '@trvlyUtils/Colors';
import React from 'react';
import {View, StyleSheet} from 'react-native';

// Define the interface for the component's props
interface LineProps {
  styles?: any; // Optional styles prop to allow custom styles
}

// Define the Line functional component
const Line: React.FC<LineProps> = (props: LineProps) => {
  // Render a View component with combined styles
  return <View style={[styles.line, props.styles]} />;
};

// Define the styles for the component
const styles = StyleSheet.create({
  line: {
    height: 1, // Set the height of the line
    backgroundColor: COLORES.LightGray, // Set the background color of the line
    width: '100%', // Set the width of the line
    borderRadius: 5, // Set the border radius of the line
  },
});

// Export the Line component as the default export
export default Line;
