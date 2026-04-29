import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TLanguage} from 'languages';
import {RootState} from 'store';

type State = {
  user?: {id: number};
  language: TLanguage;
};

const initialState: State = {
  user: undefined,
  language: 'en',
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
    resetUser: state => {
      state.user = undefined;
    },
  },
});

export const {setUser, setLanguage, resetUser} = userSlice.actions;

export const userSelector = (state: RootState) => state.user.user;
export const userIdSelector = (state: RootState) => state.user.user?.id;
export const languageSelector = (state: RootState) => state.user.language;

export default userSlice.reducer;
