import { useState } from "react";

const TableView = () => {
  const [codes, setCodes] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');

  const addCode = () => {
    if (newCode) {
      setCodes([...codes, newCode]);
      setNewCode('');
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl mb-4">Lista de Códigos</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
          className="p-2 bg-gray-800 text-white rounded-l"
          placeholder="Ingrese un código"
        />
        <button onClick={addCode} className="p-2 bg-blue-500 hover:bg-blue-600 rounded-r">Agregar</button>
      </div>
      <table className="w-full table-auto bg-gray-800 rounded">
        <thead>
          <tr>
            <th className="p-2">Código</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code, index) => (
            <tr key={index} className="border-t border-gray-700">
              <td className="p-2">{code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
