'use strict';

function LikeButton() {
  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return 'You liked thiss!';
  }

  return (
    <button style={{ backgroundColor: 'red' }} onClick={() => setLiked(true)}>
      Like
    </button>
  );
}

const rootNode = document.getElementById('like-button-root');
const root = ReactDOM.createRoot(rootNode);
root.render(<ComponentOne />);

function ComponentOne() {
  return <h1> Hi!!!!!!! </h1>;
}
