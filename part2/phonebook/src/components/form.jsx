const PersonForm = ({ name, number, onNameChange, onNumberChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
