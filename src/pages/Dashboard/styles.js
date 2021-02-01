import styled from 'styled-components';

import 'react-widgets/dist/css/react-widgets.css';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto 0px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    display: inline;
    align-self: center;
    align-items: center;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #ffffff;
    padding-bottom: 30px;

    p {
      margin-bottom: 15px;
    }

    strong {
      color: #fff;
      font-size: 24px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Infocnpj = styled.div`
  background-color: #ffffff;
  height: 340px;
  padding: 20px 20px 20px 20px;
  margin: 10px 10px 10px 10px;
  width: 900px;
  justify-content: center;
  align-items: center;
  text-align: center
  height: auto;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(0, 0, 0);
`;

export const HeaderInfo = styled.div`
  width: 100%;
  align-items: center;
  text-align: center
  justify-content: space-between;

  button {
    border: 0;
    background: 0;
    background-color: #ffffff;
    margin-left: 20px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    text-align: center
    padding: 10px 10px 10px 10px;

    :hover {
      background-color: #00aacc;
      color: #ffffff;
    }
  }
`;

export const Conjunto = styled.div`
  background-color: #ffffff;
  text-align: left !important;
  height: 340px;
  padding: 5px 10px 5px 10px;
  margin: 10px 5px 5px 5px;
  display: flex;
  justify-content: space-between;
  height: auto;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(0, 0, 0);

  p {
    font-weight: bold;
  }
`;

export const Conjunto2 = styled.div`
  background-color: #ffffff;
  width: 800px;
  padding: 0px 70px 5px 70px;
  margin: 10px 5px 5px 5px;
  display: flex;
  justify-content: space-between;
  height: 150px;
  border-radius: 10px 10px 10px 10px;
  align-items: center;
  text-align: center;

  p {
    font-weight: bold;
  }

  button {
    margin-left: 20px;
    font-style: normal;
    color: #ffffff;
    background: #1568db;
    border-radius: 10px 10px 10px 10px;
    padding: 10px 30px;

    :hover {
      background-color: #00aacc;
      color: #ffffff;
    }

    :disabled,
    button[disabled] {
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
    }
  }
`;

export const Title = styled.text`
  color: #808080;
  font-size: 12px;
`;

export const Vazio = styled.div`
  background-color: #ffffff;
  padding: 10px 20px 10px 20px;
`;

export const Brasao = styled.div`
  margin: 0 10px 10px 10px;
  background-color: #ffffff;
  padding: 0px 20px 10px 20px;
  display: flex;
  align-self: center;
  align-items: center;
`;

export const ContainerStatus = styled.div`
  color: #808080;
  font-size: 18px;
  color: #008000;
  font-weight: bold;
  margin: 60px 10px 10px 10px;
  background-color: #ffffff;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;

  button {
    margin-left: 20px;
    font-style: normal;
    color: #ffffff;
    background: #1568db;
    border: 0px solid #ffffff;
    text-shadow: 0px -1px 1px #222222;
    box-shadow: 2px 2px 5px #000000;
    border-radius: 10px 10px 10px 10px;
    padding: 10px 30px;

    :hover {
      background-color: #00aacc;
      color: #ffffff;
    }

    :disabled,
    button[disabled]{
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
    }

  }
  }
`;
