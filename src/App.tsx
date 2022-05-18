import React from 'react';
import axios, { AxiosResponse } from 'axios';
// import generateTableSasSample from '../src/lib/generateTableSAS'

function App() {
  const { TableServiceClient, AzureNamedKeyCredential } = require("@azure/data-tables");

  const account = process.env.REACT_APP_ACCOUNT_NAME;
  const accountKey = process.env.REACT_APP_ACCOUNT_KEY;
  const tablesUrl = process.env.REACT_APP_TABLES_URL;
  const tableName = 'newtable';

  const credential = new AzureNamedKeyCredential(account, accountKey);
  const serviceClient = new TableServiceClient(
    `https://${account}.table.core.windows.net`,
    credential
  );

  const [response, setResponse] = React.useState<AxiosResponse>();

  React.useEffect(() => {
    axios.get('/api/HttpTrigger1')
    .then(response => {
      // handle success
      setResponse(response);
      serviceClient.createTable(tableName);
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
      <p>{response?.data.id}</p>
      <p>{response?.data.name}</p>
      <p>{process.env.REACT_APP_HELLO_WORLD}</p>
    </React.Fragment>
  );
}

export default App;
