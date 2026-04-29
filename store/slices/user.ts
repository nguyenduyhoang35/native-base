import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TLanguage} from 'languages';
import {RootState} from 'store';
import {ModeType} from 'types/user';

type State = {
  user?: {id: number};
  language: TLanguage;
  mode: ModeType;
};

const initialState: State = {
  user: undefined,
  language: 'en',
  mode: ModeType.LIGHT,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{id: number} | undefined>) => {
      state.user = action.payload;
    },
    setLanguage: (state, action: PayloadAction<TLanguage>) => {
      state.language = action.payload;
    },
    setMode: (state, action: PayloadAction<ModeType>) => {
      state.mode = action.payload;
    },
    resetUser: state => {
      state.user = undefined;
    },
  },
});

export const {setUser, setLanguage, setMode, resetUser} = userSlice.actions;

export const userSelector = (state: RootState) => state.user.user;
export const userIdSelector = (state: RootState) => state.user.user?.id;
export const languageSelector = (state: RootState) => state.user.language;
export const modeSelector = (state: RootState) =>
  state.user.mode ?? ModeType.LIGHT;

export default userSlice.reducer;
