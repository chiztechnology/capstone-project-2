export default function generateCards(id, img, title, likes, noOfComments = 0) {
  const displayHTML = `
  <article class="myarticle">
  <img src=${img} class="article-img" alt="Image cover">
  <div class="article-content">
    <h2 class="article-title">${title}</h2>
    <h3 class="article-sub-title">content overview</h3>
    <div class="sub-article">
      <button class="action-btn like" id=${id}>Like ${likes} &#128077</button>
      <button class="action-btn comment" id=${id}>Comment (${noOfComments}) &#128488</button>
      <button class="action-btn view" id=${id}>View &#128065</button>
    </div>
  </div>
</article>
  `;

  return displayHTML;
}