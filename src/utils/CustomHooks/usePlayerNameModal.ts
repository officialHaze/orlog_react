import { useEffect, useState } from "react";

export default function usePlayerNameModal() {
  const [displayNameInputModal, toDisplayNameInputModal] = useState(false);

  useEffect(() => {
    toDisplayNameInputModal(true);

    return () => toDisplayNameInputModal(false);
  }, []);

  return { displayNameInputModal, toDisplayNameInputModal };
}
