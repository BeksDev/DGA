import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  isOpenSearch: boolean;
  isRightSideBar: boolean;
  isUploadOpen: boolean;
  isTabAddOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  isOpenSearch: false,
  isRightSideBar: false,
  isUploadOpen: false,
  isTabAddOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    searchToggleModal: (state) => {
      state.isOpenSearch = !state.isOpenSearch;
    },
    rightSideBarToggleModal: (state) => {
      state.isRightSideBar = !state.isRightSideBar;
    },
    rightSideBarOpenModal: (state) => {
      state.isRightSideBar = true;
    },
    rightSideBarCloseModal: (state) => {
      state.isRightSideBar = false;
    },
    uploadOpenToggleModal: (state) => {
      state.isUploadOpen = !state.isUploadOpen;
    },
    tabAddOpenToggleModal: (state) => {
      state.isTabAddOpen = !state.isTabAddOpen;
    },
  },
});

export const {
  toggleModal,
  searchToggleModal,
  rightSideBarToggleModal,
  rightSideBarOpenModal,
  rightSideBarCloseModal,
  uploadOpenToggleModal,
  tabAddOpenToggleModal,
} = modalSlice.actions;

export default modalSlice.reducer;
