import { NOTES } from "./data";

interface Note {
  name: string;
  pitch: number;
}

/** Identifies the nearest note to the pitch. */
export const nearestNote = (pitch: number): Note => {
  let closestNote = NOTES[0];
  let minDifference = Math.abs(pitch - closestNote.pitch);

  for (const note of NOTES) {
    const difference = Math.abs(pitch - note.pitch);
    if (difference < minDifference) {
      closestNote = note;
      minDifference = difference;
    }
  }

  return closestNote;
};
