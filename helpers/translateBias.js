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

module.exports = translateBias