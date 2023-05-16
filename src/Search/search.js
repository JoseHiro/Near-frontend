exports.searchPost = async (keyword) => {
  let result = await fetch('http://localhost:8080/posts/search/' + keyword)
  result = await result.json();

  console.log(result);
  if(!result.posts) return [];

  return result.posts;
}
