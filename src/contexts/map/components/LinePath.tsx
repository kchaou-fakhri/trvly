import {Path} from '@model/index';
import {LineLayer, ShapeSource} from '@rnmapbox/maps';
import {COLORES} from '@trvlyUtils/Colors';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  path: Path;
}
export const LinePath: React.FC<Props> = (param: Props) => {
  return (
    <View style={styles.container}>
      <ShapeSource id="line-source" lineMetrics={true} shape={param.path}>
        <LineLayer
          id="line-layer"
          style={{
            lineColor: COLORES.Primary,
            lineCap: 'round',
            lineJoin: 'round',
            lineWidth: 3,
          }}
        />
      </ShapeSource>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
