import StartFireBase from '../firebaseConfig';
import "./style.css";
import roundlogo from './roundlogo.png';
import COVID from './COVID.png'
import React from 'react';
import {ref, onValue} from 'firebase/database';
import { Button, Table,form,iframe } from 'react-bootstrap';
import { render } from '@testing-library/react';
import Geocode from "react-geocode";
import Graph from './graph';
const db=StartFireBase();
export class RealtimeData extends React.Component{
    constructor(){
        super();
        this.state={
            value: '',
            phonenumber:[],
            arryofobjectsfordateandtime: [],
            arrayofobjects: [],
            tableData:[],
            tableData_phoneidentifier:[],
            tableData_contactedusers:[],
            setstatefornew: []
        }
        this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {    
    this.setState({value: event.target.value});  }
    handleSubmit(event) {
      event.preventDefault();
    
      this.componentDidMount();
    
    }

    componentDidMount(){
        let phoneno=this.state.value
        console.log("E"+phoneno)
        let uniquevalue=''
        let contacts={}
        let userinfoidentifier=''
        const dbref=ref(db,'user_info')
        let recordsofuserinfo=[];
        onValue(dbref,(snapshot)=>{
           
            snapshot.forEach(childSnapshot => {
                let keyname=childSnapshot.key;
                let data=childSnapshot.val();
                recordsofuserinfo.push({"key":keyname,"data":data})
            });
            this.setState({tableData:recordsofuserinfo});
            
        });
       
        const dbref2=ref(db,'phone_identifier')
        let recordsofphoneidentifier=[];
        onValue(dbref2,(snapshot)=>{
            snapshot.forEach(childSnapshot => {
                let keyname=childSnapshot.key;
                let data=childSnapshot.val();
                recordsofphoneidentifier.push({"key":keyname,"data":data})
            });
            this.setState({tableData_phoneidentifier:recordsofphoneidentifier});
           
            recordsofphoneidentifier.map((row,index)=>{
               if (row.key===phoneno){
                   uniquevalue=row.data.unique_value
               }
               
              
             })
        });
        const dbref3=ref(db,'contacted_users')
        let recordsofcontactedusers=[];
        onValue(dbref3,(snapshot)=>{
            snapshot.forEach(childSnapshot => {
                let keyname=childSnapshot.key;
                let data=childSnapshot.val();
                recordsofcontactedusers.push({"key":keyname,"data":data})
            });
            this.setState({tableData_contactedusers:recordsofcontactedusers});
            recordsofcontactedusers.map((row,index)=>{
                if(row.key===uniquevalue){
                    contacts=row.data
                }
            })
        });
        for (let [key, value] of Object.entries(contacts)) {
            
             userinfoidentifier=key;
             recordsofuserinfo.map((row,index)=>{
                
                if (row.data.unique_value===userinfoidentifier){
                    // console.log("User Name: "+row.data.first_name+" "+row.data.last_name)
                    
                   
                    // console.log("Phone No: "+"0"+row.data.phone_no)
                    console.log(this.state.arrayofobjects)
                   
                    for (let [key1, value1] of Object.entries(value)) {
                        // for (let [key, value2] of Object.entries(value1)) {
                        //     console.log(key+":  "+value2);

                          this.state.arryofobjectsfordateandtime.push(value1)
                           
                        //   }
                        
                         
                      }
                     
                    this.state.phonenumber.push(row.data.phone_no)
                      this.state.arrayofobjects.push({Phoneno: row.data.phone_no,dataanadtime: this.state.arryofobjectsfordateandtime.length})
                      this.state.arryofobjectsfordateandtime=[]
                    }
             
                 
              })
         
          }
   
    

        
    }
    render(){


        return(
          
            <div style={{backgroundimage: {COVID}}}>
          <div style={{marginLeft:'40%',background:'white !important'}}>
              <span style={{float:'left', marginTop:'10px', marginBottom:'10px', width: '100%', justifyContent:'center'}}>
                  <span><img src={roundlogo} style={{width: '7%', marginLeft:'10px', justifyContent:'center',marginTop:"-5px"}} ></img></span>
                  <span style={{marginTop:'10px',marginLeft:'10px',justifyContent:'center', fontSize:'30px', fontWeight:'bolds'}}>Go Safe</span>
              </span>
             
          </div>

          <hr></hr>
<h1 style={{marginLeft:"10px", color:'blue'}}>About Go Safe</h1>
<p style={{marginLeft:"10px", fontWeight:'bold'}}>A contagious disease is a type of disease that spreads from one person to another, either by physical contact or through the spread of pathogens in the air. On a daily basis, one person comes in contact with so many others, some of which might have been exposed to deadly pathogens like COVID-19. For health authorities and concerned authorities, it's a real challenge to keep an account of those individuals who might have been exposed to someone who has been tested positive for the COVID-19 virus. Automated contact tracing aimed to solve this problem. In this project, we will develop an Automated contact tracing App named Go Safe and relevant Dashboards that can be integrated into the current emergency response services of the government.</p>
<p></p>
     
 <span><iframe src={'https://ourworldindata.org/explorers/coronavirus-data-explorer?zoomToSelection=true&region=Asia&facet=none&hideControls=true&Metric=Confirmed+cases&Interval=Cumulative&Relative+to+Population=false&Color+by+test+positivity=false&country=~PAK'} width="50%" height="500px"></iframe></span>
<span><iframe src={'https://ourworldindata.org/explorers/coronavirus-data-explorer?zoomToSelection=true&time=2020-03-01..latest&facet=none&pickerSort=asc&pickerMetric=location&hideControls=true&Metric=Confirmed+deaths&Interval=7-day+rolling+average&Relative+to+Population=true&Color+by+test+positivity=false&country=~PAK'} width="50%" height="500px"></iframe></span>
  <form onSubmit={this.handleSubmit} style={{marginLeft:'30px'}}>
        <label style={{color:'black'}}>
          Phone no :
          <input type="text" value={this.state.value} maxlength="10" onChange={this.handleChange} />        </label>
        <input style={{backgroundColor:'Yellow', border:'0', borderRadius:'12px', height:'30px'}} type="submit" value="Submit" />
      </form>
      
     
       {this.state.arrayofobjects.length >0?
      <Graph data7={this.state.arrayofobjects}/> :""
      }


      <div style={{marginTop:'50px',color:'white', fontSize:'20px', fontWeight:'bold' ,backgroundColor:'black',textAlign:'center\
      '}}>Contact Tracing For Contagious Diseases</div>
          </div>
        )
    }
}
