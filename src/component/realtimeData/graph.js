import {
    Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
 } from 'chart.js'
 import {Bar} from 'react-chartjs-2'
 
 
 const Graph = ({data7}) =>{

   ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)
   const options = {
     responsive: true,
     plugins:{
       legend:{
         position:'top',
       },
       title:{
         display:true,
         text:'meet'
       },
     },
   };
   const labels = data7.map(item => item.Phoneno)
   var data = {
     labels,
     datasets:[
       {
       label: 'contact tracing',
       data: data7.map(item => item.dataanadtime),
       backgroundColor: 'rgba(255, 99, 132, 0.5)',
     },
   
     ]
   }
     return(
         <div className='w-full rounded-xl overflow-hidden shadow-md bg-Sk'>
            <Bar
           data={data}
           options={options}
         />
         </div>
     )
 }
 
 export default Graph