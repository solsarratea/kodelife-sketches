//DIETHER EFFECT CUSTOMIZE WITH MIDI CONTROLLER
#define PI  3.1415926535897931
#define GOLDEN_ANGLE 2.39996
const mat4 ditherTable = mat4(
    -4.0, 0.0, -3.0, 1.0,
    2.0, -2.0, 3.0, -1.0,
    -3.0, 1.0, -4.0, 0.0,
    3.0, -1.0, 2.0, -2.0
);

#define COLOR_FACTOR mix(1.,20.,setMidi(3))
#define SIZEX mix(1.,100,setMidi(2))
//+sin(time*1+inData.v_texcoord.x*2.))
#define SIZEY mix(1.,100.,setMidi(1))
#define DIETHERAMNT mix(0.,2.,setMidi(4))


vec3 diether(sampler2D channel,vec2 posN){
  vec2 size = vec2(SIZEX, SIZEY);
  vec2 coor = floor(posN * size);
  vec2 uv = coor / size;
  vec3 color = texture(channel, uv).xyz;
  color += ditherTable[int( coor.x ) % 4][int( coor.y ) % 4] * DIETHERAMNT;

  return floor(color * COLOR_FACTOR) / COLOR_FACTOR;

}

//Example of use:     vec3 d  = diether(cam, uvN.xy);

//////////////////////////////////////////////////////
// OUTLINE BORDER

vec3 outline(sampler2D tex, vec2 posN){
    float h =  0.01;
    float w =  0.01;
    vec4 p0 = texture(tex, posN + vec2( -w, -h));
    vec4 p1 = texture(tex, posN + vec2(0.0, -h));
    vec4 p2 = texture(tex, posN + vec2(  w, -h));
    vec4 p3 = texture(tex, posN + vec2( -w, 0.0));
    vec4 p4 = texture(tex, posN);
    vec4 p5 = texture(tex, posN + vec2(  w, 0.0));
    vec4 p6 = texture(tex, posN + vec2( -w, h));
    vec4 p7 = texture(tex, posN + vec2(0.0, h));
    vec4 p8 = texture(tex, posN + vec2(  w, h));
    vec4 sobel_edge_h = p2 + (2.0*p5) + p8 - (p0 + (2.0*p3) + p6);
    vec4 sobel_edge_v = p0 + (2.0*p1) + p2 - (p6 + (2.0*p7) + p8);
    vec4 sobel = sqrt((sobel_edge_h * sobel_edge_h) + (sobel_edge_v * sobel_edge_v));
    return sobel.rgb;
}
