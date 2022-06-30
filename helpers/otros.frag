#define PI 3.1415926538

float bpm(float bpm, float q, float intensity){
    // Adaptacion de funcion creada por Char Stiles
    // La idea es generar una funcion que sirva como especie de metronomo.
    // Devuelve un valor entre 0 y 1
    // para visualizar bpm https://www.desmos.com/calculator/6lvbxrudxu
 float bps = 60./bpm; // beats por segundo
 float bpmVis = tan((time*PI/q)/bps);
 return max(min(abs(bpmVis),1.),0.) * intensity; 
}
