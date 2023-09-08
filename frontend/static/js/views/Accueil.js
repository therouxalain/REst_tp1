import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    
    constructor(params) {
        super(params)
        this.setTitle('Accueil')
    } 

    async getHtml() {
        return `
            <h1>Le journal The Guardian <br>est une publication <br>internationale majeure. <br><br>Vous découvrirez <br>en parcourant les pages suivantes <br>quelques articles émanant <br>de cet organe de presse <br>britannique.</h1>
            <br><br>
            Liste des données récupérées:
            
        `
        async function getData(url) {
            const response = await fetch(url);
            return response.json();
          }
      
          let data = await getData("/static/js/data/guardian.json");
          // data = data.results
      
          let recupListe = "<ul>";
          for (let i in data) {
              // console.log(data[i].results);
              recupListe += `
                  <li>${data[i].results}</li> 
              `;
          }
      
          recupListe += "</ul>";
          return (
            `
              <h1>Données récupérées</h1>
              ` + recupListe
          );
    }

}

    // "status": 
    // "userTier": 
    // "total": 
    // "startIndex": 
    // "pageSize": 
    // "currentPage":
    // "pages": 
    // "orderBy": 
    // "results": 
    //   {
    //     "id": 
    //     "type": 
    //     "sectionId": 
    //     "sectionName": 
    //     "webPublicationDate": 
    //     "webTitle": 
    //     "webUrl": 
    //     "apiUrl": 
    //     "fields": {
    //       "headline": 
    //       "starRating": 
    //       "shortUrl": 
    //       "thumbnail": 
    //     },
    //     "tags": [
    //       {
    //         "id": 
    //         "type": 
    //         "sectionId": 
    //         "sectionName": 
    //         "webTitle": 
    //         "webUrl": 
    //         "apiUrl": 
    //         "references": 
    //         "bio": 
    //         "bylineImageUrl": 
    //         "bylineLargeImageUrl": 
    //         "firstName": 
    //         "lastName": 
    //       }
    //     ],
    //     "isHosted": 
    //     "pillarId": 
    //     "pillarName": 
    //   