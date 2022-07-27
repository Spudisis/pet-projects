const getDateNew = (day) => {
  let dateTime = new Date().toLocaleString().slice(0, 10);
  if (day !== 0) {
    let dat = new Date();
    dat.setDate(dat.getDate() + 1);
    dateTime = dat.toLocaleString().slice(0, 10);
  }
  return dateTime;
};
