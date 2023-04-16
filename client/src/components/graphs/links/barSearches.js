import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';

function Searchesbarchart({searches}) {
    const [xaxis, setXAxis] = useState("")
    const [yaxis, setYAxis] = useState("")
    
    useEffect(() => {
        var result = []
        searches.forEach((d) => {
          result.push(d.title)
        })
        const counts = {};
        result.forEach((value) => {
          if (counts[value]) {
            counts[value]++;
          } else {
            counts[value] = 1;
          }
        });
        const results = Object.entries(counts).map(([value, count]) => ({ value, count }));
        let xaxis = [];
        let yaxis = [];
        results.forEach((obj, i) => {
        xaxis.push(obj.value)
        })
        results.forEach((obj, i) => {
          yaxis.push(obj.count)
        })
        setXAxis(xaxis)
        setYAxis(yaxis)
    },[searches])


    const options = {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: xaxis,
        },
        colors: ['#0284C7'],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            borderRadiusApplication: 'around',
            borderRadiusWhenStacked: 'last',
            distributed: false,
            rangeBarOverlap: true,
            rangeBarGroupRows: false,
            columnWidth: '90%',
            endingShape: 'cylinder',
            dataLabels: {
                position: 'top',
                maxItems: 100,
                hideOverflowingLabels: true,
                orientation: 'horizontal',
                total: {
                  enabled: false,
                  formatter: undefined,
                  offsetX: 0,
                  offsetY: 0,
                  style: {
                    color: '#373d3f',
                    fontSize: '12px',
                    fontFamily: undefined,
                    fontWeight: 600
                  }
                }
            }
          },
        },
      };
    
      const series = [
        {
          name: 'Searches Done',
          data: yaxis,
        },
      ];

  return (
    <div className='w-full max-w-lg h-100 p-3 rounded bg-white border-neutral-300 shadow-lg'>
        <h1 className='mb-2 font-bold text-center text-xl text-sky-700'>
            Searches by Type
        </h1>
        <p className='text-center text-sm'>
        Total number of searches performed based on the type of search.
        </p>
      <Chart 
      className="cursor-pointer"
      options={options} series={series} type='bar' height={350} />
    </div>
  )
}

export default Searchesbarchart