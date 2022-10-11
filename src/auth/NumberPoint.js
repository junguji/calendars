export default (value) => {
  let num = value;
  num = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return num;
};
