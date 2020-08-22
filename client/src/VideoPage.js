import React, {useState, useEffect} from 'react';
import Vimeo from '@u-wave/react-vimeo';
import {useParams, useLocation} from 'react-router-dom';
import videoService from './services/videoService';
import {Button} from 'react-bootstrap';
import {Row, Container, Col} from 'react-bootstrap';
import history from './History';
import Comments from './Comments';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt, faEye} from '@fortawesome/free-solid-svg-icons';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import './VideoGallery.css'


function VideoPage() {
  const location = useLocation();
  const {id} = useParams();
  const tempObj = location && location.state && location.state.video;
  const [videoObject, setVideoObject] = useState(null);
  //const [videoObject, setVideoObject] = useState(tempObj ? tempObj : null);

  useEffect(() => {
    if (!videoObject) {
      getVideoObject();
    }
  });

  const getVideoObject = async () => {
    const res = await videoService.getVideo(id);
    setVideoObject(res);
  };

  return (
    <Container className="video-page">
      <div className="video-sub-nav">
          <div className="sub-title">
            <Button bsPrefix="super-btn" id="back-button" variant="primary"
              onClick={() => history.push('/')}> ◄ Back</Button>
          </div>
      </div>
      <div className="video-page-view">
      {(videoObject == null) &&
      <p>No video found :-(</p>
      }
      {(videoObject && videoObject !== null) &&
        <div className="video-box">
          <div className="vimeo-container">
            <Vimeo
              video={videoObject.uri.substring(8)}
              showTitle={false}
              showPortrait={false}
              color='FFCC00'
              showByline={false}
              controls={false}
              height={500}
            />
          </div>
          <div className="video-controls">
            <Row>
              <Col>
                <AwesomeButton type="primary"><FontAwesomeIcon icon={faEye} /> {videoObject.stats.plays} Views</AwesomeButton>
              </Col>
              <Col>
                <div className="video-url">
                  <AwesomeButton type="secondary">
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                    {/* <a onClick={() => history.push(
                        '/video/' + id,
                        {video: video},
                    )}> View Project </a> */}
                  </AwesomeButton>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      }


      {(videoObject && videoObject !== null) &&
        <div className="video-info-box" lg={7} sm={11} md={12} xs={9}>
          <h1 className="title">{videoObject.name}</h1>
          {videoObject.tags.map((item, index) => {
            return <span key={'tag-' + index} className="tags">{item.tag}
            </span>;
          })}
          {/* <h3 className="username">{videoObject.user.name}</h3> */}
          <p className="description">{videoObject.description}</p>
          {/* <Comments videoId={id} commentsObj={videoObject.comments}></Comments> */}
        </div>
      }
      </div>
    </Container>
  );
}

export default VideoPage;
