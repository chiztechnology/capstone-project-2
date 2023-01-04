export default function generateCards(img, title) {
  const displayHTML = `
  <div class="element-box">
  <div class="element-image">
    <img src="${img}" alt="">
  </div>
  <div class="element-name">
    <h3>${title}</h3>
  </div>
  <div class="element-comments">
    <button>Comments</button>
  </div>
  <div class="element-reservation">
    <button>Reservations</button>
  </div>
  </div>
  `;

  return displayHTML;
}