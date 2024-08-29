import React from 'react';

export interface NoDataMessageProps {}

const NoDataMessage: React.FC<NoDataMessageProps> = () => {
  return <div className="text-xl font-normal text-crema-600 text-center p-8">No data to display</div>;
};

export default NoDataMessage;
