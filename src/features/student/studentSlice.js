import { createSlice } from "@reduxjs/toolkit";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "./studentApiSlice";

// student slice
const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    loading: false,
    message: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStudent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = [...state.students, action.payload];
        state.message = "student created successful";
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllStudents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = [...action.payload];
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      .addCase(deleteStudent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (item) => item.id !== action.payload.id
        );
        state.message = "student deleted successful";
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStudent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students[
          state.students.findIndex((item) => item.id === action.payload.id)
        ] = action.payload;
        state.message = "student updated successful";
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export selectors
export const studentSelector = (state) => state.student;

// export actions
export const {} = studentSlice.actions;

// export slice
export default studentSlice.reducer;
