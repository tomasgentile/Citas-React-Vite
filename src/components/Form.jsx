import { useState, useEffect } from 'react';
import Error from './Error';


const Form = ({ setPatients, patients, patient, setPatient }) => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [symptom, setSymptom] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      console.log(patient)
      setName(patient.name);
      setOwner(patient.owner);
      setEmail(patient.email);
      setDate(patient.date);
      setSymptom(patient.symptom);
    }
  }, [patient])

  const idGenerator = () => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);
    return random + date;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación del formulario
    if ([name, owner, email, date, symptom].includes('')) {
      setError(true);
      return;
    }
    setError(false);

    const objPatient = {
      name,
      owner,
      email,
      date,
      symptom
    }

    if (patient.id) {
      // Editando
      objPatient.id = patient.id;
      // Mapea el listado de pacientes, si el id del paciente no coincide con el que se esta editando, devuelve los datos del estado, sino del objPatient (que es el editado por el usuario)
      const modifiedPatients = patients.map(patientState => patientState.id === patient.id ? objPatient : patientState);

      setPatients(modifiedPatients);
      setPatient({});

    } else {
      // Agregando Registro
      objPatient.id = idGenerator();
      setPatients([...patients, objPatient]);
    }

    // Reinicia el formulario
    setName('');
    setOwner('');
    setEmail('');
    setDate('');
    setSymptom('');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {error && <Error><p>Todos los campos son requeridos</p></Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota</label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario</label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Alta</label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Sintomas</label>
          <textarea
            id="sintomas"
            placeholder="Describe los Sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className={patient.id ? "bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-700 cursor-pointer transition-colores rounded" : "bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colores rounded"}
          value={patient.id ? "Editar Paciente" : "Agregar Paciente"} />
      </form>
    </div>
  )
}

export default Form;

