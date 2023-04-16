import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';

function Searchesbarchart({projects}) {
    const [xaxis, setXAxis] = useState("")
    const [yaxis, setYAxis] = useState("")
    
    useEffect(() => {
        var result = []
        console.log(projects)
        projects.forEach((d) => {
          result.push(d.name)
        })
        const counts = {};
        result.forEach((value) => {
            projects.forEach((d) => {
              if(value === d.name){
                counts[value] = d.searches.length
              }
            })
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
    },[projects])

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
          name: 'Open Projects',
          data: yaxis,
        },
      ];

  return (
    <div className='w-full max-w-lg h-fit p-3 rounded bg-white border-neutral-300 shadow-lg'>
        <h1 className='mb-2 font-bold text-center text-xl text-sky-700'>
            Searches by Project
        </h1>
        <p className='text-center text-sm'>
        Total number of searches conducted per project.
        </p>
      <Chart 
      className="cursor-pointer"
      options={options} series={series} type='bar' height={350} />
    </div>
  )
}

export default Searchesbarchart