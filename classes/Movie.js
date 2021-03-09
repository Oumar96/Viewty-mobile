/**
 *
 * @param {String} name
 * @param {String} description
 * @param {Number} likes
 * @param {String} poster
 * @param {Number} votes
 * @param {String} wikipedia
 * @param {String} youtube
 * @returns {Movie}
 */

function Movie({
  name = null,
  description = null,
  likes = 0,
  poster = null,
  votes = 0,
  wikipedia = null,
  youtube = null,
}) {
  this.name = name;
  this.description = description;
  this.likes = likes;
  this.poster = poster;
  this.votes = votes;
  this.wikipedia = wikipedia;
  this.youtube = youtube;
}

export default Movie;
