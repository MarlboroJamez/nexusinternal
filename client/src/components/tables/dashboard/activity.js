import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Table({
    data,
}) {
    const headers = data.length > 0 ? Object.keys(data[0]).filter(item => item !== "search" && item !== "__v" && item !== "_id"):"";

    console.log(headers)
  return (
    <div>
    </div>
  )
}

export default Table