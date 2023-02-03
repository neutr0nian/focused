import { scaleBand, scaleLinear } from 'd3';
import React from 'react'
import Bars from './Bars';
import XAxis from './XAxis';
import YAxis from './yAxis';

const BarChart = ({data}) => {
  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 700 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;


  const scaleX = scaleBand().domain(data.map(d => d.label)).range([0, width]).padding(0.5)
  const scaleY = scaleLinear().domain([0, Math.max(...data.map(({value}) => value))]).range([height, 0]);

  return (
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <XAxis scale={scaleX} transform={`translate(0, ${height})`} />
        <YAxis scale={scaleY} />
        <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
      </g>
    </svg>
  );
}

export default BarChart