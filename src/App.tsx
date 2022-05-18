import React from 'react';
import axios, { AxiosResponse } from 'axios';
import generateTableSasSample from '../src/lib/generateTableSAS'

function App() {

  const [response, setResponse] = React.useState<AxiosResponse>();

  React.useEffect(() => {
    axios.get('/api/HttpTrigger1')
    .then(response => {
      // handle success
      setResponse(response);
      
      console.log("res",response);
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
    }, []);

  return (
    <React.Fragment>
      {response?.data.map((elm:any, index:number) => {
        return (
          <>
            <div key={index}>id: {elm.id}, name: {elm.name}</div>
            <p>{process.env.REACT_APP_HELLO_WORLD}</p>
          </>
        )
      })}
    </React.Fragment>
  );
}

export default App;
