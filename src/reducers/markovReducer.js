
export default function reducer(state={
  markovState: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {

  switch (action.type) {
    case "FETCH_STATE": {
      // immutable returns a new object
      return {...state, fetching: true};
    }
    case "FETCH_STATE_REJECTED" : {
      return {...state, fetching: false, error: action.payload};
    }
    case "FETCH_STATE_FULFILLED" : {
      return {...state, fetching: false, fetched: true, markovState: action.payload}
    }
    case "ADD_STATE" : {
      state.bonds.push(action.payload);
      return {...state};
    }
    default : {
      return {...state};
    }
  }
}
