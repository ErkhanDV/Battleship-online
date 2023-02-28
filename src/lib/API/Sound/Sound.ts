const Sound = (sound: string) => {
  const audio = new Audio();
  audio.src = `../../../../public/mp3/${sound}.mp3`;
  audio.play();
};

export default Sound;
