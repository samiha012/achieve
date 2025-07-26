import { useEffect, useRef } from "react";

const FacebookPost = ({ url }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const parseFbEmbed = () => {
      if (window.FB && window.FB.XFBML && containerRef.current) {
        window.FB.XFBML.parse(containerRef.current);
      } else {
        setTimeout(parseFbEmbed, 100);
      }
    };

    parseFbEmbed();
  }, [url]);

  return (
    <div ref={containerRef}>
      <div className="fb-post" data-href={url} data-width="500"></div>
    </div>
  );
};

export default FacebookPost;
