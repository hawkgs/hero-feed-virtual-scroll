import { HeroMessage } from '../model/hero-message';

const Padding = 24 * 2;
const NameHeight = 21;
const DateHeight = 14;
const MessageMarginTop = 14;
const MessageRowHeight = 24;
const MessageRowCharCount = 35;
const TagsMarginTop = 16;
const TagsRowHeight = 36;
const TagsPerRow = 3;

export const heroMessageHeightPredictor = (m: HeroMessage) => {
  const textHeight =
    Math.ceil(m.text.length / MessageRowCharCount) * MessageRowHeight;

  const tagsHeight = m.tags.length
    ? TagsMarginTop + Math.ceil(m.tags.length / TagsPerRow) * TagsRowHeight
    : 0;

  return (
    Padding +
    NameHeight +
    DateHeight +
    MessageMarginTop +
    textHeight +
    tagsHeight
  );
};
