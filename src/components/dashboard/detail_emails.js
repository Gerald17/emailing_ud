import React from 'react';

class DetailEmail extends React.Component {
    render() {
        if(!this.props.emailDetail){
            return null;
        }
        return (
            <React.Fragment>
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Id Lote</th>
                            <th>Id Mensaje</th>
                            <th>Email</th>
                            <th>Fecha</th>
                            <th>Respuesta</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.props.emailDetail.map((e, index)=>{
                        return(
                            <tr key={index}>
                                <td> { e.MailingId } </td>
                                <td> { e.MessageId } </td>
                                <td> { e.ToAddress === undefined ? e.OriginalRecipient : e.ToAddress } </td>
                                <td> { e.Datetime } </td>
                                <td> { this.props.state } </td>
                            </tr>       
                        )
                    })}
                    </tbody>
                </table>
            </React.Fragment>   
        );
    }
}
 
export default DetailEmail;
