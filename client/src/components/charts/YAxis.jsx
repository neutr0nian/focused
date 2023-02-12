import { axisLeft, select } from 'd3';
import React, { useEffect, useRef } from 'react'

const YAxis = ({scale}) => {
    const ref = useRef(null);
    useEffect(() => {
        if(ref.current){
            select(ref.current).call(axisLeft(scale));
        }
    }, [scale])

  return <g ref={ref} />
}

export default YAxis