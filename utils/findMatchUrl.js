const stringSimilarity = require('string-similarity')

module.exports = {

  findMatchUrl: (searchText, searchResultsArray) => {
    const ratings = stringSimilarity.findBestMatch(searchText, searchResultsArray);
    return searchResultsArray[ratings.bestMatchIndex];
  }

}