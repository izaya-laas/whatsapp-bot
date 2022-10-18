let operatorActive = true;

const stopBot = () =>{
  operatorActive = false;

  setTimeout(()=>{
    reanudeBot();
  }, 60000) 
}

const reanudeBot = () =>{
  operatorActive = true;
}

export { operatorActive, stopBot, reanudeBot}