export default (data) => {
  const {
    data: { children },
  } = data;
  return children.map((item) => {
    const {
      data: { author, id, num_comments, thumbnail, created_utc, title },
    } = item;

    return { author, id, num_comments, thumbnail, created_utc, title };
  });
};
