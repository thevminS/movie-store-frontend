export function getYouTubeId(url:string){
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = RegExp(regExp).exec(url);
    return (match&&match[7].length==11)? match[7] : false;
}
