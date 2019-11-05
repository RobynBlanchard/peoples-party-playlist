<!-- TODO; -->
<!-- when adding a song to playlist from search that is already there, inform the user -->
<!-- mobile nav -->
<!-- make + button look like it has been clicked on search page -->
<!-- move tracks that get played into new playlist -->
<!-- re-use comonent for auth button for mobile and desktop -->
<!-- when resuming playbacl don't start from beginning of song -->
<!-- search plus button - make look responsive -->
<!-- use variables for colors etc. -->
<!-- animate track focus effect for 5s only  -->
<!-- when get currently playing check playlist is the same -->
<!-- move nav to container -->
<!-- get import png files working -->


<!-- go to /invite -->
<!-- drop cookie with user id -->

<!-- add to playlist -->
<!-- post to spotify -->
<!-- post to db - track with 0 votes -->

<!-- up votr -->
<!-- post to db -->


<!-- all interactions via new api -->
<!-- poll db for updated playlist votes -->


<!-- ------------------------ -->
<!-- limit to 5 votes -->
<!-- only allow vote with user id -->
<!-- maybe after sign in generae invite link -->
<!-- websocket -->
<!-- remove track if -5 votes -->


<!-- add to playlist action -->
  <!-- // TODO: currently fetching playlist to work out new position of track
  // instead of looking at db, look at state

  // can't fetch sorted and with votes gte to votes/ 0, as tracks with similar votes wil be indeterminate -->


<!-- add last updated/timestamp to track -> to get css to high;ighted -->
<!-- when updating vote update timestamp -->
<!-- fix playback and locked trsck -->
<!-- debounce on click -->

<!-- TODO
 -->
 <!-- if spotify call fails then don't do stuff -->
 <!-- limits votes per user -->
 <!-- remove when -5 votes -->
 <!-- sort by updated at after num votes instead of alphabetically -->
 <!-- investogate specifying uris for playback - https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/ -->
 <!-- sockets -->
<!-- add models -->


<!-- fetch playlist from spotify and db every 5mins and check order matches -->

<!-- if network error -> sho oops somethign ent wrong , try logging in again -->


<!-- Persist session started! -->

<!-- if order outof date then fetch from db, sort then post whole playlist to spotify -->


<!-- TO MAKE it eay to fetch from db and sort -->
<!-- tracks updated earlier - will be higher up playlist -->
<!-- to make tracks downvoted be prioritised in the opposite way -->
<!-- would require position to be stored in the database instead -->

<!-- fix highlight not working when vote on track twice -->


<!-- not needed -->
<!--   let newPosition = currentPlaylist.findIndex(el => {
    // (el.votes === track.votes && el.updatedAt < track.updatedAt) || el.votes < track.votes
    el.votes < track.votes;
  }) -->
  <!-- let newPosition = currentPlaylist.findIndex(el => {
    // return (el.votes === updatedTrack.votes && el.updatedAt > updatedTrack.updatedAt) || el.votes < updatedTrack.votes
    return el.votes < updatedTrack.votes
  }) -->

<!-- remove track -->
  <!-- cant add song already on -->
  <!-- limit 5 per person -->
  <!-- every 5 mins check db aligns with spotify -->
  <!-- production build -->
  <!-- tests -->
  <!-- end session and pause playback when end of playlist -->
  <!-- improve search -->
  <!-- prop types -->

  <!-- set up from scratch -->
  <!-- need client id in dotenv -->
  <!-- https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-os-x/ -->
  <!-- mongo db connection -->
  <!-- install mongo db -->
  <!-- mongo db set up db -->

  <!-- TODO: - handle db connection errors -->
  <!-- if load search page first, fetch playlist once -->
  <!-- storybook -->


  <!-- make user go to /invite -->

  <!-- debounde -->
  <!-- mobile first -->
  <!-- prop types -->
  <!-- fix file loader for images -->
  <!-- set up - HMR for reducers -->
  <!-- use styled components theme -->