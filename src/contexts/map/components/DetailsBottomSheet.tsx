import React, {useEffect, useRef} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {TrvlyCity} from '@model/index';
import {COLORES} from '@trvlyUtils/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Line from '@components/Line';
import {TextStyles} from '@trvlyUtils/GlobalStyle';
import {NavigationButton} from '@components/Button';
import LocationImage from './LocationImage';

interface Props {
  display: Boolean;
  selectedMarker: TrvlyCity | undefined;
  onBottomSheetClose: () => void;
}

export const DetailsBottomSheet: React.FC<Props> = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

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
  }, [props.display, bottomSheetRef]);

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.titleText}>
            {props.selectedMarker?.name},{' '}
            {props.selectedMarker?.country.substring(0, 3)}
          </Text>
          <View style={styles.countryContainer}>
            <SimpleIcon
              name="location-pin"
              size={18}
              style={styles.iconStyle}
              color={COLORES.LightGray}
            />
            <Text style={styles.reviewTextStyle}>
              {props.selectedMarker?.country}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.reviewContainer}>
            <Icon name="staro" size={18} color={COLORES.Yellow} />
            <Text style={styles.reviewTextStyle}>4.9 (9K Review)</Text>
          </View>
          <View style={styles.countryContainer}>
            <MaterialCommunityIcons
              name="map-marker-radius-outline"
              size={18}
              color={COLORES.Primary}
            />
            <Text style={styles.mapDirection}>Map Direction</Text>
          </View>
        </View>
      </View>
    );
  };

  const Content = () => {
    return (
      <View style={styles.textDescriptionStyle}>
        <Text style={[TextStyles.H5, styles.descriptionTitleStyle]}>
          Description
        </Text>
        <Text style={TextStyles.P}>{props.selectedMarker?.description}</Text>
      </View>
    );
  };

  return (
    <>
      <LocationImage images={props.selectedMarker?.images} />
      <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          <ScrollView>
            <Header />
            <View style={styles.lineContainer}>
              <Line />
            </View>
            <Content />
            <NavigationButton
              text={`Navigate`}
              onClick={() => console.log('Navigate')}
              customStyles={{paddingTop: 20, alignSelf: 'flex-end'}}
            />
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 5,
    paddingEnd: 25,
    paddingStart: 25,
  },
  headerContainer: {justifyContent: 'space-between', flexDirection: 'row'},
  titleText: {
    fontSize: 15,
    color: COLORES.Text.Primary,
    fontWeight: '600',
  },
  headerTitleContainer: {flexDirection: 'column'},
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewTextStyle: {
    fontSize: 12,
    paddingStart: 5,
    color: COLORES.Text.Tertiary,
  },
  countryContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginLeft: -3,
  },
  mapDirection: {
    fontSize: 13,
    fontWeight: '500',
    paddingStart: 5,
    color: COLORES.Primary,
  },
  lineContainer: {
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 15,
  },
  textDescriptionStyle: {
    paddingTop: 10,
  },
  descriptionTitleStyle: {
    paddingBottom: 10,
  },
});
