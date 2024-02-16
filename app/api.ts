/** @format */

import type { Card, Result, Guess } from "./types";

export const getCardData = async (cardName: string): Promise<Card | null> => {
  try {
    const response = await fetch(
      `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
        cardName
      )}`
    );
    if (!response.ok) {
      throw new Error(`Erro de rede: ${response.status}`);
    }
    const data = await response.json();
    return {
      name: data.name,
      setName: data.set_name,
      rarity: data.rarity,
      manaCost: data.mana_cost,
      cardType: data.type_line,
      colorIdentity: data.color_identity.join(""),
      imageUrl: data.image_uris?.normal || "",
    };
  } catch (error) {
    console.error("Erro ao obter dados da carta:", error);
    return null;
  }
};
