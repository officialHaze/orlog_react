import { useEffect, useState } from "react";
import Player from "../../gamecomponents/Player";

export default function useResolutionPhase() {
  const [roundOverForPlayers, setRoundOverForPlayers] = useState<Player[]>([]); // For each player
  const [startResolutionPhase, toStartResolutionPhase] = useState(false);

  useEffect(() => {
    console.log(roundOverForPlayers);
    // Maximum player is 2, so if rounds are over for both the players
    // start the resolution phase as of now, later it will be replaced by god favor phase
    if (roundOverForPlayers.length >= 2) {
      console.log("starting res phase");
      //   alert("Starting resolution phase!");
      toStartResolutionPhase(true);
    }

    return () => toStartResolutionPhase(false);
  }, [roundOverForPlayers]);

  return { setRoundOverForPlayers, startResolutionPhase, toStartResolutionPhase };
}
