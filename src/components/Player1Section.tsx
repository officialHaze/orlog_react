import React from "react";

interface Props {
  name: string;
}

export default function Player1Section({ name }: Props) {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
