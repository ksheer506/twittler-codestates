import React from 'react';

const Filter = ({ userList, onSelect }) => {
  return (
    <select onChange={onSelect}>
      <option value=""> </option>
      {userList.map((userName, index) => {
        return <option value={userName} key={index}>{userName}</option>
      })}
    </select>
  );
}

export default Filter;