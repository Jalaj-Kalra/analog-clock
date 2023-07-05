import React, { memo } from 'react'

interface ClockProps {
    minuteRatio: number;
    secondRatio: number;
    setSecond: React.Dispatch<React.SetStateAction<number>>;
    setMinutes: React.Dispatch<React.SetStateAction<number>>;
}

type ClockType = "SECONDS" | "MINUTES";

const Clock: React.FC<ClockProps> = ({ minuteRatio, secondRatio,setSecond, setMinutes}) => {

    const rotateHand = (event: any, clockType: ClockType)=>{
        const elem = event.target;
        elem.style.cursor = "grabbing";
        let rotating = true;
        const radius = 500 / 2;
        const rotateHandler = (e:any)=>{
            const radians = Math.atan2(e.pageX - radius, e.pageY - radius);
            let rotateDegrees = (radians * (180 / Math.PI) * -1) - 180;
            if (rotating && clockType==="SECONDS") {
                setSecond(rotateDegrees);
            }else if(rotating && clockType==="MINUTES"){
                setMinutes(rotateDegrees);
            }
        };
        document.addEventListener("mousemove", rotateHandler);
        const cancelRotate = ()=>{
            elem.style.cursor = "grab";
            rotating = !rotating;
            document.removeEventListener("mousemove", rotateHandler);
            document.removeEventListener("mouseup", cancelRotate);
    
        };
        document.addEventListener("mouseup", cancelRotate);
    };

    return (
        
      <div className="clock">
        <div className="hand minute"style={{transform: `translate(-50%) rotate(${minuteRatio * 360}deg)`}} onMouseDown={(e)=>rotateHand(e, "MINUTES")}></div>
        <div className="hand second"style={{transform: `translate(-50%) rotate(${secondRatio * 360}deg)`}} onMouseDown={(e)=>rotateHand(e, "SECONDS")}></div>
        
        <div className="number number3"><div>3</div></div>
        <div className="number number6"><div>6</div></div>
        <div className="number number9"><div>9</div></div>
        <div className="number number12"><div>12</div></div>
    </div>
    
    )
    
}


export default memo(Clock);