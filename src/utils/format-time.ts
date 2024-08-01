
export const formatTime = (timeInSeconds:number) => {
    const seconds = Math.floor(timeInSeconds % 60);
    const minutes = Math.floor((timeInSeconds / 60) % 60);
    // const hours = Math.floor((timeInSeconds / 3600) % 24);
    // const days = Math.floor(timeInSeconds / (3600 * 24));
  
    let formattedTime = "";
  
    // if (days > 0) {
    //   formattedTime += `${days} Day${days > 1 ? "s" : ""} `;
    // }
  
    // formattedTime += `${hours} : `;
    formattedTime += `${minutes}:`;
    formattedTime += `${seconds<=9?"0":""}${seconds}`;
  
    return formattedTime.trim();
  };