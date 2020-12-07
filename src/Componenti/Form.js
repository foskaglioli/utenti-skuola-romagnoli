import React from 'react';
import { useForm  } from "react-hook-form";
import './Form.css';
import { useAlert } from 'react-alert';

export default function Form() {
  const alertBello = useAlert();
  const {register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    let esito_dati = checkDatiForm(data);
    if(esito_dati["ok"]){
      inserisciUtente(data);
    }else{
      let msg = esito_dati["errore"];
      alertBello.error(<div style={{
         color: '#007dc3',
         backgroundColor: '#FEE300',
         borderRadius: '6px 6px 6px 6px',
         paddingTop: "5px",
         paddingLeft: "7px",
         paddingRight: "7px",
         paddingBottom: "1px",
         fontSize: '18px',
         fontFamily: 'Verdana'
        }
       }>{msg}</div>);
    }
  }

  const checkDatiForm = (obj) => {
    let esito = [];
    esito["ok"]=true;
    esito["errore"]="";

    //Controllo la lunghezza di tuti i parametri inseriti
    for (const key of Object.keys(obj)) {
      if(typeof(obj[key]) === 'string' && obj[key].length > 255){
        esito["ok"]=false;
        esito["errore"]="Tutti i campi devono avere la lunghezza massima di 255 caratteri";
        return esito;
      }
    }

    //Controllo tutti i campi obbligatori, nel caso in cui il required non dovesse funzionare
    let controlla_campi_obbligatori= checkCampiObl(obj);
    if(!controlla_campi_obbligatori["ok"]){
      esito["ok"]=false;
      esito["errore"]=controlla_campi_obbligatori["errore"];
      return esito;
    }

    //Le email devono rispettare la sintassi classica e non devono essere già presenti
    let controlla_mail = checkMail(obj.email);
    if(!controlla_mail["ok"]){
      esito["ok"]=false;
      esito["errore"]=controlla_mail["errore"];
      return esito;
    }

    //Le date devono rispettare la sintassi classica e devono essere date di nascita di persone maggiorenni
    let controlla_data_nascita = checkDataNascita(obj.data_nascita);
    if(!controlla_data_nascita["ok"]){
      esito["ok"]=false;
      esito["errore"]=controlla_data_nascita["errore"];
      return esito;
    }

    return esito;
  }

  const checkCampiObl = (obj) => {
    let esito_campi_obl = [];
    esito_campi_obl["ok"]=true;
    esito_campi_obl["errore"]="";
    if(!obj.cognome){
      esito_campi_obl["ok"]=false;
      esito_campi_obl["errore"]="Il campo 'Cognome' è obbligatorio";
      return esito_campi_obl;
    }else if(!obj.nome){
      esito_campi_obl["ok"]=false;
      esito_campi_obl["errore"]="Il campo 'Nome' è obbligatorio";
      return esito_campi_obl;
    }else if(!obj.data_nascita){
      esito_campi_obl["ok"]=false;
      esito_campi_obl["errore"]="Il campo 'Data di nascita' è obbligatorio";
      return esito_campi_obl;
    }else if(!obj.email){
      esito_campi_obl["ok"]=false;
      esito_campi_obl["errore"]="Il campo 'E-mail' è obbligatorio";
      return esito_campi_obl;
    }

    return esito_campi_obl;
  }

  const checkMail = (email_str) => {
    let esito_mail = [];
    esito_mail["ok"]=true;
    esito_mail["errore"]="";

    if(!email_str){
      esito_mail["ok"]=false;
      esito_mail["errore"]="Il campo email è obbligatorio";
      return esito_mail;
    }

    if(!sintassiEmail(email_str)){
      esito_mail["ok"]=false;
      esito_mail["errore"]="Il campo email deve rispettare la sintassi: esempio@mail.com ";
      return esito_mail;
    }

    //Controllo che non ci sia un altro utente con quella email
    if(getUserObjectByEmail(email_str)){
     esito_mail["ok"]=false;
     esito_mail["errore"]="Indirizzo email già registrato";
     return esito_mail;
    }

    return esito_mail;
  }

  const sintassiEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const getUserObjectByEmail = (email_str) => {
    return JSON.parse(localStorage.getItem(email_str));
  }

  const checkDataNascita = (dt_nascita_str) =>{
    let esito_dtn = [];
    esito_dtn["ok"]=true;
    esito_dtn["errore"]="";
    //Controllo che sia del formato giusto
    let esito_validate_date = validatedate(dt_nascita_str);
    if(!esito_validate_date["ok"]){
      esito_dtn["ok"]=false;
      esito_dtn["errore"]=esito_validate_date["errore"];
      return esito_dtn;
    }
    //Controllo che sia maggiorenne
    if(etaByDate(dt_nascita_str) < 18){
      esito_dtn["ok"]=false;
      esito_dtn["errore"]="Non è possibile registrare un utente minorenne";
      return esito_dtn;
    }
    return esito_dtn;
  }

  const validatedate = (data_str) =>{
    let esito_validate = [];
    esito_validate["ok"] = true;
    esito_validate["errore"] = "";


    let data_ita = data_str.split('/');
    let data_db = data_str.split('-');
    let esito_coerenza = null;
    if (data_ita.length>1){
      esito_coerenza = coerenzaData(data_ita[0],data_ita[1],data_ita[2]);
    }else if (data_db.length>1){
      esito_coerenza = coerenzaData(data_db[2],data_db[1],data_db[0]);
    }else{
      esito_validate["ok"]=false;
      esito_validate["errore"] = "Data inserita in un formato non valido (es. data corretta: 01/01/2020)";
      return esito_validate;
    }

    if(!esito_coerenza["ok"]){
      esito_validate["ok"] = esito_coerenza["ok"];
      esito_validate["errore"] = esito_coerenza["errore"];
    }

    return esito_validate;


  }

  const coerenzaData = (giorno,mese,anno) => {
    let esito_coerenza_dt = [];
    esito_coerenza_dt["ok"]=true;
    esito_coerenza_dt["errore"]="";
    //Controllo che giorno, mese ed anno siano di lunghezze e valori accettabili
    if(giorno.toString().length !== 2 || parseInt(giorno) > 31 || parseInt(giorno) < 1){
      esito_coerenza_dt["ok"]=false;
      esito_coerenza_dt["errore"]="Il giorno inserito non è possibile";
      return esito_coerenza_dt;
    }else if (mese.toString().length !== 2 || parseInt(mese) > 12 || parseInt(mese) < 1) {
      esito_coerenza_dt["ok"]=false;
      esito_coerenza_dt["errore"]="Il mesi inserito non è possibile";
      return esito_coerenza_dt;
    }else if(anno.toString().length !== 4 || parseInt(anno) === 0 || parseInt(anno) < 1850 ){
      esito_coerenza_dt["ok"]=false;
      esito_coerenza_dt["errore"]="L'anno inserito non è possibile";
      return esito_coerenza_dt;
    }
    //Controllo che non inseriscano giorni di nascita impossibili, ad esempio 31 Giugno 20xx
    if(parseInt(new Date(anno, mese, 0).getDate()) < parseInt(giorno)){
      esito_coerenza_dt["ok"]=false;
      esito_coerenza_dt["errore"]="Il giorno inserito non è possibile per il mese dell'anno inserito ";
      return esito_coerenza_dt;
    }
    return esito_coerenza_dt;
  }

  const etaByDate = (data_nascita) => {
      let oggi = new Date();
      let dataNascita = new Date(data_nascita);
      let eta = oggi.getFullYear() - dataNascita.getFullYear();
      var m = oggi.getMonth() - dataNascita.getMonth();
      if (m < 0 || (m === 0 && oggi.getDate() < dataNascita.getDate())) {
          eta--;
      }
      return eta;
  }

  const inserisciUtente = (data) =>{
    //Salvo i dati nome e cognome nel formato Cognome Nome
    data.cognome = beautifyName(data.cognome);
    data.nome = beautifyName(data.nome);
    //Salvo le date nel formato yyyy-mm-dd, convertendole se necessario
    let data_tmp = data.data_nascita.split('/');
    data.data_nascita = data_tmp.length>1 ? data_tmp[2]+"-"+data_tmp[1]+"-"+data_tmp[0] : data.data_nascita;
    //Salvo tutto nello storage e poi ricarico la pagina
    localStorage.setItem(data.email, JSON.stringify(data));
    window.location.reload();
  }

  const beautifyName = (str) => {
    //Vedo se è un nome/cognome fatto di più parole
    let array_str = str.split(' ');
    if(array_str.length > 1){
      let arr_str_beauty = [];
      array_str.forEach(function (str_tmp) {
        arr_str_beauty.push(str_tmp.charAt(0).toUpperCase() + str_tmp.slice(1).toLowerCase())
      });
      return arr_str_beauty.join(' ');
    }else{
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  }

  return (
    <div id="div_form_utenti">
      <span className="add_utente" >Aggiungi utente</span>
      <form className="form-inline form_utenti" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group campi_form_utenti">
          <div className="input-group-prepend">
            <span className="input-group-text">Cognome</span>
          </div>
          <input required autoFocus type="text" className="form-control testo_form" id="cognome" name="cognome" aria-label="Cognome" ref={register} />
        </div>
        <div className="form-group campi_form_utenti">
          <div className="input-group-prepend">
            <span className="input-group-text">Nome</span>
          </div>
          <input required type="text" className="form-control testo_form" id="nome" name="nome" aria-label="Nome" ref={register} />
        </div>
        <div className="input-group campi_form_utenti">
          <div className="input-group-prepend">
            <span className="input-group-text">Data di nascita</span>
          </div>
          <input required type="date" className="form-control testo_form" placeholder="gg/mm/aaaa" id="data_nascita" name="data_nascita" aria-label="Data di nascita"  ref={register} />
        </div>
        <div className="form-group campi_form_utenti">
          <div className="input-group-prepend">
            <span className="input-group-text">E-mail</span>
          </div>
          <input required type="email" className="form-control testo_form" id="email" name="email" aria-describedby="emailHelp" aria-label="E-mail" ref={register} />
        </div>
        <div className="form-group campi_form_utenti">
          <button  type="submit" className="btn btn-primary" >SALVA</button>
        </div>
      </form>
    </div>
  );
}
