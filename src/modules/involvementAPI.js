const url = 'http://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IB9fLW16LJCr9V9DKGwT/';

export default class InvolvementAPI {
  static getComments = async (itemId) => {
    const response = await fetch(`${url}comments?item_id=${itemId}`);
    const data = await response.json();
    if (data.error === undefined) {
      return data;
    }
    return data.error.status;
  };

  static postComment = async (itemId, username, comment) => {
    try {
      const params = {
        itemId,
        username,
        comment,
      };
      const response = await fetch(`${url}comments`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  static getLikes = async () => {
    const responseponse = await fetch(`${url}likes`);
    const data = await responseponse.json();
    return data;
  };

  static postLike = async (id) => {
    const response = await fetch(`${url}likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_id: id }),
    });
    return response.status;
  }
}