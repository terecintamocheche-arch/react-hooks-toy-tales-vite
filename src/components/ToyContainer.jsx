
import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onLikeToy }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          onLikeToy={onLikeToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
