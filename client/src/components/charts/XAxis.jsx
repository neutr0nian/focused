import { axisBottom, select } from 'd3';
import React, { useEffect, useRef } from 'react'

const XAxis = ({scale, transform}) => {
    const ref = useRef(null);
    useEffect(() => {
        if(ref.current){
            select(ref.current).call(axisBottom(scale));
        }
    }, [scale])

  return <g ref={ref} transform={transform} />
}

export default XAxis;