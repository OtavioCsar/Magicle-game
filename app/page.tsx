/** @format */

"use client";

import { useState } from "react";
import clsx from "clsx";
import { getCardData } from "./api";
import { CORRECT_CARD } from "./fixtures";

import type { Card, Result, Guess } from "./types";

export default function Home() {
  const [correctCard] = useState(CORRECT_CARD);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<Guess[]>([]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setGuess(e.currentTarget.value);
  };

  const onClick = async () => {
    try {
      const cardData = await getCardData(guess);
      if (cardData) {
        const newGuess: Guess = {
          card: cardData,
          result: {
            setName: cardData.setName === correctCard.setName,
            rarity: cardData.rarity === correctCard.rarity,
            manaCost: cardData.manaCost === correctCard.manaCost,
            cardType: cardData.cardType === correctCard.cardType,
            colorIdentity: cardData.colorIdentity === correctCard.colorIdentity,
          },
        };
        setGuesses((prevGuesses) => [...prevGuesses, newGuess]);
      }
    } catch (error) {
      console.error("Error during click:", error);
    }
  };

  return (
    <main>
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Magicdle
        </h1>
      </div>

      {/* <div className="text-center">
        <img src={SAMPLE_CARD.image_uris.normal} />
      </div> */}

      <div className="w-full max-w-80 mx-auto sm:flex mt-6 sm:items-start sm:justify-between gap-2">
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type a card name"
          value={guess}
          onChange={onChange}
          autoComplete="off"
        />

        <button
          onClick={onClick}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Guess
        </button>
      </div>

      <div className="mt-10">
        {guesses.map((guess, index) => (
          <Guess key={index} {...guess} />
        ))}
      </div>
    </main>
  );
}

function Guess(guess: Guess) {
  const rootClasses = "w-full p-5 rounded-sm text-center";

  return (
    <div className="w-full h-30 max-w-3xl mx-auto mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-5 text-center">
      <div
        className={clsx(
          rootClasses,
          guess.result.setName ? "bg-green-600" : "bg-red-600"
        )}
      >
        {guess.card.setName}
      </div>
      <div
        className={clsx(
          rootClasses,
          guess.result.cardType ? "bg-green-600" : "bg-red-600"
        )}
      >
        {guess.card.cardType}
      </div>
      <div
        className={clsx(
          rootClasses,
          guess.result.rarity ? "bg-green-600" : "bg-red-600"
        )}
      >
        {guess.card.rarity}
      </div>
      <div
        className={clsx(
          rootClasses,
          guess.result.manaCost ? "bg-green-600" : "bg-red-600"
        )}
      >
        {guess.card.manaCost}
      </div>
      <div
        className={clsx(
          rootClasses,
          guess.result.colorIdentity ? "bg-green-600" : "bg-red-600"
        )}
      >
        {guess.card.colorIdentity}
      </div>
    </div>
  );
}
