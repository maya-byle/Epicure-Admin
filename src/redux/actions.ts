// like Events

export const fetchData = (url: string) => ({
  type: "FETCH_DATA",
  payload: url,
});

export const addData = (data: {}) => ({
  type: "ADD_DATA",
  payload: { data },
});

export const updateData = (data: {}, newData: {}) => ({
  type: "UPDATE_DATA",
  payload: { data, newData },
});

export const deleteData = (name: string) => ({
  type: "DELETE_DATA",
  payload: { name },
});

// export const setError = (error: string) => ({
//   type: "SET_ERROR",
//   payload: error,
// });
