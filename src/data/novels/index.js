import novel1Meta from "./novel1/meta";
import novel2Meta from "./novel2/meta";

import novel1Ch1 from "./novel1/chapters/ch1";
import novel1Ch2 from "./novel1/chapters/ch2";
import novel1Ch3 from "./novel1/chapters/ch3";
import novel1Ch4 from "./novel1/chapters/ch4";
import novel1Ch5 from "./novel1/chapters/ch5";
import novel1Ch6 from "./novel1/chapters/ch6";
import novel1Ch7 from "./novel1/chapters/ch7";
import novel1Ch8 from "./novel1/chapters/ch8";

import novel2Ch1 from "./novel2/chapters/ch1";

import reiki from "./novel1/characters/reiki";
import rathail from "./novel1/characters/rathail";
import shun from "./novel1/characters/shun";
import tsukiko from "./novel1/characters/tsukiko";
import michio from "./novel1/characters/michio";

import karakterA from "./novel2/characters/karakter-a";

export const novels = [
  {
    ...novel1Meta,
    chapters: [
      novel1Ch1,
      novel1Ch2,
      novel1Ch3,
      novel1Ch4,
      novel1Ch5,
      novel1Ch6,
      novel1Ch7,
      novel1Ch8,
    ],
    characters: [reiki, rathail, shun, tsukiko, michio],
  },
  {
    ...novel2Meta,
    chapters: [novel2Ch1],
    characters: [karakterA],
  },
];

export function getNovel(slug) {
  return novels.find((n) => n.slug === slug) ?? null;
}
