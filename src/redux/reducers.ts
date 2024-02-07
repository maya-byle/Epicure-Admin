// Event Handlers
// Pure functions

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA": //TODO: save the action types as constants
      return [
        ...state,
        action.payload, //action payload is document object
      ];

    case "SET_DATA": //TODO: save the action types as constants
      return state.map((document) =>
        document.id !== action.payload.id ? document : { ...document, action }
      );

    case "DELETE_DATA": //TODO: fix type
      return state.filter(
        (object: { name: string }) => object.name !== action.payload.name
      );

    default:
      return state;
  }
};

export default reducer;
