/*
char (uppercase) |A |W |S |E |D |F |T |G |Y |H |U |J |K |O |L |P |
------------------------------------------------------------------
index            |0 |1 |2 |3 |4 |5 |6 |7 |8 |9 |10|11|12|13|14|15|
------------------------------------------------------------------
                 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
                 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
                 |  |__|  |__|  |  |__|  |__|  |__|  |  |__|  |__|
                 |____|____|____|____|____|_____|____|____|____|___
                                                
*/

const chars = ['A','W','S','E','D','F','T','G','Y','H','U','J','K','O','L','P'];
  
function keyIndexFromChar(char: string) : number | boolean {
  const noteIndex = chars.indexOf(char);
  return noteIndex !== -1 && noteIndex;
}
  
export default keyIndexFromChar;