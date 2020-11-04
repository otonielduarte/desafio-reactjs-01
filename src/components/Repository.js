import React from 'react';

export default function Repository({ title, onClick }) {
  return <li>
    {title}
    <button onClick={() => onClick()}>
      Remover
</button>
  </li>
}