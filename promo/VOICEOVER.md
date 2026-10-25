# Voice-over

Script lives in `src/config.ts` (`voiceScript`). Record or generate one file per scene and save as
`public/voiceover/s1.mp3` … `s13.mp3`. Each plays 0.2s after its scene starts; missing files are skipped.

Keep each take shorter than its scene (s1 3s, s2 3s, s3 6s, s4 3s, s5 6s, s6 6s, s7 3s, s8 9s, s9 4s, s10 14s, s11 3s, s12 8s, s13 3s).
Scene lengths/cues can be changed in `config.ts` to match your recording.
