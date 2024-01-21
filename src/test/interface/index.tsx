import React from 'react';

interface EmployeeProps {
  name?: string;
  age?: number;
  country?: string;
  children?: React.ReactNode;
}

const Employee: React.FC<EmployeeProps> = ({ name, age, country }) => {
  return (
    <div>
      <p>
        {name} + {age} + {country}
      </p>
    </div>
  );
};

export default Employee;
