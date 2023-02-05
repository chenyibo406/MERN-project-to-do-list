export default (posts = [], actions) => {
  switch (actions.type) {
    case "UPDATE":
      return posts.map((post) =>
        post._id === actions.payload ? actions.payload : post
      );
    case "FETCH_ALL":
      return actions.payload;
    case "CREATE":
      return [...posts, actions.payload];
    default:
      return posts;
  }
};
