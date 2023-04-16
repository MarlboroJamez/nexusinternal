import React, { useEffect, useRef, useState } from 'react'
import Chart from 'react-apexcharts';

function Searchesbarchart({searches}) {
    const [xaxis, setXAxis] = useState("")
    const [yaxis, setYAxis] = useState("")
    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const containerRef = useRef(null);
  
    useEffect(() => {
      const handleResize = () => {
        if (containerRef.current) {
          const container = containerRef.current;
          const containerWidth = container.offsetWidth;
          const windowHeight = window.innerHeight;
          const containerHeight = windowHeight * 0.35; // Set container height to 60% of window height
          setContainerWidth(containerWidth);
          setContainerHeight(containerHeight);
        }
      };
    
      handleResize();
    
      window.addEventListener('resize', handleResize);
    
      return () => window.removeEventListener('resize', handleResize);
    }, []);

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
    <div className='w-full aspect-w-1 aspect-h-1 p-3 rounded bg-white border border-neutral-300 shadow-lg' ref={containerRef}>
        <h1 className='mb-2 font-bold text-center text-xl text-sky-700'>
            Searches by Type
        </h1>
        <p className='text-center text-sm'>
        Total number of searches performed based on the type of search.
        </p>
        <Chart 
          className="cursor-pointer"
          options={options} 
          series={series} 
          type='bar' 
          width={containerWidth} 
          height={containerHeight}/>

    </div>
  )
}

export default Searchesbarchart