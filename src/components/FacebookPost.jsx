import { useEffect } from "react";

const FacebookPost = ({ url }) => {
  useEffect(() => {
    if (window.FB) window.FB.XFBML.parse();
  }, [url]);

  return (
    <div className="fb-post" data-href={url} data-width="500"></div>
  );
};

export default FacebookPost;
