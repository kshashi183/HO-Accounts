import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { baseURL } from '../../../../../api/baseUrl';

export default function CustomerOutStandingTable02({selectedCustCode,selectedDCInvNo}) {
    const [table2Data, setTable2Data]=useState([]);

    useEffect(()=>{
        table2();
    },[selectedDCInvNo])

    console.log("dc", selectedDCInvNo);
    const table2=()=>{
        if(selectedDCInvNo){
        axios.get(baseURL+'/customerOutstanding/getDataTable2',
        {
            params: {
                selectedDCInvNo: selectedDCInvNo
            },
        }
        
    )
        .then((res) => {
            console.log("table2", res.data.Result);
            setTable2Data(res.data.Result)
        }).catch((err) => {
            console.log("", err);
        })
    }
    else{
console.log("dc_inv_no not found");
    }
    }
  return (
    <div>
    <div className='mt-3'>
          <div style={{height:"250px",overflowY: "scroll",overflowX:'scroll'}}>
            <Table className='table-data border'  striped>
                <thead className='tableHeaderBGColor' style={{textAlign:"center"}}>
                    <tr>
                    <th>VrRef</th>
                    <th>Amount</th>
                    <th>TxnType</th>
                    <th style={{whiteSpace:'nowrap'}}>Status</th>
                    </tr>
                </thead>
        
        
                <tbody className='tablebody'>
                    {
                        table2Data.map((item,index)=>{
                            return(
                                <>
                                <tr>
                                    <td>
                                        {item.VrRef}
                                    </td>
                                    <td>{item.Receive_Now}</td>
                                    <td>{item.TxnType}</td>
                                    <td>{item.VrStatus}</td>
                                </tr>
                                </>
                            )
                        })
                    }
                    {/* <tr className="" >
                        <td>TaskNo</td>
                        <td>Machine</td>
                        <td>Operation</td>
                    </tr> */}
                </tbody>
            </Table>
      </div>
  </div>
 </div>
  )
}
