import { Spin } from 'antd';

const Loading = ({ type }) => {
  if (type === 'page')
    return (
      <Spin
        size="large"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    );

  return null; // handle other types of loading
};

export default Loading;
