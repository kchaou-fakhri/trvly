import { FullScreenImageState } from '@components/image/configuration/State';
import { AdhanState } from '@store/adhan/State';

export interface AppState {
  fullScreenImageState: FullScreenImageState;
  adhanState: AdhanState
}
