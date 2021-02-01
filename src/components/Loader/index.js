import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './style.css';

const Load = ({ show }) => (
  <div className={show ? 'loader' : 'd-none'}>
    <Loader type="Triangle" color="#7ecb34" height={100} width={100} />
  </div>
);

Load.defaultProps = {
  show: false,
};

export default Load;
