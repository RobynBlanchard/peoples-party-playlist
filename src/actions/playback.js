import {
  START_SESSION,
  RESUME_PLAYBACK,
  RESUME_PLAYBACK_SUCCESS,
  RESUME_PLAYBACK_FAILURE,
  PAUSE_PLAYBACK,
  PAUSE_PLAYBACK_SUCCESS,
  PAUSE_PLAYBACK_FAILURE,
  GET_CURRENTLY_PLAYING,
  GET_CURRENTLY_PLAYING_SUCCESS,
  GET_CURRENTLY_PLAYING_FAILURE
} from './types';
import spotifyApi from '../api';
import { playlistId } from '../utils/constants';
import { spotifyOffset } from './playlist';

export const startSession = () => {
  return {
    type: START_SESSION,
    payload: true
  };
};

function sendSocketMessage(action) {
  return {
    handler: 'WS',
    ...action
  };
}


export const resumePlaybackSpotify = (playbackPosition, playlistIndex) => ({
  types: [RESUME_PLAYBACK, RESUME_PLAYBACK_SUCCESS, RESUME_PLAYBACK_FAILURE],
  callAPI: token =>
    spotifyApi(token).put('me/player/play', {
      context_uri: `spotify:playlist:${playlistId}`,
      offset: { position: playlistIndex },
      position_ms: playbackPosition
    }),
  // wsHandler: [RESUME_PLAYBACK_SUCCESS, RESUME_PLAYBACK_FAILURE]
});

export const resumePlayback = () => (dispatch, getState) => {
  const playbackPosition = getState().playback.progress_ms;
  
  if (!getState().session.sessionStarted) {
    const playlist = getState().playlists.playablePlaylist;

    dispatch(sendSocketMessage(startSession()));

    spotifyOffset().then(offset => {
      dispatch(resumePlaybackSpotify(playbackPosition, offset)).then( res => {
        dispatch(updateTrack(playlist[0].uri, {
          $set: { locked: true }
        }))
      })
    })

  } else {
    spotifyOffset().then(offset => {
      dispatch(resumePlaybackSpotify(playbackPosition, offset - 1))
      // - 1 for locked track
    })
  }



  // console.log('RESUME PLAYBACK')
  // const playbackPosition = getState().playback.progress_ms;
  // const playlist = getState().playlists.newPlalist;

  // if (!getState().session.sessionStarted) {
  //   dispatch({type: 'GET_CURRENTLY_PLAYING_SUCCESS', payload: {
  //     response: {
  //       data: {
  //         progress_ms: '',
  //         item: {
  //           uri: playlist[0].uri,
  //           artists: playlist[0].artist,
  //           name: playlist[0].name,
  //         }
  //       }
  //     }
  //   }})
  //     dispatch(updateTrack(playlist[0].uri, {locked: true}));
  //     dispatch(sendSocketMessage({type: 'REMOVE_TRACK_SUCCESS', payload: 0}));
  //     dispatch(sendSocketMessage(startSession()));
  //     dispatch(resumePlaybackSpotify(playbackPosition))

  // }
  // dispatch(resumePlaybackSpotify(playbackPosition))

  // dispatch(resumePlaybackSpotify(playbackPosition)).then(data => {
  //   if (!getState().session.sessionStarted) {
  //     dispatch(sendSocketMessage(startSession()));
  //     dispatch({type: 'GET_CURRENTLY_PLAYING_SUCCESS', payload: {
  //       response: {
  //         data: {
  //           progress_ms: '',
  //           item: {
  //             uri:,
  //             artists: [],
  //             name:
  //           }
  //         }
  //       }

  //     }})
  //   }
  // });
};
export const pausePlayback = () => ({
  types: [PAUSE_PLAYBACK, PAUSE_PLAYBACK_SUCCESS, PAUSE_PLAYBACK_FAILURE],
  callAPI: token => spotifyApi(token).put('me/player/pause')
});

export const getCurrentlyPlayingTrackSpotify = () => ({
  types: [
    GET_CURRENTLY_PLAYING,
    GET_CURRENTLY_PLAYING_SUCCESS,
    GET_CURRENTLY_PLAYING_FAILURE
  ],
  callAPI: token => spotifyApi(token).get('me/player/currently-playing')
});


import { updateTrack } from './playlist';
// export const getCurrentlyPlayingTrack = ()  => (dispatch, getState) => {
//   dispatch(getCurrentlyPlayingTrackSpotify()).then(resp => {
//     // if (resp) {
//       // TODO: figure out why no resp reutrned
//     debugger;
//       // if (resp.type === 'GET_CURRENTLY_PLAYING_SUCCESS') {
//         const state = getState();

//         const previousCurrentlyPlayingTrack = state.playback.currentTrack.uri
//         const currentlyPlayingTrack = resp.payload.response.data.item.uri;

//         // console.log('previousCurrentlyPlayingTrack', previousCurrentlyPlayingTrack)
//         // console.log('currentlyPlayingTrack', currentlyPlayingTrack)
//         if (previousCurrentlyPlayingTrack !== currentlyPlayingTrack) {
//           debugger;
//           console.log('new currently playinh track')
//           dispatch(updateTrack(previousCurrentlyPlayingTrack, { $set: {removed: true} }));
//           dispatch(updateTrack(currentlyPlayingTrack,{$set: { locked: true }}));
//         // }
//           // TODO: dispatch remove track from playlisst state

//           // update with removed true also
//           // return dispatch({ type: 'REMOVE_TRACK_SUCCESS', payload: 0 }).then(resp => {
//           //   console.log('set currently playing track as locked in db')
//           //   return dispatch(updateTrack(currentlyPlayingTrack,{
//           //     $set: { locked: true }
//           //   }));

//           // })

//           // might aswell say removed true ?
//         // }

//         // if track,ocked is flse then lock it
//       }
//     // }
//   })
// }

//


export const getCurrentlyPlayingTrack = () => (dispatch, getState) => {
  const state = getState();
  const previousCurrentlyPlayingTrack = state.playback.currentTrack.uri

    dispatch(getCurrentlyPlayingTrackSpotify()).then( action => {
      const curPlaying = action.payload.response.data.item;
      if (action.type === 'GET_CURRENTLY_PLAYING_SUCCESS') {
        // TODO: if item is null then alert / log
        if (curPlaying) {


        // const previousCurrentlyPlayvingTrack = state.playback.currentTrack.uri
        const currentlyPlayingTrack = curPlaying.uri;

        if (previousCurrentlyPlayingTrack !== currentlyPlayingTrack) {
          if (previousCurrentlyPlayingTrack) {
            dispatch(updateTrack(previousCurrentlyPlayingTrack, { $set: {removed: true} }));
            dispatch(updateTrack(currentlyPlayingTrack,{$set: { locked: true }}))

          }
          // TODO: remove locally
        }
      }
      }
    })
  


 
}; 