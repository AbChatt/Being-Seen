import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WeiboShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  RedditIcon,
  WeiboIcon,
  WhatsappIcon,
} from "react-share";

import "./style.css";

interface ShareButtonsProps {
  shareUrl: string;
}

const ShareButtons = ({ shareUrl }: ShareButtonsProps) => {
  return (
    <div className="share-btn-container">
      <p>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={45} round={true} />
        </TwitterShareButton>
      </p>
      <p>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={45} round={true} />
        </FacebookShareButton>
      </p>
      <p>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={45} round={true} />
        </LinkedinShareButton>
      </p>
      <p>
        <RedditShareButton url={shareUrl}>
          <RedditIcon size={45} round={true} />
        </RedditShareButton>
      </p>
      <p>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={45} round={true} />
        </WhatsappShareButton>
      </p>
      <p>
        <WeiboShareButton url={shareUrl}>
          <WeiboIcon size={45} round={true} />
        </WeiboShareButton>
      </p>
    </div>
  );
};

export default ShareButtons;
