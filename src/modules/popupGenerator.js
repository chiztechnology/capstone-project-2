const popup = document.querySelector('.popup');

export default function popupGenerator(img, title, description, username = 'N/A', comment = 'N/A', dateOfCreation = 'N/A', noOfComments = 0) {
  popup.innerHTML = `
  <div class="modal" id="modal">
  <div class="modal-content">
    <div class="card-preview-header">
      <h2 class="work-title-preview">${title}</h2>
      <span class="close">&times;</span>
    </div>

    <img src=${img} class="article-img" alt="Image cover">
    <div class="article-content">
      <h3 class="article-sub-title">${description}</h3>
      <div class="comments-container">
        <h2>Comments (${noOfComments})</h2>
        <!-- comments -->
        <h3>${username} : ${comment} (${dateOfCreation})</h3>
      </div>
      <div class="formDiv">
        <form id="add-comment">
          <h2>Add Comment</h2>
          <label for="">Your name</label>
          <div>
            <input type="text" name="name" class="username" required>
          </div>
          <label for="">Your insights</label>
          <div>
            <textarea name="insights" id="" cols="30" rows="10" class="comment-text" required></textarea>
          </div>
          <input type="submit" name="comment" id="comment-btn" title="Comment">
        </form>
      </div>
    </div>

  </div>
</div>
  `;
}