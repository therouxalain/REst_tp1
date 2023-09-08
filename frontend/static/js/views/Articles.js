import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Articles");
  }

  async getHtml() {
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    let data = await getData("/static/js/data/guardian.json");
    // data = data.results

    let articlesListe = "<ul>";
    for (let i in data) {
        // console.log(data[i].results);
      articlesListe += `
            <li>${data[i].results}</li> 
        `;

        // Dans l'ordre des tests:

        // 1<li>${data[i].results}</li> 
        // 2<li>${data[i].results[5]["webTitle"]}</li>
        // 3<li>${data[i].results.webTitle}</li>
        // 4<li>${data[i].results["webTitle"]}</li>
        // 5<li>${data[i].results[5]}</li>

        //1[object Object],[object Object] ===> c'est ça qu'on veut
        //2Un titre
        //3undefined
        //4undefined
        //5un [object Object]

    }

    articlesListe += "</ul>";
    return (
      `
        <h1>Articles</h1>
        ` + articlesListe
    );
  }
}
