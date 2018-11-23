import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {
  return (
    <div id="footer">
      <style jsx>{`
        #footer {
          background-color: black;
          color: #ccc;
          margin: 0;
          box-sizing: border-box;
          font-family: sans-serif;
          font-size: 0.75rem;
          width: 100%;
          height: 3rem;
          text-align: center;
          position: absolute;
          bottom: -15vmin;
          height: 15vmin;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .underlined {
          text-decoration: underline;
        }
      `}</style>
      <div id='tempo-control'>
        <input type='range'
          id='tempo'
          name='id'
          min='60'
          max='200'
          onChange={props.onChangeTempo} />
      </div>
      {/* <div id="copyright-notice">
        © 2018 Eggborne Studios - <Link to="/pets"><span className="underlined">Terms of Use</span></Link> | <Link to="/parents"><span className="underlined">Privacy Policy</span></Link>
      </div> */}
    </div>
  );
}

Footer.propTypes = {
  onChangeTempo: PropTypes.func
};


export default Footer;