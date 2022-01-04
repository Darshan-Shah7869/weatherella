const convertime = (seconds) => {
  let output;

  if (seconds * 1000 < 36000) {
    output = new Date(seconds * 1000).toLocaleString().split(",")[1];
  } else {
    output = new Date(seconds * 1000).toLocaleString().split(",")[1];
  }

  return output;
};

export default convertime;
