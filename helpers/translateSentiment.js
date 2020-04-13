const translateSentiment = (score) => {
  let sentiment;
  if(score < -2){
    sentiment = 'very negative';
  } else if(score < 0) {
    sentiment = 'negative';
  } else if (score > 2) {
    sentiment = 'very postive';
  } else if(score > 0) {
    sentiment = 'positive';
  } else {
    sentiment = 'neutral';
  }
  return sentiment;
}

module.exports = translateSentiment;
