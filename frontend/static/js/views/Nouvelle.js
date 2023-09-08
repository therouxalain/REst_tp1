import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Un article aléatoire");
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
      articlesListe += `
      <h2>${data[i].results[0]["webTitle"]}</h2><br>
        <img src="${data[i].results[0].fields.thumbnail}"><br><br>
              Lien: ${data[i].results[0].id}<br><br>

              Un article de <b>${data[i].results[0].tags[0]["webTitle"]}</b><br>
            <img width="99" src="${data[i].results[0].tags[0]["bylineLargeImageUrl"]}">
        `;
    }

    articlesListe += "</ul>";
    return (
      `
        <h1>Un article du Guardian <br>tiré au hasard</h1> <br>(ce concept reste à compléter pour un article différent à chaque rechargement de page)<br><br>
        ` + articlesListe
    );
  }
}
