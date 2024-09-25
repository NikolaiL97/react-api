import Session from 'react-session-api';

function sessionApi() {
  const session = () => {
    Session.setItem('data', 'demoValue');
  };

  return (session);
}

export default sessionApi;
