const PAGE_SIZE = 20;
module.exports = {
  PAGE_SIZE
}
const listColor = ["white","red","black","yellow","green","blue","violet"]
module.exports.renderListColorProducts = () => {
  const setColor = new Set();
  while(true){
    const index = Math.ceil(Math.random()*(listColor.length - 1));
    setColor.add(listColor[index]);
    if(setColor.size === 3){
      return Array.from(setColor);
    }
    
  }
}