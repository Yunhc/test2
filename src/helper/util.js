import OK from "@/assets/sound/OK.mp3";

// sound play
export function PlaySound(type){
	// console.log("PlaySound : type -- ", type);

	var sound = "";
	if (type == "OK"){
		sound = OK;
	}
	var audio = new Audio(sound);
	audio.play();
}