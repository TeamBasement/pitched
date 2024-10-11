interface Note {name: string, pitch: number}

/** Identifies the nearest note to the pitch. */
const nearestNote = (pitch: number): Note => {
  const notes = [
    { name: 'C', pitch: 261.63 },
    { name: 'C#', pitch: 277.18 },
    { name: 'D', pitch: 293.66 },
    { name: 'D#', pitch: 311.13 },
    { name: 'E', pitch: 329.63 },
    { name: 'F', pitch: 349.23 },
    { name: 'F#', pitch: 369.99 },
    { name: 'G', pitch: 392.00 },
    { name: 'G#', pitch: 415.30 },
    { name: 'A', pitch: 440.00 },
    { name: 'A#', pitch: 466.16 },
    { name: 'B', pitch: 493.88 }
  ];

  let closestNote = notes[0];
  let minDifference = Math.abs(pitch - closestNote.pitch);

  for (const note of notes) {
    const difference = Math.abs(pitch - note.pitch);
    if (difference < minDifference) {
      closestNote = note;
      minDifference = difference;
    }
  }

  return closestNote;
}
