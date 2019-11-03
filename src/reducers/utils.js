// fetch tracks
// delete track
// add track
// update track
// update trackError
// 

// Reducer
export default function asyncReducer(state, action={}) {
    const { storePath, data } = action;
    const fetchState = {
      fetching: false,
      error: false,
      data: null,
    };
    switch (action.type) {
      case REQUEST:
        fetchState.fetching = true;
        fetchState.error = false;
      case SUCCESS:
        fetchState.fetching = false;
        fetchState.error = false;
        fetchState.data = data;
      case ERROR:
        fetchState.fetching = false;
        fetchState.error = true;
   }
   // Replace the current state at `storePath` with the new
   // computed `fetchState`.
   return {
      ...state,
      [storePath]: {
        ...state[storePath],
        ...fetchState,
      }
    };
  }
  // 

  reducer(tracks, { action.payload.position, action.payload.data, action.payload.type})


//   create
// read
// delete
// update

// fetch tracks
// asyncReducer(state)

create(position, track)
// asyncReducer(state, {action.payload.position})

read() // return tracks
update(position, track)
delete(position, track)

// tracks: {
//     1: {
//         loading,
//         error
//         data
//     },
//     2: 
//     3: 
// }


// const updateSuccess = (tracks, position, newTrack) => {
//     return {
//         ...tracks,
//         [position]: newTrack
//     }
// }

// // const removeKey = (key, {[key]: _, ...rest}) => rest;

// const deleteSuccess = (tracks, position) => {
//     const { position, ...newTracks } = tracks;
//     return newTracks;
// }

// const createSuccess = (track, position) => {

// }

// store tracks as array in order
// pointless passing position with these if mapping over anyway?

const createSuccess = (tracks, position, newTack) => {
    let newTracks = tracks.slice()
    newTracks.splice(position, 0, newTack)
    return newTracks
}

const updateSuccess = (tracks, position, newTrack) => {
    return tracks.map((track, index) => index === position ? newTrack : track);
}

const deleteSuccess = (tracks, position) => {
    return tracks.filter((track, index) => track !== index);
}

const operation = {
    DELETE: deleteSuccess,
    UPDATE: updateSuccess
}

switch(action.type) {
    case REQUEST:
        return tracks.map((track, index) => index === position ? {...track, loading: true } : track);
    case FAILURE:
        return tracks.map((track, index) => index === position ? {...track, loading: false, error: error } : track);
    case SUCCESS: 
        return operation[action.type](tracks)
    // etc.
}

// store as index


