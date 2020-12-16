import React, { Component } from 'react';
import { message } from 'antd';
import 'antd/dist/antd.css';
class Index extends Component {
    constructor(props) {
        super()
        this.state={
            id:'',
            startDate:'',
            endDate:'',
            datesObj:{id:'',startDate:'',endDate:''},
            storageArray:[],
            finalArray:[]
        }
    }

    componentDidMount() {
        const appendArray = JSON.parse(localStorage.getItem("appendArray"));   
        this.setState({
            finalArray:appendArray
        })
    }

    onstartDateChange = (e) => {
        this.setState({
            startDate:e.target.value,
            datesObj:{id:this.state.id,startDate:e.target.value,endDate:this.state.endDate},
        }
        )
    }
    onEndDateChange = (e) => {
        this.setState({
            datesObj:{id:this.state.id,startDate:this.state.startDate,endDate:e.target.value},
            endDate:e.target.value
        }
        )
    }
    onIdChange = (e) => {
        this.setState({
            datesObj:{id:e.target.value,startDate:this.state.startDate,endDate:e.target.value},
            id:e.target.value
        })
    }
    onClearClick = () => {
        this.setState({
            startDate:'',
            endDate:'',
            id:''
        })
    }
    
    onAppendClick = () => {
        if(this.state.startDate === '') {
            this.startInfo()
        } else if( this.endDate === '') {
            this.endInfo()
        } 
        let obj = this.state.datesObj
        let newarray = this.state.storagArray
         let objarray= newarray.push(obj)
        this.setState({
            storagArray:objarray,
            startDate:'',
            endDate:'',
            id:''
        })
        localStorage.setItem('appendArray',JSON.stringify(this.state.storagArray))
        this.componentDidMount()
    }
    onRemoveClick = (e) => {
        let array = this.state.finalArray
        let newarray = array.filter(res => {
            return(
                res.id !== e 
            )
        }) 
        localStorage.setItem('appendArray',JSON.stringify(newarray))
        this.componentDidMount()
    }
     startInfo = () => {
        message.warning('Select Start Date First.');
      };
      endInfo = () => {
        message.warning('Select End Date First.');
      };
    render() {
        const {finalArray} = this.state;
        let tableData;
        if(finalArray === null || finalArray === undefined || finalArray.length === 0) {
            <>
                 <tr>
                     <td style={{color:"#fff"}}></td>
                     <td style={{color:"#fff"}}></td>
                     <td></td>
                     </tr>
                     <tr>
                     <td style={{color:"#fff"}}></td>
                     <td style={{color:"#fff"}}>No Data Found</td>
                     <td></td>
                     </tr>
                     <tr>
                     <td style={{color:"#fff"}}></td>
                     <td style={{color:"#fff"}}></td>
                     <td></td>
                     </tr>
            </>
        } else {
            if(finalArray.length > 0) {
                tableData = finalArray.map((res,i) => {
                         return(
                            <tr key={i}>
                                <td style={{color:"#fff"}}>{res.id}</td>
                                <td style={{color:"#fff"}}>{res.startDate}</td>
                                <td style={{color:"#fff"}}>{res.endDate}</td>
                                <td><i className="far fa-trash-alt" style={{color:"red"}} onClick={() => this.onRemoveClick(res.id)}></i></td>
                            </tr>
                            )
                })
            }
        }
        return (
            <div style={{
                backgroundColor:"#05182c",
            }}>
                <div style={{
                    maxWidth:'50%',
                    margin:'auto',
                    paddingTop:'5%'
                }}>
                    <form>
                    <div className="form-group" style={{textAlign:"left"}}>
                            <label style={{color:"#fff",fontSize:20}}>ID</label>
                            <input type="id" className="form-control" id="InputId" value={this.state.id} onChange={ this.onIdChange}/>
                          
                        </div>
                        <div className="form-group" style={{textAlign:"left"}}>
                            <label style={{color:"#fff",fontSize:20}}>Start Date</label>
                            <input type="date" className="form-control" id="InputStartDate" value={this.state.startDate} onChange={ this.onstartDateChange}/>
                          
                        </div>
                        <div className="form-group"  style={{textAlign:"left"}}>
                            <label style={{color:"#fff",fontSize:20}}>End Date</label>
                            <input type="date" className="form-control" id="InputEndDate" value={this.state.endDate} onChange={ this.onEndDateChange}/>
                          
                        </div>
                        <div>
                        <button type="button" className="btn btn-primary m-3" onClick={this.onAppendClick}>Append</button>
                        <button type="button" className="btn btn-danger" onClick={this.onClearClick}>Clear</button>
                        </div>
                       
                    </form>

                </div>
                <div className='table' style={{ maxWidth:'50%',margin:'auto',paddingTop:'5%'}}>
                <table className="table" style={{width:"100%",background:"transparent"}}>
                    <thead>
                        <tr>
                        <th scope="col" style={{color:"#fff",fontWeight:"bold",fontSize:20}}>ID</th>
                        <th scope="col" style={{color:"#fff",fontWeight:"bold",fontSize:20}}>Start Date</th>
                        <th scope="col" style={{color:"#fff",fontWeight:"bold",fontSize:20}}>End Date</th>
                        <th scope="col" style={{color:"#fff",fontWeight:"bold",fontSize:20}}>Delete</th>
                        </tr>
                    </thead>
                     <tbody>
                        {tableData}
                     </tbody>
                </table>
                </div>
           
            </div>
        )
    }
}

export default Index