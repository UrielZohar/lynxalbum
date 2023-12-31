import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import AlbumManagerAPI, { Photo } from "../../utils/AlbumManagerAPI/AlbumManagerAPI";
export interface CounterState {
  photos: Photo[],
  status: "idle" | "loading" | "failed",
  photoModal: null | Photo,
  photoToEdit: null | Photo,
}

const initialState: CounterState = {
  photos: [],
  status: "idle",
  photoModal: null,
  photoToEdit: null,
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(getPhotos())`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getPhotosAsync = createAsyncThunk(
  "albums/getPhotos",
  async () => {
    const response = await AlbumManagerAPI.getPhotos()
    // The value we return becomes the `fulfilled` action payload
    return response;
  },
)

export const deletePhoto = createAsyncThunk(
  "albums/deletePhoto",
  async (id: string) => {
    await AlbumManagerAPI.deletePhoto(id);
    // The value we return becomes the `fulfilled` action payload
    return id;
  },
)

export const updatePhoto = createAsyncThunk(
  "albums/updatePhoto",
  async (photo: Photo) => {
    const updatedPhoto = await AlbumManagerAPI.updatePhoto(photo);
    // The value we return becomes the `fulfilled` action payload
    return updatedPhoto;
  },
)

export const addPhoto = createAsyncThunk(
  "albums/addPhoto",
  async (photo: Photo) => {
    await AlbumManagerAPI.addPhoto(photo);
    // The value we return becomes the `fulfilled` action payload
    return photo;
  },
)

export const AlbumManagerSlice = createSlice({
  name: "albums",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPhotoModal: (state, action: PayloadAction<string | null>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // Use the PayloadAction type to declare the contents of `action.payload`
      state.photoModal = state.photos.find((photo) => photo.id === action.payload) || null;
    },
    setPhotoToEdit: (state, action: PayloadAction<string | null>) => {
      state.photoToEdit = state.photos.find((photo) => photo.id === action.payload) || null;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getPhotosAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getPhotosAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.photos = action.payload
      })
      .addCase(getPhotosAsync.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(deletePhoto.pending, (state) => {
        state.status = "loading"
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.status = "idle"
        state.photos = state.photos.filter(photo => photo.id != action.payload)
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(updatePhoto.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(updatePhoto.pending, (state) => {
        state.status = "loading"
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.status = "idle"
        state.photos = state.photos.map(photo => {
          if (photo.id == action.payload.id) {
            return action.payload;
          } 
          return photo;
        })
        state.photoToEdit = null;
      })
      .addCase(addPhoto.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(addPhoto.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addPhoto.fulfilled, (state, action) => {
        state.status = "idle"
        state.photos = [action.payload, ...state.photos]
      })
  },
})

export const { setPhotoModal, setPhotoToEdit } = AlbumManagerSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.albums.albums)`
export const selectPhotos = (state: RootState) => state.album.photos;
export const selectPhotoModal = (state: RootState) => state.album.photoModal;
export const selectPhotoToEdit = (state: RootState) => state.album.photoToEdit;
export const selectStatus = (state: RootState) => state.album.status;

export default AlbumManagerSlice.reducer
