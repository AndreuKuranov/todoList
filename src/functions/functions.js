export const uniqueId = () => {
  const random = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

  return `${random()}${random()}-${random()}-${random()}-${random()}-${random()}${random()}${random()}`
}

export const ranksNumber = (n) => {
  return String(n).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
