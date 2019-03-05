import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';

const ccyFormat = (num) => {
    return `${num.toFixed(2)}`;
}
const subtotal = (items) => {
    return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
}

const TablePayout = ({ values, onRemoveDetail }) => {
    // console.log(values);
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Servicio</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                 {!!values && values.length>0 ?
                     values.map((row, index )=>(
                         <TableRow key={index}>
                             <TableCell>{row.service.label}</TableCell>
                             <TableCell>{`S/ ${row.amount}`}</TableCell>
                             <TableCell><button onClick={()=>onRemoveDetail(index)}>+</button></TableCell>
                         </TableRow>
                     ))
                    //  <TableRow>
                    //      <TableCell>Total</TableCell>
                    //      <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                    //  </TableRow> 
                      :
                        <TableRow>
                            <TableCell colSpan={3} align="center">No hay datos aun</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </Paper>
    );
};

export default TablePayout;