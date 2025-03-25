import React from 'react';
import '../css/contact.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarked, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';

export default function ContactUs() {
  return (
    <div>
          <section className="contact-page-sec">
              <Container >
              <Row>
                <h2 className='getintouch'>Get in Touch</h2>
        
                  <Col md={4}>
                    <div className="contact-info">
                      <div className="contact-info-item">
                        <div className="contact-info-icon">
                          <FontAwesomeIcon icon={faMapMarked} className='icon-contact'/>
                        </div>
                        <div className="contact-info-text">
                          <h2>Address</h2>
                          <span>#72,  4th cross Shamanna Layout, Lingarajapura <br/></span>
                          <span>Bengaluru, Karnataka 560076</span>
                        </div>
                      </div>
                    </div>
                  </Col>
        
                  <Col md={4}>
                    <div className="contact-info">
                      <div className="contact-info-item">
                        <div className="contact-info-icon">
                          <FontAwesomeIcon icon={faEnvelope} className='icon-contact' />
                        </div>
                        <div className="contact-info-text">
                          <h2>E-mail</h2>
                          <span>pskg@gmail.com</span>
                          <span>pskg.com</span>
                        </div>
                      </div>
                    </div>
                  </Col>
        
                  <Col md={4}>
                    <div className="contact-info">
                      <div className="contact-info-item">
                        <div className="contact-info-icon">
                          <FontAwesomeIcon icon={faClock} className='icon-contact' />
                        </div>
                        <div className="contact-info-text">
                          <h2>Office Time</h2>
                          <span>Mon - Sat 9:00 am - 6.00 pm</span>
                          <span>Sun - 12.00 pm - 6.00 pm</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
        
                <Row style={{marginLeft:'-5%'}}>
                  <Col md={7} >
                    <div className="contact-page-form">
                      <h3>Contact Us</h3>
                      <form action="contact-mail.php" method="post">
                        <Row>
                          <Col md={6} sm={6} xs={12}>
                            <div className="single-input-field">
                              <input type="text" placeholder="Your Name" name="name" />
                            </div>
                          </Col>
                         
                          <Col md={6} sm={6} xs={12}>
                            <div className="single-input-field">
                              <input type="text" placeholder="Phone Number" name="phone" />
                            </div>
                          </Col>
                          
                          <Col md={12}>
                            <div className="single-input-field">
                              <textarea placeholder="Write Your Message" name="message"></textarea>
                            </div>
                          </Col>
                          <div className="single-input-fieldsbtn">
                            <input type="submit" value="Send Now" />
                          </div>
                        </Row>
                      </form>
                    </div>
                  </Col>
        
                  <Col md={3}>
                    <div className="contact-page-map">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4009242867505!2d77.6270707753921!3d13.010121587308761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16e096a3eb8d%3A0x2b9eb92fbccaa08b!2sPeniel%20Ministries%20(Peniel%20Church)!5e0!3m2!1sen!2sin!4v1742895944828!5m2!1sen!2sin" width="450" height="340"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                  </Col>
                </Row>
                
              </Container>
            </section>
    </div>
  )
}
