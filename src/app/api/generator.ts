import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
} from 'unique-names-generator';
import { LoremIpsum } from 'lorem-ipsum';
import { HeroMessage } from '../model/hero-message';

const randomNum = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

export const generateMessages = (size: number): HeroMessage[] => {
  const lorem = new LoremIpsum({
    wordsPerSentence: {
      max: 10,
      min: 4,
    },
  });

  return new Array(size)
    .fill(null)
    .map(() => ({
      name: uniqueNamesGenerator({
        dictionaries: [adjectives, colors, names],
        length: 2,
        style: 'capital',
        separator: ' ',
      }),
      date: new Date(randomNum(2015, 2023), randomNum(0, 11), randomNum(1, 30)),
      text: lorem.generateSentences(1),
      tags: new Array(randomNum(0, 1) ? randomNum(0, 5) : 0)
        .fill(null)
        .map(() => uniqueNamesGenerator({ dictionaries: [colors], length: 1 })),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
};
