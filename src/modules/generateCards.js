export default function generateCards(img, title) {
  const displayHTML = `
  <article class="myarticle">
  <img src=${img} class="article-img" alt="Image cover">
  <div class="article-content">
    <h2 class="article-title">${title}</h2>
    <h3 class="article-sub-title">content overview</h3>
    <div class="sub-article">
      <button class="action-btn">Like (10) &#128077</button>
      <button class="action-btn">Comment (45) &#128488</button>
      <button class="action-btn">View &#128065</button>
    </div>
  </div>
</article>
  `;

  return displayHTML;
}