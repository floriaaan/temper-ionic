import React from 'react'

interface ContainerProps {
    token: string;
  };
  

const LightList: React.FC<ContainerProps> = ({ token }) => {
    return (
        <div>
            {token}
        </div>
    )
}

export default LightList;
