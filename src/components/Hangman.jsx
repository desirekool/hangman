
// type partsProps = {layer: string, zIndex: number, show: boolean};
const Part = ({layer, zIndex, show} ) => {
  return <img 
    style={{zIndex, opacity: show ? 1 : 0}} 
    className="absolute object-contain" src={`/hangman-layers/${layer}.png`} 
  />
};

const Hangman = ({stage}) => {
  
  return <div className="relative w-full max-w-[400] h-full flex items-center">
    <Part layer="face-0" zIndex={100} show={stage >= 1} />
    <Part layer="torso" zIndex={90} show={stage >= 2}/>
    <Part layer="arms" zIndex={80} show={stage >= 3}/>
    <Part layer="legs" zIndex={80} show={stage >= 4}/>
    <Part layer="rope" zIndex={20} show={stage >= 5}/>
    <Part layer="face-1" zIndex={110} show={stage >= 6}/>
    <Part layer="platform" zIndex={30} show={stage >= 0}/>
  </div>  
};

export default Hangman;