# OBIETTIVO

Creare una single page app in React per inserimento e visualizzazione dati

## TASK
Creare un'applicazione REACT single page in cui sia possibile inserire degli utenti fittizi.
La pagina sarà composta da:

- FATTO: {un form di immissione (decidi tu se fisso in pagina oppure se in una modale visibile alla pressione di un pulsante)}

- FATTO: {un area in cui visualizzare una lista di utenti già inseriti}

- FATTO:{
Il form dovrà avere i seguenti campi di immissione:
- nome
- cognome
- indirizzo email
- data di nascita
- pulsante "Salva" per inserire l'utente}

Il form dovrà validare:

- FATTO: { la correttezza sintattica dell'indirizzo email e verificare che non sia già stato inserito}
- FATTO: {che l'utente inserito sia maggiorenne. In caso di validazione fallita, dovrà essere visualizzato un messaggio che indichi l'errore riscontrato.
In caso invece di validazione positiva, l'utente appena creato dovrà essere inserito e visualizzato nella lista degli utenti.
L'area in cui visualizzare gli utenti inseriti può essere una semplice griglia e dovrà includere tutti i dati dell'utente inseriti.
Un contatore dovrà indicare quanti utenti totali sono presenti in questa lista.}


## FUNZIONALITÀ EXTRA
Funzionalità opzionali che verranno considerate nella valutazione finale:

- FATTO: {l'applicazione non prevede un backend, quindi non è possibile persistere gli utenti in maniera classica. Sentiti libero di percorrere strade alternative per implementare la persistenza dei dati (es. local storage del browser)}

- possibilità di ordinare la visualizzazione degli utenti inseriti per nome, cognome, email o data di nascita

- test realizzati con tool quali jest, mocha o altro secondo preferenza

- utilizzo di bootstrap per l'impaginazione grafica

Per tutti i punti opzionali ti viene lasciata piena libertà implementativa.

## INDICAZIONI FINALI
- Qualora dovessi avere dubbi o necessitassi di ulteriori indicazioni, puoi interpretare i requisiti mancanti o non chiari.
- Sentiti libero di aggiungere funzionalità non indicate nelle specifiche, a patto che siano in linea con l'ambito di utilizzo sopra delineato.
