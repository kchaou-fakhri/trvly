import { TrvlyImage } from "@model/index";

export type TrvlyStackParamList = {
  Home: undefined;
  TrvlyMapView: undefined;
  ListOfImagesScreen: {place: string};
  FullScreenImage: {data: TrvlyImage[], index: number};
};
