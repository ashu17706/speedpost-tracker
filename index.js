const consignmentNo = "ED196345405IN";//put you consigntmnet number
const courier_type = "INDIA_POST";
if(courier_type == "INDIA_POST"){
  const india_post = require('./app/india_post');
  india_post.fetchIndiaPost(consignmentNo);
}