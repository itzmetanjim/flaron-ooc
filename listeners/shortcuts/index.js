import { sampleShortcutCallback } from './sample-shortcut.js';
import { oocReveal } from './ooc-reveal.js';

export const register = (app) => {
  app.shortcut('sample_shortcut_id', sampleShortcutCallback);
  app.shortcut('ooc_reveal', oocReveal);
};
