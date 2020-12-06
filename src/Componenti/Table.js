import React, { Component } from 'react';
import './Table.css';
import { format } from "date-fns";

export default class Table extends Component {
   constructor(props) {
      super(props);
      //Popolo l'array_utenti, prendendo dati dal localStorage da utilizzare come come stato iniziale della tabella
      let array_utenti = [];
      Object.keys(localStorage).forEach(function(key){
         var item =JSON.parse(localStorage.getItem(key));
         array_utenti.push(item);
      });
      this.state = { utenti: array_utenti, cs_cognome:'desc', cs_nome:'desc', cs_data_nascita:'desc', cs_email:'desc' };
      this.onSort = this.onSort.bind(this);
   }
   onSort(event, ordinaPer){
      const data = this.state.utenti;
      switch (ordinaPer) {
        case "cognome":
          if(this.state.cs_cognome === 'asc'){
            data.sort((a,b) => a[ordinaPer].localeCompare(b[ordinaPer]));
          }else{
            data.sort((a,b) => b[ordinaPer].localeCompare(a[ordinaPer]));
          }
          this.setState({utenti:data, cs_cognome: this.state.cs_cognome === 'desc' ? 'asc':'desc'});
          break;
        case "nome":
          if(this.state.cs_nome === 'asc'){
            data.sort((a,b) => a[ordinaPer].localeCompare(b[ordinaPer]));
          }else{
            data.sort((a,b) => b[ordinaPer].localeCompare(a[ordinaPer]));
          }
          this.setState({utenti:data, cs_nome: this.state.cs_nome === 'desc' ? 'asc':'desc'});
          break;
        case "data_nascita":
          if(this.state.cs_data_nascita === 'asc'){
            data.sort((a,b) => a[ordinaPer].localeCompare(b[ordinaPer]));
          }else{
            data.sort((a,b) => b[ordinaPer].localeCompare(a[ordinaPer]));
          }
          this.setState({utenti:data, cs_data_nascita: this.state.cs_data_nascita === 'desc' ? 'asc':'desc'});
          break;
        case "email":
          if(this.state.cs_email === 'asc'){
            data.sort((a,b) => a[ordinaPer].localeCompare(b[ordinaPer]));
          }else{
            data.sort((a,b) => b[ordinaPer].localeCompare(a[ordinaPer]));
          }
          this.setState({utenti:data, cs_email: this.state.cs_email === 'desc' ? 'asc':'desc'});
          break;
        default:
          break;
      }
   }
   creaHeader() {
      return (
        <tr >
           <th className="pointer utenti_th tabella" onClick={e => this.onSort(e, 'cognome')}>Cognome</th>
           <th className="pointer utenti_th tabella" onClick={e => this.onSort(e, 'nome')}>Nome</th>
           <th className="pointer utenti_th tabella" onClick={e => this.onSort(e, 'data_nascita')}>Data di nascita</th>
           <th className="pointer utenti_th tabella" onClick={e => this.onSort(e, 'email')}>E-mail</th>
           <th className="utenti_th">Totale utenti: {this.getNumeroUtenti()}</th>
        </tr>
      );
   }
   gestisciRimozione(email_str){
     if (window.confirm(`Conferma la cancellazione dell'utente con indirizzo email ${email_str} ?`)){
        this.rimuoviUtenteByMail(email_str);
      }
   }
   rimuoviUtenteByMail(email_str){
     //Rimuovo dallo storage l'utente con quella email
     Object.keys(localStorage).forEach(function(key){
        var item =JSON.parse(localStorage.getItem(key));
        if(item.email===email_str){
          localStorage.removeItem(email_str);
        }
     });
     window.location.reload();
   }
   getNumeroUtenti(){
     let numero_utenti=0;
     Object.keys(localStorage).forEach(function(key){
        numero_utenti++;
     });
     return numero_utenti;
   }
   creaRighe() {
      return this.state.utenti.map((utente, index) => {
         const { cognome, nome, data_nascita, email } = utente;
         let data_nascita_visualizzata = format(new Date(data_nascita),"dd/MM/yyyy");
         return (
            <tr key={email} className="righe_tabella">
               <td className="tabella">{cognome}</td>
               <td className="tabella">{nome}</td>
               <td className="tabella">{data_nascita_visualizzata}</td>
               <td className="tabella">{email}</td>
               <td className="tabella"><button type="button" class="pulsanteCancella" onClick={() => this.gestisciRimozione(email)}>
                    Rimuovi utente
                </button></td>
            </tr>
         )
      })
   }
   render() {
      return (
         <div id="container_table">
            <table id='utenti'>
               <tbody>
                  {this.creaHeader()}
                  {this.creaRighe()}
               </tbody>
            </table>
         </div>
      )
   }
}