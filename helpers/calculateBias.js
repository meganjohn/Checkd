const axios = require('axios');
const qs = require('query-string');

/* 
* perform political bias analysis using  
* thebipartisanpress api on the provided
* input 'article'
*/
const calculateBias = async (article) => {
  const body = {
    API: process.env.API_KEY_BI,
    Text: article
  };
  const config = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  };
  try {
    const response = await axios.post("https://api.thebipartisanpress.com/api/endpoints/beta/robert", qs.stringify(body), config);
    const {direction, degree} = translateBias(response.data);
    return {direction, degree}
  } catch (error) {
    return {error}
  }
}

/* 
* translate bias (a number between 42 and -42)
* to a political bias direction and degree
*/
const translateBias = (bias) => {
  let direction;
  let degree;
  direction = (bias > 0 ? "right" : "left");
  if (Math.abs(bias) > 31.5) {
    degree = "extreme";
  } else if (Math.abs(bias) > 21) {
    degree = "strong";
  } else if (Math.abs(bias) > 10.5) {
    degree = "moderate";
  } else {
    degree = "minimal";
  }
  return {
    direction,
    degree
  }
}

module.exports = calculateBias