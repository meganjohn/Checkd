const translateSentiment = (score) => {
  let sentiment;
  if(score < 0) {
    sentiment = 'negative';
  } else if(score > 0) {
    sentiment = 'positive';
  } else {
    sentiment = 'neutral';
  }
  return sentiment;
}

module.exports = translateSentiment;
