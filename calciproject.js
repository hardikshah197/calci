let buffer="0";
let runningTot = 0;
let previousOp ;
const screen = document.querySelector(".screen");
function buttonClick(value) {
  if(isNaN(parseInt(value)))
  { handleSymbol(value); }
  else {
    handleNum(value);
  }
  rerender();
}
function handleNum(value) {
  if(buffer === "0")
  { buffer = value; }
  else {
    buffer += value;
  }
}
function rerender() {
    screen.innerText = buffer;
  }
function init() {
    document.querySelector(".calci-buttons").addEventListener("click",function(event) {
    buttonClick(event.target.innerText);
    });
  }
  init();
  function handleMath(value) {
    if(buffer === "0")
    return;
    const intBuffer = parseInt(buffer);
    if(runningTot === 0)
    { runningTot = intBuffer; }
    else {
      flushOp(intBuffer);
    }
    previousOp = value;
    buffer = "0";
  }
  function flushOp(intBuffer) {
    console.log("hey");
    if(previousOp === "+")
    { runningTot += intBuffer; }
    else if (previousOp === "-") {
      runningTot -= intBuffer;
    }
    else if (previousOp === "x") {
      runningTot *= intBuffer;
    }
    else {
      runningTot /= intBuffer;
    }
  }
  function handleSymbol(value) {
    switch(value) {
      case "C":
          buffer = "0";
          runningTot = 0;
          break;
      case "=":
          if(previousOp === null)
          { return; }
          flushOp(parseInt(buffer));
          previousOp = null;
          buffer = "" + runningTot;
          runningTot = 0;
          break;
      case "←":
          if(buffer.length === 1) {
          buffer = "0"; }
          else {
            buffer = buffer.substring(0,buffer.length-1);
          }
          break;
      default:
        handleMath(value);
        break;
    }
  }
