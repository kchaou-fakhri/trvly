import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

interface Props {
  display: Boolean;
  onBottomSheetClose: () => void;
}

export const DetailsBottomSheet: React.FC<Props> = (props: Props) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = (index: number) => {
    console.log(index);
    if (index === -1) {
      props.onBottomSheetClose();
    }
  };

  useEffect(() => {
    if (props.display) {
      bottomSheetRef.current?.expand();
    }
  }, [props.display]);

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose
      onChange={index => handleSheetChanges(index)}>
      <BottomSheetView style={styles.contentContainer}>
        <Text style={{height: 180}}>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 36,
    alignItems: 'center',
  },
});
