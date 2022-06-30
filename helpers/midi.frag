ivec2 midiCoord(int offset)
{
    int x = offset % 32;
    int y = offset / 32;
    return ivec2(x,y);
}

float setMidi(int ccNumber){
  vec4 val = texture(midi1, vec2((1./32.) * midiCoord(3 * 127 + ccNumber)));
  return val.r;
}

//USAGE EXAMPLE
#define ZOOM setMidi(16)
#define MOD setMidi(17)
#define MIX1 setMidi(18)
#define DISTANCE setMidi(19)
#define FADE_OUT setMidi(23)
